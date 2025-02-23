document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("select-currency");
    const form = document.querySelector("form");
    const inputAmount = document.getElementById("input-amount");
    const errorMessage = document.getElementById("error-message");
    const outputAmount = document.getElementById("output-amount");

    const fetchCurrencies = async () => {
        try {
            const response = await fetch("currency.json");
            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            return Array.from(new Map(data.map(item => [item.currency, item])).values());
        } catch (error) {
            console.error("Error fetching currencies:", error);
            return [];
        }
    };

    const populateCurrencyOptions = (currencies) => {
        selectElement.innerHTML = currencies
            .map(currency => `<option value="${currency.price}">${currency.currency}</option>`)
            .join("");
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        removeError();

        const amount = parseFloat(inputAmount.value.trim());
        const rate = parseFloat(selectElement.value);

        if (isNaN(amount)) {
            showError("Amount to send is null. Please enter an amount!");
            return;
        }
        outputAmount.value = (amount * rate).toFixed(2);
    };

    const showError = (message) => {
        errorMessage.textContent = message;
        errorMessage.classList.add("error-text");
        inputAmount.classList.add("input-error");
    };

    const removeError = () => {
        errorMessage.textContent = "";
        errorMessage.classList.remove("error-text");
        inputAmount.classList.remove("input-error");
    };

    inputAmount.addEventListener("input", removeError);
    form.addEventListener("submit", handleFormSubmit);

    (async () => {
        const currencies = await fetchCurrencies();
        if (currencies.length > 0) {
            populateCurrencyOptions(currencies);
        }
    })();
});
