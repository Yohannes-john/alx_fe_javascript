 const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Live life to the fullest and focus on the positive.", category: "Motivation" },
  { text: "Believe you can and you're halfway there.", category: "Inspiration" },
  // Add more quotes here
];

let currentQuoteIndex = 0;

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
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
function "localStorage.setItem"() {
const storedQuotes = localStorage.getItem("quotes");
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
}

showNewQuote();
document.getElementById("newQuote").addEventListener("click", showNewQuote);
document.getElementById("quoteDisplay").addEventListener("click", showRandomQuote);
createAddQuoteForm();
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

// Load quotes from localStorage on page load
const storedQuotes = localStorage.getItem("quotes");
if (storedQuotes) {
  quotes = JSON.parse(storedQuotes);
}

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
// Add file input for importing quotes
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.addEventListener('change', function(event) {
  const file = event.target.files[0];   

  if (file) {
    const reader = new FileReader();
    reader.onload   
 = function() {
      const quotesData = JSON.parse(reader.result);
      quotes = quotes.concat(quotesData);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      alert('Quotes imported successfully!');
    };
    reader.readAsText(file);
  }
});
document.body.appendChild(fileInput);
