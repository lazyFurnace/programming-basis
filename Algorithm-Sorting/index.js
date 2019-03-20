/**
 * 排序算法练习
 * src 里面是正确的 learn 里面在练习的时候写的
 */
// const path = 'src';
const path = 'learn';

const bubbleSort = require(`./${path}/bubbleSort`);
const insertionSort = require(`./${path}/insertionSort`);
const selectionSort = require(`./${path}/selectionSort`);
const mergeSort = require(`./${path}/mergeSort`);
const shellSort = require(`./${path}/shellSort`);
const quickSort = require(`./${path}/quickSort`);
/**
 * 生成一个值从 0 ~ num 无序的数组
 * @param {Number} num 所要生成数组内元素的个数
 * @return {Array} 返回生成好的数组
 */
function rendomArray(num) {
    let arr = [], rendomArr = [];
    const rendomNum = length => parseInt(Math.random() * length);
    for (let i = 0; i < num; i++) {
        arr.push(i);
    }
    for (let i = 0; i < num; i++) {
        const num = rendomNum(arr.length);
        rendomArr.push(arr[num]);
        arr[num] = arr[arr.length - 1];
        arr.length -= 1;
    }
    return rendomArr;
};

// console.time('生成无序数组');
const sortArray = rendomArray(20);
console.log(`生成无序数组：${sortArray}`);
// console.timeEnd('生成无序数组');

console.log('------')

console.log(`冒泡排序：${bubbleSort(sortArray.slice(0))}`);
console.log(`插入排序：${insertionSort(sortArray.slice(0))}`);
console.log(`选择排序：${selectionSort(sortArray.slice(0))}`);
console.log(`并归排序：${mergeSort(sortArray.slice(0))}`);
console.log(`希尔排序：${shellSort(sortArray.slice(0))}`);
console.log(`快速排序：${quickSort(sortArray.slice(0))}`);

console.log('------')
