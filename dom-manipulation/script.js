// ---------- STORAGE KEYS ----------
const QUOTES_KEY = "quotesData";
const FILTER_KEY = "selectedCategory";

// ---------- MOCK SERVER URL ----------
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// ---------- LOAD LOCAL QUOTES ----------
let quotes = JSON.parse(localStorage.getItem(QUOTES_KEY)) || [
  { id: 1, text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { id: 2, text: "Talk is cheap. Show me the code.", category: "Programming" }
];

// ---------- DOM ELEMENTS ----------
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");
const syncStatus = document.getElementById("syncStatus");
const syncBtn = document.getElementById("syncServer");
const formContainer = document.getElementById("formContainer");

// ---------- SAVE LOCAL ----------
function saveQuotes() {
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

// ---------- POPULATE CATEGORIES ----------
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem(FILTER_KEY);
  if (savedFilter) categoryFilter.value = savedFilter;
}

// ---------- FILTER QUOTES ----------
function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem(FILTER_KEY, selected);

  const filtered =
    selected === "all"
      ? quotes
      : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes found.";
    return;
  }

  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>${quote.category}</small>
  `;
}

// ---------- ADD QUOTE ----------
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) return alert("All fields required");

  quotes.push({
    id: Date.now(),
    text,
    category
  });

  saveQuotes();
  populateCategories();
  filterQuotes();
}

// ---------- CREATE FORM ----------
function createAddQuoteForm() {
  const input1 = document.createElement("input");
  input1.id = "newQuoteText";
  input1.placeholder = "Enter quote";

  const input2 = document.createElement("input");
  input2.id = "newQuoteCategory";
  input2.placeholder = "Category";

  const btn = document.createElement("button");
  btn.textContent = "Add Quote";
  btn.onclick = addQuote;

  formContainer.append(input1, input2, btn);
}

// ---------- SERVER SYNC ----------
async function syncWithServer() {
  syncStatus.textContent = "Syncing with server...";

  try {
    // Fetch server data (simulated quotes)
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();

    // Convert server posts to quote format
    const serverQuotes = serverData.slice(0, 5).map(post => ({
      id: post.id,
      text: post.title,
      category: "Server"
    }));

    // ---------- CONFLICT RESOLUTION ----------
    // Server data takes precedence
    const localIds = new Set(quotes.map(q => q.id));
    serverQuotes.forEach(sq => {
      if (!localIds.has(sq.id)) {
        quotes.push(sq);
      }
    });

    saveQuotes();
    populateCategories();
    filterQuotes();

    syncStatus.textContent = "✔ Data synced. Server updates applied.";
    alert("Conflicts resolved: Server data took precedence.");

  } catch (error) {
    syncStatus.textContent = "❌ Sync failed.";
  }
}

// ---------- PERIODIC SYNC ----------
setInterval(syncWithServer, 30000); // every 30 seconds

// ---------- EVENT LISTENER ----------
syncBtn.addEventListener("click", syncWithServer);

// ---------- INIT ----------
populateCategories();
createAddQuoteForm();
filterQuotes();
saveQuotes();
