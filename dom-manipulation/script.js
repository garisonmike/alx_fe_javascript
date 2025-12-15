// Ensure quotes array exists and is valid
let quotes = window.quotes;

if (!Array.isArray(quotes)) {
  quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal.", category: "Inspiration" }
  ];
}

// Validate quote objects structure
quotes = quotes.filter(quote =>
  quote &&
  typeof quote.text === "string" &&
  typeof quote.category === "string"
);

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");

/**
 * Display a random quote
 */
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
}

/**
 * Create Add Quote Form dynamically
 */
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

/**
 * Add a new quote safely
 */
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Both quote text and category are required.");
    return;
  }

  quotes.push({ text, category });
  showRandomQuote();
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize
createAddQuoteForm();
