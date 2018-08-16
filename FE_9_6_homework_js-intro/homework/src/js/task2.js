let length_1 = parseFloat(prompt('Enter lenght of first side', '0'));
let length_2 = parseFloat(prompt('Enter discount', '0'));
let angle = parseFloat(prompt('Enter angle between sides', '0'));
let output, length_3, perimeter, square;

if (typeof length_1 !== 'number' || typeof length_2 !== 'number' || typeof angle !== 'number') {
	output = 'Invalid data';
} else {
	if (length_1 > 0 && length_2 > 0 && angle > 0) {
		length_3 = getThirdSide();
		perimeter = getPerimeter(length_3);
		square = getSquare(perimeter, length_3);
		output = result();
	} else {
		output = 'Invalid data';
	}
}

function getThirdSide() {
	const sumOfSides = 180;
	let rad = Math.PI / sumOfSides * angle;
	return Math.sqrt( Math.pow(length_1, 2) + Math.pow(length_2, 2) - 2 * length_1 * length_2 * Math.cos(rad));
}

function getPerimeter (length_3) {
	return length_1 + length_2 + length_3;
}

function getSquare(perimeter, length_3) {
	let hp = perimeter / 2;
	return Math.sqrt(hp * (hp - length_1) * (hp - length_2) * (hp - length_3));
}

function result() {
	return `	c length: ${+length_3.toFixed(2)}
	Triangle square: ${+square.toFixed(2)}
	Triangle perimeter: ${+perimeter.toFixed(2)}`;
}

console.log(output);