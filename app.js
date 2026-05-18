const CONFIG = {
  // STEP 1: Create a Ukrainian-friendly donation page, then paste your real links here.
  // Donatello example: https://donatello.to/yourname
  // monobank Jar example: https://send.monobank.ua/jar/YOUR_JAR_ID
  // PayPal example: https://www.paypal.com/paypalme/yourname
  donationUrl: "https://donatello.to/yourname",
  donationLinks: {
    donatello: "https://donatello.to/skelfin",
    monobank: "https://send.monobank.ua/jar/YOUR_JAR_ID",
    paypal: "https://www.paypal.com/paypalme/yourname",
  },
  siteName: "AI Knows Too Much",
  spotlightDurationMs: 30000,
  spotlightMode: "github-actions-donatello",

  // GitHub Actions writes this file from your Donatello account.
  donationsFeedUrl: "donations.json",
  donationsPollMs: 20000,
  showLatestDonationsOnFirstVisit: 3,
};

const moods = [
  "sleep deprived",
  "delusionally confident",
  "one minor inconvenience away from disappearing",
  "quietly chaotic",
  "running on caffeine and suspicious optimism",
  "emotionally buffering",
  "main character for no reason",
  "side quest energy",
  "financially optimistic for no clear reason",
  "built different, but not necessarily better",
];

const archetypes = [
  "Side Quest NPC",
  "Caffeinated Goblin",
  "Budget Main Character",
  "Emotionally Offline Wizard",
  "Overthinking Raccoon",
  "Midnight Idea CEO",
  "Professional Tab Collector",
  "Accidental Villain Arc",
  "Walking Screenshot Folder",
  "Soft Chaos Distributor",
  "Wi‑Fi Dependent Philosopher",
  "Part-Time Productivity Ghost",
  "Unpaid Startup Founder",
  "Suspiciously Confident Potato",
  "Browser Tab Archaeologist",
];

const openers = [
  "is powered by {food}, questionable plans, and a belief that everything will somehow work out.",
  "has the energy of someone who says ‘one more video’ and wakes up in a different tax bracket of regret.",
  "was probably created during a software update that nobody agreed to install.",
  "treats simple problems like final boss battles and final boss battles like minor errands.",
  "has two modes: mysterious silence and explaining a plan that definitely needs a budget.",
  "could turn a normal Tuesday into a documentary nobody asked for.",
  "is basically a limited-edition emotional support browser tab.",
  "looks calm, but internally has 19 unfinished side quests running.",
];

const facts = [
  "Your toxic trait is believing a brand-new idea can fix your entire life by Friday.",
  "You don't overthink. You run a full-time mental cinema with director's commentary.",
  "Your phone battery percentage and emotional stability are probably connected.",
  "You give ‘I will build an empire after this snack’ energy.",
  "You are one good playlist away from reinventing your personality.",
  "You are not lazy. You are in stealth mode until the plot requires you.",
  "Your browser tabs are not tabs. They are unfinished chapters of your identity.",
  "You have startup founder energy, but the startup is currently a note in your phone.",
  "You make backup plans for backup plans, then ignore all of them creatively.",
  "Your brain opens 17 apps at once and then asks why the battery is low.",
  "You would survive in a horror movie by accidentally confusing the villain.",
  "Your aura says ‘I am fine’ in a font that looks suspiciously on fire.",
  "You are the kind of person who can make a five-minute task emotionally significant.",
  "You have a rare talent: turning random internet ideas into a personal business strategy.",
  "Your villain origin story is probably a slow website and low Wi‑Fi signal.",
  "You are not dramatic. You are simply optimized for plot development.",
  "You carry the energy of someone who has a plan, a backup plan, and no sleep.",
  "You don't need a sign from the universe. You need one completed task.",
  "Your attention span is a group chat where everyone is typing at once.",
  "You could make a spreadsheet about your life and still avoid the first row.",
  "You have ‘I'll figure it out’ confidence and ‘I did not figure it out’ documentation.",
  "Your personality has a loading screen and occasional premium features.",
  "You are exactly one minor success away from calling it a brand.",
  "Your inner peace has terms and conditions you never read.",
  "You do not chase dreams. You open 11 tabs about them and call it research.",
  "You have the emotional range of a weather app during a system outage.",
  "Your life strategy is 40% intuition, 40% panic, and 20% snacks.",
  "You are the human version of ‘save as final_final_v3_REAL.pdf’. ",
  "You could be productive if your brain stopped launching side quests.",
  "Your best ideas arrive at the exact moment you should be sleeping.",
  "You give advice like a wise mentor and follow it like a rebellious intern.",
  "Your comfort zone has furniture, Wi‑Fi, and a suspicious amount of excuses.",
  "You are built like a motivational quote with low battery.",
  "Your personality says premium subscription, but your budget says free trial.",
  "You are not lost. You are exploring the map without reading the quest instructions.",
];

