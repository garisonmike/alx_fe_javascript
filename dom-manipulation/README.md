# Dynamic Quote Generator

A comprehensive web application demonstrating advanced DOM manipulation, web storage, and JSON data handling.

## Features

### Task 0: Advanced DOM Manipulation 
- **Dynamic Quote Display**: Shows random quotes from different categories
- **Interactive UI**: Dynamically generated form elements
- **Random Quote Generator**: Click "Show New Quote" to display a random quote
- **Add New Quotes**: Users can add their own quotes with custom categories

### Task 1: Web Storage and JSON Handling 
- **Local Storage**: Persists all quotes across browser sessions
- **Session Storage**: Remembers the last viewed quote during the current session
- **JSON Export**: Download all quotes as a JSON file
- **JSON Import**: Upload and import quotes from a JSON file
- **Data Persistence**: All changes are automatically saved

### Task 2: Dynamic Content Filtering 
- **Category Filtering**: Filter quotes by category using a dropdown menu
- **Dynamic Categories**: Categories are automatically extracted from quotes
- **Filter Persistence**: Last selected filter is remembered across sessions
- **Real-time Updates**: Categories update automatically when new quotes are added

### Task 3: Server Sync and Conflict Resolution 
- **Server Simulation**: Uses JSONPlaceholder API to simulate server interactions
- **Periodic Sync**: Automatically syncs with server every 30 seconds
- **Manual Sync**: Click "Sync with Server" button to sync immediately
- **Conflict Resolution**: Server data takes precedence when conflicts occur
- **Status Notifications**: Visual feedback for sync operations

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling and responsive design
- **JavaScript (ES6+)**: Advanced DOM manipulation and data handling
- **Web Storage API**: localStorage and sessionStorage
- **Fetch API**: Asynchronous server communication
- **FileReader API**: JSON file import functionality
- **Blob API**: JSON file export functionality

## How to Use

1. **View Quotes**: The application loads with a random quote displayed
2. **Show New Quote**: Click the button to display a different random quote
3. **Filter by Category**: Use the dropdown to filter quotes by category
4. **Add New Quote**: 
   - Enter quote text in the first input field
   - Enter category in the second input field
   - Click "Add Quote" button
5. **Export Quotes**: Click "Export Quotes to JSON" to download your quotes
6. **Import Quotes**: Click the file input and select a JSON file to import
7. **Sync with Server**: Click "Sync with Server" to manually fetch server quotes

## Project Structure

```
dom-manipulation/
├── index.html       # Main HTML file with structure and styling
├── script.js        # JavaScript with all functionality
└── README.md        # This file
```

## Key Functions

- `showRandomQuote()`: Displays a random quote
- `createAddQuoteForm()`: Dynamically creates the quote input form
- `addQuote()`: Adds a new quote to the collection
- `populateCategories()`: Updates the category filter dropdown
- `filterQuotes()`: Filters and displays quotes by category
- `saveQuotes()`: Persists quotes to localStorage
- `exportToJsonFile()`: Exports quotes as JSON file
- `importFromJsonFile()`: Imports quotes from JSON file
- `syncQuotes()`: Syncs local data with server
- `fetchQuotesFromServer()`: Fetches quotes from mock API
- `sendQuoteToServer()`: Posts new quotes to server

## Storage Keys

- `quotesData`: Stores the array of quotes in localStorage
- `selectedCategory`: Stores the last selected category filter in localStorage
- `lastViewedQuote`: Stores the last viewed quote in sessionStorage

## Running the Application

### Option 1: Direct File Opening
Simply open `index.html` in your web browser.

### Option 2: Local Server
```bash
# Navigate to the project directory
cd dom-manipulation

# Start a local server (Python 3)
python3 -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Open browser to http://localhost:8000
```

### Option 3: Using VS Code Live Server
1. Install the Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Data Format

Quotes are stored in the following JSON format:

```json
[
  {
    "id": 1,
    "text": "The best way to get started is to quit talking and begin doing.",
    "category": "Motivation"
  },
  {
    "id": 2,
    "text": "Talk is cheap. Show me the code.",
    "category": "Programming"
  }
]
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Learning Outcomes

This project demonstrates proficiency in:

Advanced DOM manipulation techniques
Event-driven programming
Local storage and session storage implementation
JSON data import/export
Asynchronous operations with Fetch API
Dynamic content filtering
Server synchronization and conflict resolution
File handling in the browser
Modern JavaScript ES6+ features

## Future Enhancements

- Add quote editing functionality
- Implement quote deletion
- Add user authentication
- Create a rating system for quotes
- Add search functionality
- Implement quote sharing to social media
- Add dark mode toggle
- Create animations for quote transitions

## Author

**ALX Frontend JavaScript Program**

## License

This project is part of the ALX Software Engineering curriculum.
