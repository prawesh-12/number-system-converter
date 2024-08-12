// Validate the input number for the given base
function isValidNumber(number, base) {
    const validChars = "0123456789ABCDEFGHIJ".substring(0, base);
    return [...number.replace('.', '')].every(char => validChars.includes(char.toUpperCase()));
}

// Convert integer part of number from the given base to decimal
function convertToDecimal(integerPart, base) {
    return parseInt(integerPart, base);
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
    if (decimalNumber === 0) return '0';

    let integerPart = Math.floor(decimalNumber);
    let fractionalPart = decimalNumber - integerPart;

    let integerPartResult = '';
    while (integerPart > 0) {
        let remainder = integerPart % base;
        integerPartResult = remainder.toString(base).toUpperCase() + integerPartResult;
        integerPart = Math.floor(integerPart / base);
    }

    // Convert fractional part
    let fractionalPartResult = '';
    while (fractionalPart > 0 && fractionalPartResult.length < 16) { // Adjust precision as needed
        fractionalPart *= base;
        let digit = Math.floor(fractionalPart);
        fractionalPartResult += digit.toString(base).toUpperCase();
        fractionalPart -= digit;
    }

    // Return the result in the correct format
    return integerPartResult + (fractionalPartResult ? '.' + fractionalPartResult : '');
}

// Handle form submission
document.getElementById('conversionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const inputBase = parseInt(document.getElementById('inputBase').value);
    const number = document.getElementById('numberInput').value.toUpperCase();
    const outputBase = parseInt(document.getElementById('outputBase').value);

    // Check for valid bases
    if (inputBase < 2 || inputBase > 20 || outputBase < 2 || outputBase > 20) {
        document.getElementById('result').innerText = "Invalid base. Please enter a base between 2 and 20.";
        document.getElementById('result').style.display = 'block';
        return;
    }

    // Check if the number is valid for the input base
    if (!isValidNumber(number, inputBase)) {
        document.getElementById('result').innerText = "Invalid number for the given input base.";
        document.getElementById('result').style.display = 'block';
        return;
    }

    // Split the number into integer and fractional parts
    const [integerPart, fractionalPart = ''] = number.split('.');

    // Validate integer and fractional parts
    if (integerPart.split('').some(digit => parseInt(digit, inputBase) >= inputBase) ||
        fractionalPart.split('').some(digit => parseInt(digit, inputBase) >= inputBase)) {
        document.getElementById('result').innerText = "Invalid number for the given base.";
        document.getElementById('result').style.display = 'block';
        return;
    }

    // Convert to decimal
    const integerDecimal = convertToDecimal(integerPart, inputBase);
    const fractionalDecimal = convertFractionalToDecimal(fractionalPart, inputBase);
    const totalDecimal = integerDecimal + fractionalDecimal;

    // Convert from decimal to output base
    const result = convertFromDecimal(totalDecimal, outputBase);

    // Display the result
    document.getElementById('result').innerText = `The number ${number} in base ${inputBase} is ${result} in base ${outputBase}`;
    document.getElementById('result').style.display = 'block'; // Show the output box
});
