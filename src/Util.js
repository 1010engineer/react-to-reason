export function toColumnName(num) {
  for (var ret = "", a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
  }

  return ret;
}

export function fromColumnName(string) {
  string = string.toUpperCase();
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let sum = 0;
  let i;

  for (i = 0; i < string.length; i++) {
    sum +=
      Math.pow(letters.length, i) *
      (letters.indexOf(string.substr((i + 1) * -1, 1)) + 1);
  }

  return sum;
}
