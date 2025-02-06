function setup() {
    createCanvas(400, 300);
}


/**
 * Creates an array and fills it with integers from 0 up to but not 
 * including maxValue.
 * @param {number} maxValue 
 * @returns {number[]} An array of integers from 0 to maxValue (exclusive).
 * @example
 * // returns [1, 2, 3, 4]
 * maxValue(5);
 */
function fillArray(maxValue) {
    const arr = [];
    for (let i = 0; i < maxValue; i++) {
        arr.push(i);
    }
    return arr;
}


/**
 * Searches an array for a given value. 
 * @param {any[]} arr An array storing any type of element (e.g. numbers, strings)
 * @param {any} value The value to search for
 * @returns {boolean} True if the value is found, false if it is not.
 * @example
 * // returns false
 * search(["a", "b", "c"], 5);
 * // returns true
 * search(["a", "b", "c"], "c");
 * // returns true
 * search([5, -1, 9], 5);
 */
function search(arr, value) {
    for (const v of arr) {
        if (v === value) {
            return true;
        }
    }
    return false;
}


/**
 * Gets the total of all items in a number array.
 * @param {number[]} arr 
 * @returns {number} The total of all items
 * @example
 * // returns 6
 * total([1, 2, 3]);
 * // returns 0
 * total([])
 */
function total(arr) {
    let sum = 0;
    for (const v of arr) {
        sum+= v;
    }
    return sum;
}


/**
 * Counts the number of times the given value appears in the array.
 * @param {any[]} arr The array to search.
 * @param {any[]} value The value to count.
 * @returns {number} The number of times the value appears.
 * @example 
 * // returns 2
 * count([0, 25, 3, 4, 3], 3)
 * // returns 0
 * count([0, 35, 3, 4, 3], 7)
 */
function count(arr, value) {
    let num = 0;
    for (const a of arr) {
        if (a === value) {
            num++;
        }
    }
    return num;
}


/**
 * Creates a new array that repeats the values in the original array the specified number 
 * of times.
 * @param {any[]} arr The array to repeat 
 * @param {number} times The number of times to repeat the array values
 * @returns {any[]} A new array
 * @example
 * // returns [1, 2, 3, 1, 2, 3]
 * repeat([1, 2, 3], 2)
 * // returns [4, 4, 4]
 * repeat([4], 3)
 */
function repeat(arr, times) {
    let newArr = []
    let r = 0;
    while (r < times) {
        for (let i = 0; i < arr.length; i++) {
            newArr.push(arr[i]);
        }
        r++;
    }
    return newArr;
}