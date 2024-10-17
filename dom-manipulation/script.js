const quotes = [];

let currentQuoteIndex = 0;
let currentCategory = "";

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    localStorage.setItem("quotes", JSON.stringify(quotes));
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");

    // Update the categories list
    populateCategories();
  } else {
    alert("Please enter both quote text and category.");
  }
}

function showNewQuote() {
  currentQuoteIndex++;
  if (currentQuoteIndex >= quotes.length) {
    currentQuoteIndex = 0;
  }

  const quote = quotes[currentQuoteIndex];
  document.getElementById("quoteDisplay").innerHTML = `
    <p>${quote.text}</p>
    <p>Category: ${quote.category}</p>
  `;
}

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerHTML   
 = `
    <p>${randomQuote.text}</p>
    <p>Category: ${randomQuote.category}</p>
  `;
}

function createAddQuoteForm() {
  const form = document.createElement("form");
  form.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;
  document.body.appendChild(form);
}

function exportQuotes() {
  const data = JSON.stringify(quotes);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download   
 = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}

function populateCategories() {
  const categories = quotes.map(quote => quote.category);
  const uniqueCategories = [...new Set(categories)];

  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";

  uniqueCategories.forEach(category => {
    const categoryOption = document.createElement("option");
    categoryOption.value = category;
    categoryOption.textContent = category;
    categoryList.appendChild(categoryOption);   

  });
}

function categoryFilter() {
  const selectedCategory = document.getElementById("categoryList").value;

  if (selectedCategory === "") {
    quotes.forEach(quote => {
      quote.display = true;
    });
  } else {
    quotes.forEach(quote => {
      quote.display = quote.category === selectedCategory;
    });
  }

  showNewQuote();
}

function filterQuote(searchText) {
  quotes.forEach(quote => {
    quote.display = quote.text.toLowerCase().includes(searchText.toLowerCase());
  });

  showNewQuote();
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title:   
 'This is a new quote',
        body: 'This is the body of the quote.'
      })
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
}

function syncQuotes() {
  // Implement your synchronization logic here
  // For example, you could send the current quotes to a server and retrieve any updated quotes.
  console.log("Quotes synced with server!");
}

// Load quotes from localStorage on page load
const storedQuotes = localStorage.getItem("quotes");
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
}

// Fetch quotes from server
fetchQuotesFromServer();

// Initialize the quote display with the first quote
showNewQuote();

// Add event listeners for buttons
document.getElementById("newQuote").addEventListener("click", showNewQuote);
document.getElementById("quoteDisplay").addEventListener("click", showRandomQuote);
createAddQuoteForm();

// Add export button
const exportButton = document.createElement('button');
exportButton.textContent = 'Export Quotes';
exportButton.addEventListener('click', exportQuotes);
document.body.appendChild(exportButton);

// Add category filter
const categoryFilterDiv = document.createElement('div');
categoryFilterDiv.innerHTML = `
  <label for="categoryList">Filter by Category:</label>
  <select id="categoryList" onchange="categoryFilter()">
    <option value="">All</option>
  </select>
`;
document.body.appendChild(categoryFilterDiv);

// Add search bar for filtering quotes
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Search for quotes';
searchBar.addEventListener('input', () => filterQuote(searchBar.value));
document.body.appendChild(searchBar);

// Add sync button
const syncButton = document.createElement('button');
syncButton.textContent = 'Sync Quotes';
syncButton.addEventListener('click', syncQuotes);
document.body.appendChild(syncButton);

// Populate categories initially
populateCategories();

// Automatically update the quote every 30 seconds
setInterval(showNewQuote, 30000);
