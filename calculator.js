// Input Elements
const amountEl = document.getElementsByName('amount');
const durationEl = document.getElementsByName('duration');
const interestEl = document.getElementsByName('interest');

// Result Elements
const startingVal = document.querySelectorAll('.starting-val');
const durationVal = document.querySelectorAll('.duration-val');
const returnVal = document.querySelectorAll('.return-val');
const finalVal = document.querySelectorAll('.final-val');

// Format Value
const formatValue = (value, type) => {
    var formatted = parseFloat(Math.round(value * 100) / 100).toFixed(2);

    switch (type) {
        case '$':
            var x = formatted.split('.'),
                x1 = x[0],
                x2 = x.length > 1 ? '.' + x[1] : '',
                rgx = /(\d+)(\d{3})/;

            // Add comma
            while (rgx.test(x1)) { x1 = x1.replace(rgx, '$1' + ',' + '$2') }

            return '$' + x1 + x2;
            break;
        case '%':
            return formatted + '%';
            break;
        default:
            return formatted
            break;
    }
}

// Display Results
const displayResults = (amount, duration, totalReturn, finalBalance) => {
	startingVal[0].innerHTML = amount;
	durationVal[0].innerHTML = duration;
	returnVal[0].innerHTML = totalReturn;
	finalVal[0].innerHTML = finalBalance;
}

// Get Ratio
const getRatio = (value, max) => {
    return 100 * (value/max);
}

// Render Visuals
const renderVisuals = (amount, totalReturn, finalBalance) => {
	const startingBar = document.querySelectorAll('.starting-bar');
	const returnBar = document.querySelectorAll('.return-bar');
	const finalBar = document.querySelectorAll('.final-bar');

	startingBar[0].style.width = getRatio(amount, finalBalance) + '%';
	returnBar[0].style.width = getRatio(totalReturn, finalBalance) + '%';
	finalBar[0].style.width = getRatio(finalBalance, finalBalance) + '%';
}

// Calculate
const calculate = () => {
	let amount = amountEl[0].value;
	let duration = durationEl[0].value;
	let interest = interestEl[0].value;
	let rate = interest/100;
	let finalBalance;
	let totalReturn;

	// const
	if (rate) {
		finalBalance = amount * Math.pow(1 + rate, duration);
		totalReturn = finalBalance - amount;
	} else {
		finalBalance = +amount;
		totalReturn = finalBalance - amount;
	}

	renderVisuals(amount, totalReturn, finalBalance);
	displayResults(formatValue(amount, '$'), duration,formatValue(totalReturn, '$'), formatValue(finalBalance, '$'));
}


// On Load
calculate();