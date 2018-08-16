let price = parseFloat(prompt('Enter amount of money', '0'));
let discount = parseFloat(prompt('Enter discount', '0'));
let output, rl_price, save;

if (typeof price !== 'number' || typeof discount !== 'number') {
	output = 'Invalid data';
} else {
	if (price >= 0 && discount > 0 && discount <= 100) {
		rl_price = price - price * discount / 100;
		save = price - rl_price;
		output = result();
	} else {
		output = 'Invalid data';
	}
}

function result() {
	return `	Price without discount: ${+price.toFixed(2)} 
	Discount: ${+discount.toFixed(2)}% 
	Price with discount: ${+rl_price.toFixed(2)} 
	Saved: ${+save.toFixed(2)}`;
}

console.log(output);