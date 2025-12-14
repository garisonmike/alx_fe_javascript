// Array of quote objects (Data)
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Do not let what you cannot do interfere with what you can do.", category: "Inspiration" }
];

// Function to display a random quote (DOM Manipulation)
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Get a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Clear previous content
    quoteDisplay.innerHTML = '';

    // Create elements dynamically
    const quoteText = document.createElement('p');
    quoteText.textContent = `"${randomQuote.text}"`;
    
    const quoteCategory = document.createElement('em');
    quoteCategory.textContent = `- Category: ${randomQuote.category}`;

    // Append elements to the display container
    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Function to add a new quote (Data + DOM Update)
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    // Simple validation
    if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Create new quote object
    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory
    };

    // Add to the array
    quotes.push(newQuote);

    // Optional: Update the DOM immediately to show the new quote
    // or simply clear the inputs for the next entry
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
    
    alert("Quote added successfully!");
    
    // Optional: Display the newly added quote immediately
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${newQuote.text}"</p><em>- Category: ${newQuote.category}</em>`;
}

// Optional: Function to create the add quote form dynamically
// (Included to meet the specific naming requirement in the prompt, 
// though the HTML structure is already provided in index.html)
function createAddQuoteForm() {
    // This function can be used if you wanted to generate the form fields 
    // strictly via JavaScript rather than having them in the HTML.
    // For this specific task, the logic is handled by the addQuote function above.
    console.log("Add Quote Form logic initialized.");
}

// Event Listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Initial call to display a quote when the page loads
showRandomQuote();