const savageFacts = [
  "You don't need motivation. You need fewer tabs and one adult decision.",
  "Your business plan currently has vibes, potential, and zero operational discipline.",
  "You are not procrastinating — you are conducting unpaid research for a future panic attack.",
  "If confidence was revenue, you would already have investors.",
  "You treat ‘I'll start tomorrow’ like a legally binding strategy document.",
  "Your attention span files for divorce every time a new idea appears.",
  "You call it brainstorming, but it is mostly your brain changing the subject.",
  "Your productivity system has more features than your actual productivity.",
  "You are one YouTube tutorial away from thinking you can run a corporation.",
  "Your to-do list has been alive longer than some startups.",
];

const shareCaptions = [
  "This site just diagnosed my personality and I hate how accurate it is.",
  "I entered 3 random things and got personally attacked by a website.",
  "Apparently I am a Side Quest NPC with financial delusions. Fair.",
  "This weird little site knows too much about me.",
  "I asked a website for fake facts and it chose violence.",
];

const demoNames = ["Alex", "Mia", "Jordan", "Sam", "Chris", "Taylor", "Riley", "Morgan"];
const demoFoods = ["iced coffee", "pizza", "energy drinks", "ramen", "cookies", "water at 2 AM", "cold fries"];
const demoThings = [
  "has 47 browser tabs open",
  "wants to become rich by Friday",
  "saves screenshots and never opens them",
  "thinks sleep is optional",
  "owns three notebooks and uses none",
];

let selectedChaos = 2;
let currentResult = null;

const $ = (selector) => document.querySelector(selector);

const moodInput = $("#moodInput");
const donateButton = $("#donateButton");
const form = $("#generatorForm");
const resultCard = $("#resultCard");
const factsList = $("#factsList");
const leaderboardList = $("#leaderboardList");
const toast = $("#toast");
const spotlightForm = $("#spotlightForm");
const spotlightQueueList = $("#spotlightQueueList");
const spotlightMessageInput = $("#spotlightMessageInput");
const spotlightDonateButton = $("#spotlightDonateButton");
let activeSpotlight = null;
let spotlightInterval = null;

