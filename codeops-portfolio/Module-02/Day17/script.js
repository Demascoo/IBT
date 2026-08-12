// // function firstName(name){
// //     console.log(`my name is ${name}`);

// // }
// // firstName("abel")

// // const adress =(city,counrty) => console.log(`my adress is ${city} and ${counrty}`)

// // adress("aa","ethiopia")



// // function outer() {
// //   let x = 10; 
  
// //   return ()=> x
// // }
// // let val = outer();
// // console.log(val());


// function view(age,name,callback){
//     return callback(age,name)
// }
// function see(age,name){
//    if (age <=18) {
//     console.log(`${name} you are not allowed`)
//    }
//    else
//    {
//     console.log(`${name} you are allowed because your age is ${age}`); 
//    }
// }
// function attend(age,name){
//     return age + name ;
// }
// view(18,"chala",see)
// view(19,"abel",see)
// console.log(view(22," nahom",attend))


"use strict";

const subtotal = (...prices) => {
  return prices.reduce((sum, p) => sum + p, 0);
};

const discountBy = (rate) => {
  return (n) => n * (1 - rate);
};

const withVat = (n) => {
  return n * 1.15;
};

const toETB = (n) => {
  return `${n.toFixed(2)} ETB`;
};

function makeReceiptMaker() {
  let orderNo = 0;
  const memberOff = discountBy(0.1);

  return function (...items) {
    orderNo++;

    const gross = subtotal(...items);
    const net = withVat(memberOff(gross));

    return `#${orderNo}: ${toETB(net)}`;
  };
}

const receipt = makeReceiptMaker();

console.log(receipt(220, 180, 120));
console.log(receipt(140, 60));
