// Validate the input number for the given base
function isValidNumber(number, base) {
    const validChars = "0123456789ABCDEFGHIJ".substring(0, base);
    return [...number.replace('.', '')].every(char => validChars.includes(char.toUpperCase()));
}

// Convert integer part of number from the given base to decimal
function convertToDecimal(number, base) {
    return parseInt(number, base);
}

// Convert fractional part of number from the given base to decimal
function convertFractionalToDecimal(fractionalPart, base) {
    let decimalValue = 0.0;
    for (let i = 0; i < fractionalPart.length; i++) {
        let digitValue = parseInt(fractionalPart[i], base);
        decimalValue += digitValue / Math.pow(base, i + 1);
    }
    return decimalValue;
}

// Convert a decimal number to a given base
function convertFromDecimal(decimalNumber, base) {
    const integerPart = Math.floor(decimalNumber);
    let fractionalPart = decimalNumber - integerPart;

    let integerPartResult = integerPart.toString(base).toUpperCase();

    let fractionalPartResult = '';
    while (fractionalPart > 0 && fractionalPartResult.length < 16) {
        fractionalPart *= base;
        let digit = Math.floor(fractionalPart);
        fractionalPartResult += digit.toString(base).toUpperCase();
        fractionalPart -= digit;
    }

    return fractionalPartResult ? integerPartResult + '.' + fractionalPartResult : integerPartResult;
}

// Handle form submission
document.getElementById('conversionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const inputBase = parseInt(document.getElementById('inputBase').value);
    const number = document.getElementById('numberInput').value.toUpperCase();
    const outputBase = parseInt(document.getElementById('outputBase').value);

    if (inputBase < 2 || inputBase > 20 || outputBase < 2 || outputBase > 20) {
        alert("Invalid base. Please enter a base between 2 and 20.");
        return;
    }

    if (!isValidNumber(number, inputBase)) {
        alert("Invalid number for the given input base.");
        return;
    }

    const [integerPart, fractionalPart = ''] = number.split('.');

    const integerDecimal = convertToDecimal(integerPart, inputBase);
    const fractionalDecimal = convertFractionalToDecimal(fractionalPart, inputBase);
    const totalDecimal = integerDecimal + fractionalDecimal;

    const result = convertFromDecimal(totalDecimal, outputBase);

    document.getElementById('result').innerText = `The number ${number} in base ${inputBase} is ${result} in base ${outputBase}`;
});