let bill = Number(500);
let partySize = 4;

let tipRate;

if (bill > 300) {
  tipRate = 0.1;
} else {
  tipRate = 0.05;
}

let tip = bill * tipRate;
let total = bill + tip;

let service;

switch ("TeleBirr") {
  case "TeleBirr":
    service = 5;
    break;
  case "CBE Birr":
    service = 3;
    break;
  default:
    service = 0;
}

total = total + service;

let perPerson = total / partySize;

console.log(`Bill: ${bill} ETB`);
console.log(`Tip: ${tip} ETB`);
console.log(`Service fee: ${service} ETB`);
console.log(`Total: ${total} ETB`);
console.log(`Per person: ${perPerson} ETB`);
