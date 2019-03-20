function quickSort(arr) {
    return quick(arr, 0, arr.length - 1);
}
function quick(arr, left, right) {
    if (arr.length < 2) {
        return arr;
    }
    let index = partition(arr, left, right);
    if (left < index - 1) {
        quick(arr, left, index - 1);
    }
    if (index < right) {
        quick(arr, index, right);
    }
    return arr;
}
function partition(arr, left, right) {
    let pivot = arr[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            i++;
            j--;
        }
    }
    return i;
}

module.exports = quickSort;
