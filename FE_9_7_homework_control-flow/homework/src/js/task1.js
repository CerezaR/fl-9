let login = prompt('Enter your login', '');

if (login === '' || login === null) {
	alert('Canceled');
} else if (login.length < 4) {
		alert(`I don't know any users having name length less than 4 symbols`);
}	else if (login === 'User') {
	checkPassword();
} else {
	alert('I don’t know you');
}
	
	
function checkPassword() {
	let password = prompt('Enter your password', '');
	if (password === '' || password === null) {
		alert('Canceled');
	} else if (password === 'SuperPassword') {
		alert(new Date().getHours() < 20 ? 'Good day!' : 'Good evening!');
	} else {
		alert('Wrong password');
	}
}