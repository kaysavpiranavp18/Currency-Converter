const currencies = [
    'USD', 'EUR', 'GBP', 'INR', 'AUD', 'CAD', 'JPY', 'CNY', 'MXN', 'CHF', 'SGD', 'NZD', 'SEK', 'NOK', 'RUB'
];

const currencyNames = {
    'USD': 'United States Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'INR': 'Indian Rupee',
    'AUD': 'Australian Dollar',
    'CAD': 'Canadian Dollar',
    'JPY': 'Japanese Yen',
    'CNY': 'Chinese Yuan',
    'MXN': 'Mexican Peso',
    'CHF': 'Swiss Franc',
    'SGD': 'Singapore Dollar',
    'NZD': 'New Zealand Dollar',
    'SEK': 'Swedish Krona',
    'NOK': 'Norwegian Krone',
    'RUB': 'Russian Ruble'
};

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');

function populateCurrencies() {
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = `${currency} - ${currencyNames[currency]}`;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = `${currency} - ${currencyNames[currency]}`;
        toCurrencySelect.appendChild(optionTo);
    });
}

populateCurrencies();

async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (fromCurrency === toCurrency) {
        document.getElementById('result').textContent = amount;
        return;
    }

    const apiKey = '82723e0a960ce0f0c9698efb';
    const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert("Error fetching data");
            return;
        }

        const exchangeRate = data.rates[toCurrency];
        if (!exchangeRate) {
            alert(`Exchange rate not available for ${toCurrency}`);
            return;
        }

        const convertedAmount = amount * exchangeRate;
        document.getElementById('result').textContent = convertedAmount.toFixed(2);
    } catch (error) {
        console.error("Error fetching exchange rates:", error);
    }
}

window.onload = () => {
    const text = "CURRENCY CONVERTER 💱";
    const titleElement = document.getElementById('currency-title');

    let index = 0;

    function type() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 150);
        }
    }

    type();
}