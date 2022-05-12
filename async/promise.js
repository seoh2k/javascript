'use strict'

// Promise is a JavaScript object for asynchronous operation.
// state: pending -> fulfilled or rejected 
// Producer vs Consumer

// 1. Producer
// promise를 만드는 순간 전달한 excutor라는 콜백함수가 바로 실행
const promise = new Promise((resolve, reject) => {  
    // doing some heavy work (network, read files)
    // 시간이 걸리는 일들은 promise를 만들어서 비동기적으로 처리하는 것이 좋음
    console.log('doing something...');
    
    // 시간에 딜레이를 줌
    setTimeout(() => {
        // resolve('ellie');
        reject(new Error('no network'));
    }, 2000)
});

// 2. Comsumers: then, catch, finally를 이용해서 값을 받아올 수 있음
promise
    .then((value) => { // 성공했을 경우, value에는 ellie가 들어옴
        console.log(value);
    })
    .catch(error => { // 실패했을 경우, 잡은 error에 대한 메세지가 뜸
        console.log(error);
    })
    .finally(() => { // 성공, 실패 모든 경우, 실행
        console.log('finally');
    });

// 3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
});

// 비동기 처리를 묶어서 실행할 수 있음
fetchNumber
.then(num => num *2) // 값이나 promise를 전달
.then(num => num *3)
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num - 1), 1000);
    });
})
.then(num => console.log(num));

// 4. Error Handling
const getHen = () => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve('hen'), 1000);
    });
const getEgg = hen => 
    new Promise((resolve, reject) => {
        // setTimeout(() => resolve(`${hen} => egg`), 1000);
        setTimeout(() => reject(new Error(`Error! ${hen} => egg`)), 1000);
    });
const cook = egg => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => friedEgg`), 1000);
    });

getHen() //
    .then(getEgg)
    .catch(error => {
        return 'bread';
    })
    .then(cook)
    .then(console.log)
    .catch(console.log);