const price = parseFloat(prompt('Enter amount of money', '0'));
const discount = parseFloat(prompt('Enter discount', '0'));

if ( typeof price !== 'number' || typeof discount !== 'number' ) {
	console.log('Invalid data')
} else {
	if ( price >= 0 && discount > 0 && discount <= 100) {
		const rl_price = price - price * discount / 100;
		const save = price - rl_price;
		console.log(' Price without discount: ', +price.toFixed(2), '\n', 
			'Discount: ', +discount.toFixed(2) ,'%', '\n', 
			'Price with discount:', +rl_price.toFixed(2), '\n', 
			'Saved:', +save.toFixed(2));
	} else {
		console.log('Invalid data')
	}
}