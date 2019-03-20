function shellSort(arr) {
    let gap = 1;
    while (gap < arr.length / 3) {
        gap = gap * 3 + 1;
    }
    while (gap >= 1) {
        for (let i = gap; i < arr.length; i++) {
            for (let j = i; j > 0; j -= gap) {
                if (arr[j] < arr[j - gap]) {
                    let temp = arr[j];
                    arr[j] = arr[j - gap];
                    arr[j - gap] = temp;
                } else {
                    break;
                }
            } 
        }
        gap = (gap - 1) / 3;
    }
    return arr;
}

module.exports = shellSort;
