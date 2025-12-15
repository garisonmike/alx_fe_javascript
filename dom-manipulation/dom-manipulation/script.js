// Quotes array
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
  { text: "Talk is cheap. Show me the code.", category: "Technology" },
  { text: "Programs must be written for people to read.", category: "Programming" }
];

// DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const formContainer = document.getElementById("formContainer");

/**
 * Displays a random quote from the array
 */
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>Category: ${quote.category}</small>
  `;
}

/**
 * Creates and displays the Add Quote form dynamically
 */
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", addQuote);

  formDiv.appendChild(quoteInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);

  formContainer.appendChild(formDiv);
}

/**
 * Adds a new quote to the array and updates the DOM
 */
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText === "" || quoteCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({
    text: quoteText,
    category: quoteCategory
  });

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  showRandomQuote();
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize form on page load
createAddQuoteForm();
