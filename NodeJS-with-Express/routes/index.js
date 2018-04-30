const express = require('express');
const router = express.Router();

//Controller
const task1 = require('./controllers.js/task1.js')
const task2 = require('./controllers.js/task2');
const task3 = require('./controllers.js/task3');
const taskRXJS = require('./controllers.js/rxjs')



const taskNumber = process.argv[2];

console.log('------------------------------------');
console.log('This is ', taskNumber);
console.log('------------------------------------');



/* TASK 1 */
if(taskNumber === 'task1'){
    router.get('/I/want/title', task1.getTite);
}else if(taskNumber === 'task2'){
    /* TASK2 */
    router.get('/I/want/title', task2.getTite);
}else if(taskNumber === 'task3'){
    // /* TASK3 */
    router.get('/I/want/title', task3.getTite);
}else if(taskNumber === 'bonus'){
    // /* TASK4 */
    router.get('/I/want/title', taskRXJS.getTite);
}else{
    console.log('This is Bonus task')
    router.get('/I/want/title', taskRXJS.getTite);
}




module.exports = router;
