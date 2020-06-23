const Chart = require('chart.js');
const $ = require('jquery');

let arr = [];

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
    return randomArray
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.borderColor.push('rgb(0, 0, 0)');
        dataset.backgroundColor.push('rgb(255, 255, 255)');
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}


function displayArray(){
    for (let i = 0; i < arr.length; ++i){
        let elem = arr[i];
        addData(chart, `${i}`, `${arr[i]}`);
    }
    highlightBarRed(20);
    highlightBarGreen(35);
    chart.update(300); //so that the animation is fast
}

function newRandomCanvas(){
    let element = document.getElementById('myCanvas');
    element.parentNode.removeChild(element);
    $('#graph-container').append('<canvas id="myCanvas" width="200" height="200"></canvas>');
    ctx = document.querySelector('#myCanvas');
    chart = chartInit(ctx);
    displayRandomData();
};

function displayRandomData(){
    arr = randomiseArray(100);
    displayArray();
}

function swap2Random(){
    swapTwoValues(Math.ceil(Math.random()*100), Math.ceil(Math.random()*100));
}

function swapTwoValues(index1, index2){
    const temp = chart.data.datasets[0].data[index1];
    chart.data.datasets[0].data[index1] = chart.data.datasets[0].data[index2];
    chart.data.datasets[0].data[index2] = temp;
    chart.update(200);
}

function highlightBarRed(index){
    if (index >= 0 && index < arr.length){
        chart.data.datasets[0].backgroundColor[index] = 'rgb(255, 99, 132)';
    }
}

function highlightBarGreen(index){
    if (index >= 0 && index < arr.length){
        chart.data.datasets[0].backgroundColor[index] = 'rgb(45, 255, 23)';
    }
}

displayRandomData();
