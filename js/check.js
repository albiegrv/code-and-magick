function getMessage(a, b) {
  if (a === true) {
    return 'Я попал в ' + b;
  } else if (a === false) {
    return 'Я никуда не попал';
  }

  if (typeof a === 'number') {
    return 'Я прыгнул на ' + (a * 100) + ' сантиметров';
  }

  if (Array.isArray(a) && !Array.isArray(b)) {
    var sum = a.reduce(function(temp, current) {
      return temp + current;
    });
    return 'Я прошёл ' + sum + ' шагов';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    var length = a.reduce(function(temp, current, number) {
      return temp + current * b[number];
    });
    return 'Я прошёл ' + length + ' метров';
  }
}

