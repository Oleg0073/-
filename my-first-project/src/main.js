document.addEventListener('DOMContentLoaded', function () {
    const exchangeRateElement = document.getElementById('exchange-rate');
    const fromCurrencyElement = document.getElementById('fromCurrency');
    const toCurrencyElement = document.getElementById('toCurrency');
    const fromAmountElement = document.getElementById('fromAmount');
    const toAmountElement = document.getElementById('toAmount');

    
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/UAH`;
        {
            
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const exchangeRateUSD = data.rates.USD;
            const exchangeRateEUR = data.rates.EUR;
            exchangeRateElement.innerText = `Exchange Rates: 1 USD = ${exchangeRateUSD.toFixed(2)} UAH, 1 EUR = ${exchangeRateEUR.toFixed(2)} UAH`;

            
            [fromAmountElement, fromCurrencyElement, toCurrencyElement].forEach(element => {
                element.addEventListener('input', updateConversion);
            });

        
            updateConversion();
        })
        .catch(error => console.error('Error fetching exchange rates:', error));
    function updateConversion() {
        const fromCurrency = fromCurrencyElement.value;
        const toCurrency = toCurrencyElement.value;
        const fromAmount = parseFloat(fromAmountElement.value) || 0;

        let convertedAmount;

        if (fromCurrency === toCurrency) {
            convertedAmount = fromAmount;
        } else if (fromCurrency === 'UAH') {
            convertedAmount = fromAmount / data.rates[toCurrency];
        } else if (toCurrency === 'UAH') {
            convertedAmount = fromAmount * data.rates[fromCurrency];
        } else {
            convertedAmount = (fromAmount * data.rates[fromCurrency]) / data.rates[toCurrency];
        }

        toAmountElement.value = convertedAmount.toFixed(2);
    }
});