function init() {
  moods.forEach((mood) => {
    const option = document.createElement("option");
    option.value = mood;
    option.textContent = mood;
    moodInput.appendChild(option);
  });
  moodInput.value = moods[1];

  wireDonationButtons();
  document.querySelectorAll(".mode-card").forEach((button) => {
    button.addEventListener("click", () => {
      selectedChaos = Number(button.dataset.chaos);
      document.querySelectorAll(".mode-card").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  form.addEventListener("submit", handleGenerate);
  $("#randomDemoButton").addEventListener("click", randomDemo);
  $("#copyButton").addEventListener("click", copyResult);
  $("#shareButton").addEventListener("click", shareResult);
  $("#againButton").addEventListener("click", handleGenerate);
  $("#closeResultButton").addEventListener("click", () => resultCard.classList.add("hidden"));
  $("#clearLeaderboardButton").addEventListener("click", clearLeaderboard);
  if (spotlightForm) spotlightForm.addEventListener("submit", handleSpotlightSubmit);
  if (spotlightMessageInput) spotlightMessageInput.addEventListener("input", updateMessageCounter);
  const clearSpotlightButton = $("#clearSpotlightButton");
  if (clearSpotlightButton) clearSpotlightButton.addEventListener("click", clearSpotlightWall);

  randomDemo();
  renderLeaderboard();
  renderSpotlightQueue();
  bootSpotlight();
  bootGlobalDonatelloFeed();
}

function wireDonationButtons() {
  const donationTargets = [
    ["donateButton", CONFIG.donationUrl],
    ["spotlightDonateButton", CONFIG.donationUrl],
    ["heroDonateButton", CONFIG.donationUrl],
    ["donatelloDonateButton", CONFIG.donationLinks.donatello],
    ["monoDonateButton", CONFIG.donationLinks.monobank],
    ["paypalDonateButton", CONFIG.donationLinks.paypal],
  ];

  donationTargets.forEach(([id, url]) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.href = url || CONFIG.donationUrl;
    element.target = "_blank";
    element.rel = "noreferrer";
  });
}

function sanitize(value, fallback) {
  const trimmed = String(value || "").trim().replace(/[<>]/g, "");
  return trimmed || fallback;
}

function seededRandom(seed) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return ((h >>> 0) % 100000) / 100000;
  };
}

function pickMany(list, count, rand) {
  const copy = [...list];
  const result = [];
  while (copy.length && result.length < count) {
    const index = Math.floor(rand() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
}

function buildResult({ name, food, mood, chaos, randomThing }) {
  const safeName = sanitize(name, "You");
  const safeFood = sanitize(food, "snacks");
  const safeMood = sanitize(mood, "mysterious");
  const safeThing = sanitize(randomThing, "has unexplained main character energy");
  const rand = seededRandom(`${safeName}-${safeFood}-${safeMood}-${chaos}-${safeThing}-${Date.now()}`);

  const archetype = archetypes[Math.floor(rand() * archetypes.length)];
  const opener = openers[Math.floor(rand() * openers.length)].replace("{food}", safeFood);
  const baseFacts = chaos === 3 ? [...facts, ...savageFacts] : facts;
  const factCount = chaos === 1 ? 3 : chaos === 2 ? 5 : 6;
  const selectedFacts = pickMany(baseFacts, factCount, rand);
  const accuracy = 71 + Math.floor(rand() * 28);
  const weirdness = 66 + Math.floor(rand() * 31);
  const shareability = weirdness > 90 ? "Insane" : weirdness > 80 ? "High" : "Medium";
  const shareCaption = shareCaptions[Math.floor(rand() * shareCaptions.length)];

  if (safeThing.length > 3) {
    selectedFacts.splice(1, 0, `The fact that you said “${safeThing}” explains at least 63% of your current timeline.`);
  }

  return {
    name: safeName,
    food: safeFood,
    mood: safeMood,
    randomThing: safeThing,
    chaos,
    archetype,
    opener,
    selectedFacts,
    accuracy,
    weirdness,
    shareability,
    shareCaption,
    createdAt: new Date().toISOString(),
  };
}

function handleGenerate(event) {
  if (event?.preventDefault) event.preventDefault();

  const result = buildResult({
    name: $("#nameInput").value,
    food: $("#foodInput").value,
    mood: $("#moodInput").value,
    chaos: selectedChaos,
    randomThing: $("#randomInput").value,
  });

  currentResult = result;
  renderResult(result);
  saveToLeaderboard(result);
  renderLeaderboard();
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
}

function renderResult(result) {
  resultCard.classList.remove("hidden");
  $("#resultType").textContent = result.archetype;
  $("#resultIntro").textContent = `${result.name} ${result.opener}`;
  $("#accuracyScore").textContent = `${result.accuracy}%`;
  $("#weirdnessScore").textContent = `${result.weirdness}%`;
  $("#shareScore").textContent = result.shareability;

  factsList.innerHTML = "";
  result.selectedFacts.forEach((fact, index) => {
    const item = document.createElement("div");
    item.className = "fact-item";
    item.style.animationDelay = `${index * 40}ms`;
    item.innerHTML = `<strong>#${index + 1}</strong>${escapeHtml(fact)}`;
    factsList.appendChild(item);
  });
}

function randomDemo() {
  const name = demoNames[Math.floor(Math.random() * demoNames.length)];
  const food = demoFoods[Math.floor(Math.random() * demoFoods.length)];
  const randomThing = demoThings[Math.floor(Math.random() * demoThings.length)];
  const mood = moods[Math.floor(Math.random() * moods.length)];
  const result = buildResult({ name, food, mood, chaos: 2, randomThing });

  $("#demoType").textContent = result.archetype;
  $("#demoText").textContent = `${result.name} ${result.opener} ${result.selectedFacts[0]}`;
  $("#demoAccuracy").textContent = `${result.accuracy}%`;
  $("#demoWeirdness").textContent = `${result.weirdness}%`;
}

function getShareText() {
  if (!currentResult) return `Try ${CONFIG.siteName}`;
  return `${currentResult.shareCaption}\n\n${currentResult.name} is a ${currentResult.archetype}.\n${currentResult.selectedFacts[0]}\n\nTry it: ${CONFIG.siteName}`;
}

async function copyResult() {
  try {
    await navigator.clipboard.writeText(getShareText());
    showToast("Copied. Send it to someone who deserves emotional damage.");
  } catch {
    showToast("Copy failed. Your browser chose chaos.");
  }
}

async function shareResult() {
  const text = getShareText();
  try {
    if (navigator.share) {
      await navigator.share({ title: CONFIG.siteName, text });
      showToast("Shared. The group chat is now unstable.");
    } else {
      await navigator.clipboard.writeText(text);
      showToast("Share is not supported here, so I copied it instead.");
    }
  } catch {
    showToast("Share cancelled. Probably for the best.");
  }
}

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem("akttm_leaderboard") || "[]");
  } catch {
    return [];
  }
}

