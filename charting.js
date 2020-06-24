const Chart = require('chart.js');
const $ = require('jquery');

let arr = [];
let nbElements = 50;

let ctx = document.getElementById("myCanvas");
let chart = chartInit(ctx);
function chartInit(canvas){
    return new Chart(canvas, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: false
                }]
            }
        }
    })
}



function randomiseArray(nbOfElements){
    //nbOfElements elements between 0 and 100
    let randomArray = [];
    for (let i = 0; i < nbOfElements; ++i){
        randomArray.push(Math.ceil(Math.random() * 100));
    }
    return randomArray;
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.borderColor.push('rgb(0, 0, 0)');
        dataset.backgroundColor.push('rgb(255, 255, 255)');
        dataset.data.push(data);
    });
    // chart.update(); //it's probably not useful but who knows
}

const form = document.forms['myForm'];
form.addEventListener('submit', () => {
    event.preventDefault();
    const newArraySize = document.querySelector('#newArraySize').value;
    nbElements = newArraySize;
    displayRandomData();
    document.getElementById('myForm').reset();
});

function setArraySize(nb){
    if (typeof nb === 'number'){
        nbElements = nb;
        displayRandomData();
    }
}



function displayArray(){
    clearCanvas();
    for (let i = 0; i < arr.length; ++i){
        let elem = arr[i];
        addData(chart, `${i}`, `${arr[i]}`);
    }
    chart.update(0); //so that the animation is fast
}

function newRandomCanvas(){
    clearCanvas();
    displayRandomData();
}

function clearCanvas(){
    let element = document.getElementById('myCanvas');
    element.parentNode.removeChild(element);
    $('#graph-container').append('<canvas id="myCanvas" width="200" height="200"></canvas>');
    ctx = document.querySelector('#myCanvas');
    chart = chartInit(ctx);
}

function displayRandomData(){
    arr = randomiseArray(nbElements);
    displayArray();
}

function swap2Random(){
    swapTwoValues(Math.floor(Math.random()*arr.length), Math.floor(Math.random()*arr.length));
}

function swapTwoValues(index1, index2){
    const tmp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = tmp;
    displayArray();
    chart.update(0);
}

function highlightBarRed(index){
    if (index >= 0 && index < arr.length){
        chart.data.datasets[0].backgroundColor[index] = 'rgb(255, 99, 132)';
        chart.update(0);
    }
}

function highlightBarGreen(index){
    if (index >= 0 && index < arr.length){
        chart.data.datasets[0].backgroundColor[index] = 'rgb(45, 255, 23)';
        chart.update(0);
    }
}

function highlightBarBlack(index){
    if (index >= 0 && index < arr.length){
        chart.data.datasets[0].backgroundColor[index] = 'rgb(0, 0, 0)';
        chart.update(0);
    }
}

async function sortSelection(){
    //represent currentlysorted array to the left and 
    //unsorted array to the right, forming one big array
    let sortedArr = [];
    let unsortedArr = arr;
    for (let i = 0; i < arr.length; ++i){
        //for every element in the unsorted array that'll be sorted
        //it'll be compared to all other elements before choosing the next smallest
        highlightBarBlack(i-1);
        let indexCurrentSmallest = 0;
        for (let j = 0; j < unsortedArr.length; ++j){
            highlightBarGreen(i + j);
            if (unsortedArr[j] < unsortedArr[indexCurrentSmallest]){
                highlightBarGreen(indexCurrentSmallest + i);
                indexCurrentSmallest = j;
                highlightBarRed(indexCurrentSmallest + i);
            }
            await sleep(1);
        }
        sortedArr.push(unsortedArr[indexCurrentSmallest]);
        unsortedArr.splice(indexCurrentSmallest, 1);
        arr = sortedArr.concat(unsortedArr);
        displayArray();
        await sleep(1);
    }
    displayArray();
}

async function sortInsertion(){
    let sortedArr = [];
    let unsortedArr = arr;
    for (let i = 0; i < arr.length; ++i){
        //for every value in arr, it'll check where to add in the unsorted array
        let currentElem = unsortedArr[0];
        highlightBarBlack(i);
        await sleep(1);
        for (let j = 0; j < sortedArr.length; ++j){
            highlightBarGreen(j);
            await sleep(1);
            if (sortedArr[j] > currentElem){
                if (j === 0){
                    sortedArr.unshift(currentElem);
                }
                else {
                    sortedArr.splice(j, 0, currentElem);
                }
                unsortedArr.shift();
                arr = sortedArr.concat(unsortedArr);
                displayArray();
                highlightBarRed(j);
                await sleep(1);
                break;
            }
            if (j === sortedArr.length - 1 && currentElem >= sortedArr[j]){
                sortedArr.push(currentElem);
                unsortedArr.shift();
                arr = sortedArr.concat(unsortedArr);
                displayArray();
                break;
            }
        }
        if (i === 0) {
            sortedArr.push(currentElem);
            unsortedArr.shift();
            arr = sortedArr.concat(unsortedArr);
        }
    }
    displayArray();
}

const sleep = milliseconds => {
    return new Promise(wait => setTimeout(wait, milliseconds));
};

function wait(ms)
{
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while(d2-d < ms);
}


displayRandomData();
