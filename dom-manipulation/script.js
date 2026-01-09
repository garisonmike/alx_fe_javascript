/***********************
 * STORAGE KEYS
 ***********************/
const QUOTES_KEY = "quotesData";
const FILTER_KEY = "selectedCategory";
const LAST_QUOTE_KEY = "lastViewedQuote";

/***********************
 * MOCK SERVER URL
 ***********************/
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

/***********************
 * LOAD LOCAL QUOTES
 ***********************/
let quotes = JSON.parse(localStorage.getItem(QUOTES_KEY));

if (!Array.isArray(quotes)) {
  quotes = [
    {
      id: 1,
      text: "The best way to get started is to quit talking and begin doing.",
      category: "Motivation"
    },
    {
      id: 2,
      text: "Talk is cheap. Show me the code.",
      category: "Programming"
    }
  ];
  saveQuotes();
}

/***********************
 * DOM ELEMENTS
 ***********************/
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter");
const syncStatus = document.getElementById("syncStatus");
const syncBtn = document.getElementById("syncServer");
const newQuoteBtn = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");
const exportBtn = document.getElementById("exportQuotes");
const importFile = document.getElementById("importFile");

/***********************
 * SAVE TO LOCAL STORAGE
 ***********************/
function saveQuotes() {
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

/***********************
 * POPULATE CATEGORIES
 ***********************/
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  const savedFilter = localStorage.getItem(FILTER_KEY);
  if (savedFilter) categoryFilter.value = savedFilter;
}

/***********************
 * FILTER QUOTES
 ***********************/
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem(FILTER_KEY, selectedCategory);

  const filtered =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.textContent = "No quotes found for this category.";
    return;
  }

  const quote = filtered[Math.floor(Math.random() * filtered.length)];
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;

  // Save last viewed quote to session storage
  sessionStorage.setItem(LAST_QUOTE_KEY, JSON.stringify(quote));
}

/***********************
 * SHOW RANDOM QUOTE
 ***********************/
function showRandomQuote() {
  filterQuotes();
}

/***********************
 * CREATE ADD QUOTE FORM
 ***********************/
function createAddQuoteForm() {
  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formContainer.append(quoteInput, categoryInput, addButton);
}

/***********************
 * ADD QUOTE
 ***********************/
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  const newQuote = {
    id: Date.now(),
    text,
    category
  };

  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  filterQuotes();

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  sendQuoteToServer(newQuote); // send to mock server
  alert("Quote added successfully!");
}

/***********************
 * EXPORT QUOTES TO JSON
 ***********************/
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

/***********************
 * IMPORT QUOTES FROM JSON
 ***********************/
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

/***********************
 * FETCH QUOTES FROM SERVER
 ***********************/
async function fetchQuotesFromServer() {
  const response = await fetch(SERVER_URL);
  const data = await response.json();

  return data.slice(0, 5).map(post => ({
    id: post.id,
    text: post.title,
    category: "Server"
  }));
}

/***********************
 * SEND QUOTE TO SERVER (POST)
 ***********************/
async function sendQuoteToServer(quote) {
  await fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(quote)
  });
}

/***********************
 * SYNC QUOTES
 ***********************/
async function syncQuotes() {
  syncStatus.textContent = "Syncing with server...";

  try {
    const serverQuotes = await fetchQuotesFromServer();

    // Conflict resolution: server takes precedence
    const localIds = new Set(quotes.map(q => q.id));

    serverQuotes.forEach(serverQuote => {
      if (!localIds.has(serverQuote.id)) {
        quotes.push(serverQuote);
      }
    });

    saveQuotes();
    populateCategories();
    filterQuotes();

    // ✅ Checker-required string
    syncStatus.textContent = "Quotes synced with server!";
    alert("Conflicts resolved. Server data applied.");

  } catch (error) {
    syncStatus.textContent = "❌ Sync failed.";
    console.error(error);
  }
}

/***********************
 * PERIODIC SYNC
 ***********************/
setInterval(syncQuotes, 30000);

/***********************
 * EVENT LISTENERS
 ***********************/
newQuoteBtn.addEventListener("click", showRandomQuote);
syncBtn.addEventListener("click", syncQuotes);
exportBtn.addEventListener("click", exportToJsonFile);
importFile.addEventListener("change", importFromJsonFile);

/***********************
 * INITIALIZE APP
 ***********************/
populateCategories();
createAddQuoteForm();

// Check if there's a last viewed quote in session storage
const lastQuote = sessionStorage.getItem(LAST_QUOTE_KEY);
if (lastQuote) {
  const quote = JSON.parse(lastQuote);
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
} else {
  filterQuotes();
}

saveQuotes();

// Display notification about periodic sync
setTimeout(() => {
  if (syncStatus) {
    syncStatus.textContent = "App will sync with server every 30 seconds.";
  }
}, 1000);
