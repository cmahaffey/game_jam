//Universally used functions

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function sample(array) {
  var scope = array
  return array[getRandomInteger(0, array.length)];
}

function randomBoolean() {
  var booleans = [true, false];
  return sample(booleans);
}
