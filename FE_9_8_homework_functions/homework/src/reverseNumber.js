function reverseNumber(num) {
  let reversed = 0;
  let ten = 10;
  while (num !== 0) {
    reversed *= ten;
    reversed += num % ten;
    num -= num % ten;
    num /= ten;
  }
  return reversed;
}