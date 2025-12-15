// ---------- STORAGE KEYS ----------
const STORAGE_KEY = "quotesData";
const SESSION_KEY = "lastViewedQuote";

// ---------- LOAD QUOTES ----------
let quotes = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (!Array.isArray(quotes)) {
  quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Talk is cheap. Show me the code.", category: "Programming" }
  ];
  saveQuotes();
}

// ---------- DOM ELEMENTS ----------
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportQuotes");
const formContainer = document.getElementById("formContainer");

// ---------- SAVE TO LOCAL STORAGE ----------
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

// ---------- SHOW RANDOM QUOTE ----------
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const index = Math.floor(Math.random() * quotes.length);
  const quote = quotes[index];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;

  // Save last viewed quote in session storage
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(quote));
}

// ---------- LOAD LAST SESSION QUOTE ----------
const lastQuote = JSON.parse(sessionStorage.getItem(SESSION_KEY));
if (lastQuote) {
  quoteDisplay.innerHTML = `
    <p>"${lastQuote.text}"</p>
    <small>Category: ${lastQuote.category}</small>
  `;
}

// ---------- CREATE ADD QUOTE FORM ----------
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  formDiv.append(quoteInput, categoryInput, addButton);
  formContainer.appendChild(formDiv);
}

// ---------- ADD QUOTE ----------
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  showRandomQuote();
}

// ---------- EXPORT TO JSON ----------
function exportToJson() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ---------- IMPORT FROM JSON ----------
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (error) {
      alert("Error reading JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// ---------- EVENT LISTENERS ----------
newQuoteBtn.addEventListener("click", showRandomQuote);
exportBtn.addEventListener("click", exportToJson);

// ---------- INITIALIZE ----------
createAddQuoteForm();