function saveToLeaderboard(result) {
  const list = getLeaderboard();
  list.push({
    name: result.name,
    archetype: result.archetype,
    score: result.weirdness,
    accuracy: result.accuracy,
    createdAt: result.createdAt,
  });
  const sorted = list.sort((a, b) => b.score - a.score).slice(0, 10);
  localStorage.setItem("akttm_leaderboard", JSON.stringify(sorted));
}

function renderLeaderboard() {
  const list = getLeaderboard();
  leaderboardList.innerHTML = "";

  if (!list.length) {
    leaderboardList.innerHTML = `<div class="empty-state">No victims yet. Generate a result to enter the local leaderboard.</div>`;
    return;
  }

  list.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "leader-row";
    row.innerHTML = `
      <span class="rank">#${index + 1}</span>
      <span>
        <span class="leader-name">${escapeHtml(item.name)}</span>
        <span class="leader-meta">${escapeHtml(item.archetype)} · ${item.accuracy}% accurate</span>
      </span>
      <span class="leader-score">${item.score}%</span>
    `;
    leaderboardList.appendChild(row);
  });
}

function clearLeaderboard() {
  localStorage.removeItem("akttm_leaderboard");
  renderLeaderboard();
  showToast("Local leaderboard cleared.");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function updateMessageCounter() {
  const counter = $("#messageCounter");
  if (!counter || !spotlightMessageInput) return;
  counter.textContent = String(spotlightMessageInput.value.length);
}

function getSpotlightQueue() {
  try {
    return JSON.parse(localStorage.getItem("akttm_spotlight_queue") || "[]");
  } catch {
    return [];
  }
}

function saveSpotlightQueue(queue) {
  localStorage.setItem("akttm_spotlight_queue", JSON.stringify(queue.slice(0, 20)));
}

function isUnsafeSpotlightMessage(message) {
  const normalized = message.toLowerCase();
  const blockedFragments = [
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
  ];
  return blockedFragments.some((fragment) => normalized.includes(fragment));
}

function handleSpotlightSubmit(event) {
  event.preventDefault();

  const name = sanitize($("#spotlightNameInput").value, "Anonymous Goblin").slice(0, 24);
  const message = sanitize($("#spotlightMessageInput").value, "").slice(0, 110);
  const proof = sanitize($("#paymentProofInput").value, "demo").slice(0, 40);

  if (name.length < 2) {
    showToast("Add a display name first.");
    return;
  }

  if (message.length < 5) {
    showToast("Message is too short. Make it funnier.");
    return;
  }

  if (isUnsafeSpotlightMessage(message)) {
    showToast("Message blocked: no links, spam, casino, or suspicious promos.");
    return;
  }

  const item = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    message,
    proof,
    amount: "$1",
    durationMs: CONFIG.spotlightDurationMs,
    createdAt: new Date().toISOString(),
  };

  const queue = getSpotlightQueue();
  queue.push(item);
  saveSpotlightQueue(queue);

  spotlightForm.reset();
  updateMessageCounter();
  renderSpotlightQueue();
  showToast("Local test message added. Real paid messages come from Donatello.");

  if (!activeSpotlight) startNextSpotlight();
}

function bootSpotlight() {
  updateMessageCounter();
  startNextSpotlight();
}

function startNextSpotlight() {
  const queue = getSpotlightQueue();
  const next = queue.shift();
  saveSpotlightQueue(queue);
  renderSpotlightQueue();

  if (!next) {
    activeSpotlight = null;
    renderEmptySpotlight();
    return;
  }

  activeSpotlight = {
    ...next,
    startedAt: Date.now(),
    endsAt: Date.now() + Number(next.durationMs || CONFIG.spotlightDurationMs),
  };

  renderActiveSpotlight();
  window.clearInterval(spotlightInterval);
  spotlightInterval = window.setInterval(renderActiveSpotlight, 250);
}

function renderEmptySpotlight() {
  window.clearInterval(spotlightInterval);
  $("#spotlightLiveName").textContent = "Waiting for Donatello messages";
  $("#spotlightLiveMessage").textContent = "When someone donates and leaves a message, it will appear here for 30 seconds.";
  $("#spotlightSeconds").textContent = "30s";
  $("#spotlightProgress").style.width = "0%";
}

