let data = [
  {
    '_id': '5b5e3168c6bf40f2c1235cd6',
    'index': 0,
    'age': 39,
    'eyeColor': 'green',
    'name': 'Stein',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e3168e328c0d72e4f27d8',
    'index': 1,
    'age': 38,
    'eyeColor': 'blue',
    'name': 'Cortez',
	'favoriteFruit': 'strawberry'
  },
  {
    '_id': '5b5e3168cc79132b631c666a',
    'index': 2,
    'age': 2,
    'eyeColor': 'blue',
    'name': 'Suzette',
    'favoriteFruit': 'apple'
  },
  {
    '_id': '5b5e31682093adcc6cd0dde5',
    'index': 3,
    'age': 17,
    'eyeColor': 'green',
    'name': 'Weiss',
    'favoriteFruit': 'banana'
  },
  {
    '_id': '5b5e34636093adcc5gd0dde5',
    'index': 4,
    'age': 22,
    'eyeColor': 'gray',
    'name': 'Alise',
    'favoriteFruit': 'apple'
  }
];

let keys = { keyOne: 1, keyTwo: 2, keyThree: 3 };
let two = 2;
let five = 5;
let eight = 8;
let someArray = [ two, five, eight ]; 
let date = new Date('2018-08-27 01:10:00');

/*1*/
function findType(element) {
  return typeof element;
}
/*2*/
function forEach(arr, func) {
  for (let i = 0; i < arr.length; i++) {
    func(arr[i]);
  }
}
/*3*/
function map(arr, func) {
  let result = [];
  forEach(arr, function(el) { 
    result.push(func(el)) 
  });
  return result;
}
/*4*/
function filter(arr, func) {
  let result = [];
  forEach(arr, function(el) { 
    if(func(el)) {
      result.push(el)
    }
  });
  return result;
}
/*5*/
function getAdultAppleLovers(data) {
  let arrayOfPeople = [];
  arrayOfPeople = map( 
    filter(data, function(el) { 
      return el.age >= 18 && el.favoriteFruit === 'apple'
    }), 
    function(el) { 
      return el.name 
    } );
  return arrayOfPeople;
}
/*6*/
function getKeys(keys) {
  let arrOfKeys = [];
  for (let key in keys) {
    if (key !== null) {
      arrOfKeys.push(key);
    }
  }
  return arrOfKeys;
}
/*7*/
function getValues(keys) {
  let arrOfValues = [];
  for (let val in keys) {
    if (val !== null) {
      arrOfValues.push(keys[val]);
    }
  }
  return arrOfValues;
}
/*8*/			
function showFormattedDate(date) {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  return `It is ${date.getDate()} of ${months[date.getMonth()]}, ${date.getFullYear()}`;
}