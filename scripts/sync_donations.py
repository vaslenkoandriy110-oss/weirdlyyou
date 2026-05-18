"""
Sync latest Donatello donations into donations.json for GitHub Pages.

Required GitHub secret:
  DONATELLO_TOKEN

The public website only reads donations.json. Never put your token in app.js.
"""

from __future__ import annotations

import hashlib
import html
import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from donatello import Donatello

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "donations.json"
MAX_DONATIONS = 30
MAX_MESSAGE_LEN = 110
MAX_NAME_LEN = 24

BLOCKED_FRAGMENTS = [
    "http://",
    "https://",
    "www.",
    "discord.gg",
    "t.me/",
    "@everyone",
    "<script",
    "casino",
    "crypto pump",
    "free money",
    "onlyfans",
]


def clean(value: Any, max_len: int, fallback: str = "") -> str:
    text = str(value or "").strip()
    text = re.sub(r"[\r\n\t]+", " ", text)
    text = re.sub(r"\s{2,}", " ", text)
    text = html.escape(text, quote=False)
    return (text or fallback)[:max_len]


def object_to_dict(obj: Any) -> dict[str, Any]:
    if isinstance(obj, dict):
        return obj
    data: dict[str, Any] = {}
    for key in dir(obj):
        if key.startswith("_"):
            continue
        try:
            value = getattr(obj, key)
        except Exception:
            continue
        if callable(value):
            continue
        try:
            json.dumps(value, default=str)
        except TypeError:
            value = str(value)
        data[key] = value
    if hasattr(obj, "__dict__"):
        data.update(getattr(obj, "__dict__", {}))
    return data


def first_present(data: dict[str, Any], keys: list[str], fallback: str = "") -> Any:
    for key in keys:
        if key in data and data[key] not in (None, ""):
            return data[key]
    return fallback


def is_unsafe(message: str) -> bool:
    normalized = html.unescape(message).lower()
    return any(fragment in normalized for fragment in BLOCKED_FRAGMENTS)


def stable_id(raw: dict[str, Any], name: str, message: str, amount: str, created_at: str) -> str:
    raw_id = first_present(raw, ["id", "donate_id", "donation_id", "payment_id", "order_id"], "")
    if raw_id:
        return clean(raw_id, 80, "donation")
    source = f"{name}|{message}|{amount}|{created_at}"
    return hashlib.sha256(source.encode("utf-8")).hexdigest()[:24]


def normalize_amount(raw: dict[str, Any]) -> str:
    amount = first_present(raw, ["amount", "total_amount", "sum", "value"], "")
    currency = first_present(raw, ["currency", "currency_code"], "")
    if not amount:
        return "Donatello"
    amount_text = clean(amount, 16)
    currency_text = clean(currency, 8)
    return f"{amount_text} {currency_text}".strip()


def normalize_donate(item: Any) -> dict[str, str] | None:
    raw = object_to_dict(item)
    name = clean(first_present(raw, ["client_name", "name", "username", "nickname", "clientName"], "Anonymous"), MAX_NAME_LEN, "Anonymous")
    message = clean(first_present(raw, ["message", "comment", "text", "client_message"], "Supported the chaos."), MAX_MESSAGE_LEN, "Supported the chaos.")
    amount = normalize_amount(raw)
    created_at = clean(first_present(raw, ["created_at", "createdAt", "date", "created", "paid_at", "paidAt"], ""), 64, "")

    if len(html.unescape(message)) < 2 or is_unsafe(message):
        return None

    donation_id = stable_id(raw, name, message, amount, created_at)
    return {
        "id": donation_id,
        "name": name,
        "message": message,
        "amount": amount,
        "createdAt": created_at,
    }


def main() -> None:
    token = os.environ.get("DONATELLO_TOKEN", "").strip()
    if not token:
        raise SystemExit("DONATELLO_TOKEN is missing. Add it in GitHub → Settings → Secrets and variables → Actions.")

    client = Donatello(token)
    donations_raw = client.get_donates(size=MAX_DONATIONS)

    donations: list[dict[str, str]] = []
    seen: set[str] = set()
    for item in donations_raw:
        normalized = normalize_donate(item)
        if not normalized:
            continue
        if normalized["id"] in seen:
            continue
        seen.add(normalized["id"])
        donations.append(normalized)

    payload = {
        "updatedAt": datetime.now(timezone.utc).isoformat(),
        "source": "donatello",
        "donations": donations[:MAX_DONATIONS],
    }

    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Synced {len(payload['donations'])} donations to {OUT}")


if __name__ == "__main__":
    main()