function renderActiveSpotlight() {
  if (!activeSpotlight) {
    renderEmptySpotlight();
    return;
  }

  const now = Date.now();
  const total = activeSpotlight.endsAt - activeSpotlight.startedAt;
  const left = Math.max(0, activeSpotlight.endsAt - now);
  const progress = Math.min(100, Math.max(0, ((total - left) / total) * 100));

  $("#spotlightLiveName").textContent = `${activeSpotlight.name} · ${activeSpotlight.amount} supporter`;
  $("#spotlightLiveMessage").textContent = activeSpotlight.message;
  $("#spotlightSeconds").textContent = `${Math.ceil(left / 1000)}s`;
  $("#spotlightProgress").style.width = `${progress}%`;

  if (left <= 0) {
    window.clearInterval(spotlightInterval);
    activeSpotlight = null;
    startNextSpotlight();
  }
}

function renderSpotlightQueue() {
  if (!spotlightQueueList) return;
  const queue = getSpotlightQueue();
  spotlightQueueList.innerHTML = "";

  if (!queue.length) {
    spotlightQueueList.innerHTML = `<div class="empty-state">No messages waiting. New Donatello messages will appear here after the GitHub Action syncs.</div>`;
    return;
  }

  queue.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "queue-row";
    row.innerHTML = `
      <span class="queue-number">${index + 1}</span>
      <span>
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.message)}</p>
      </span>
      <small>${escapeHtml(item.amount)} · 30s</small>
    `;
    spotlightQueueList.appendChild(row);
  });
}

function clearSpotlightWall() {
  localStorage.removeItem("akttm_spotlight_queue");
  activeSpotlight = null;
  renderSpotlightQueue();
  renderEmptySpotlight();
  showToast("Donor wall cleared in this browser.");
}

function getSeenDonationIds() {
  try {
    return new Set(JSON.parse(localStorage.getItem("akttm_seen_donations") || "[]"));
  } catch {
    return new Set();
  }
}

function saveSeenDonationIds(ids) {
  localStorage.setItem("akttm_seen_donations", JSON.stringify([...ids].slice(-200)));
}

function normalizeDonationFromFeed(donation) {
  const id = sanitize(donation.id || `${donation.name}-${donation.message}-${donation.createdAt}`, "unknown");
  const name = sanitize(donation.name || "Anonymous supporter", "Anonymous supporter").slice(0, 24);
  const message = sanitize(donation.message || "Supported the chaos.", "Supported the chaos.").slice(0, 110);
  const amount = sanitize(donation.amount || "Donatello", "Donatello").slice(0, 24);

  if (message.length < 2 || isUnsafeSpotlightMessage(message)) return null;

  return {
    id: `donatello-${id}`,
    name,
    message,
    amount,
    durationMs: CONFIG.spotlightDurationMs,
    createdAt: donation.createdAt || new Date().toISOString(),
  };
}

async function fetchGlobalDonatelloMessages({ initial = false } = {}) {
  if (!CONFIG.donationsFeedUrl) return;

  try {
    const response = await fetch(`${CONFIG.donationsFeedUrl}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Feed HTTP ${response.status}`);

    const data = await response.json();
    const donations = Array.isArray(data.donations) ? data.donations : [];
    if (!donations.length) return;

    const seen = getSeenDonationIds();
    const queue = getSpotlightQueue();
    const alreadyQueued = new Set(queue.map((item) => item.id));
    if (activeSpotlight?.id) alreadyQueued.add(activeSpotlight.id);

    let incoming = donations
      .map(normalizeDonationFromFeed)
      .filter(Boolean)
      .filter((item) => !seen.has(item.id) && !alreadyQueued.has(item.id));

    if (initial && incoming.length > CONFIG.showLatestDonationsOnFirstVisit) {
      incoming = incoming.slice(0, CONFIG.showLatestDonationsOnFirstVisit);
    }

    if (!incoming.length) return;

    incoming.reverse().forEach((item) => {
      queue.push(item);
      seen.add(item.id);
    });

    saveSpotlightQueue(queue);
    saveSeenDonationIds(seen);
    renderSpotlightQueue();
    if (!activeSpotlight) startNextSpotlight();
    showToast(`Loaded ${incoming.length} Donatello message${incoming.length > 1 ? "s" : ""}.`);
  } catch (error) {
    console.warn("Could not load Donatello donations feed:", error);
  }
}

function bootGlobalDonatelloFeed() {
  fetchGlobalDonatelloMessages({ initial: true });
  window.setInterval(() => fetchGlobalDonatelloMessages(), CONFIG.donationsPollMs);
}

init();
