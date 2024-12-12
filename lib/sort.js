const arr = [2, 7, 3, 8, 1, 4];
console.log(`Array before sorting [${arr}]`);
const Sort = (arr) => {
    let temp;
    for(let i=0; i<6; i++) {
        for(let j=0; j<=5; j++) {
            if(arr[j] > arr[j+1]) {
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

const sortedArray = Sort(arr);
console.log(`Array after sorting [${sortedArray}]`);