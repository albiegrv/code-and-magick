
function getMessage(a, b) {

  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }

  } else if (typeof a === 'number') {
    return 'Я прыгнул на ' + (a * 100) + ' сантиметров';

  } else if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      var length = a.reduce(function(temp, current, number) {
        return temp + current * b[number];
      }, 0);
      return 'Я прошёл ' + length + ' метров';
    } else {
      var sum = a.reduce(function(temp, current) {
      return temp + current;
    }, 0);
      return 'Я прошёл ' + sum + ' шагов';
    }

  } else {
    throw 'Неверные аргументы';
  }
}

