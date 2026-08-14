// setTimeout(()=>{
//     console.log("first")
// },3000);

// let promise=new promise((resolve,reject)=>{
//     resolve("second")
// })

// promise.then((data) => console.log(data))

// console.log("third")

const order = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Food is ready");
  } else {
    reject("Kitchen is closed");
  }
});

const promise = new Promise((resolve) => {
  resolve("Food is ready");
});

promise.then(function (result) {
  console.log(result);
});
const promise = new Promise((resolve, reject) => {
  reject("Kitchen is closed");
});

// promise.catch(function (error) {
//   console.log(error);
// });

promise.then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finished");
  });