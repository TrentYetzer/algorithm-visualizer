//Returns can be moved since they will not alter the height if sorted by step
/* eslint-disable */

export function bubbleSort(array: number[]): (string | number)[][] {
  const visualize = [];
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      visualize.push([j, array[j], j + 1, array[j + 1], "compare"]);

      if (array[j] > array[j + 1]) {
        visualize.push([j, array[j], j + 1, array[j + 1], "swap"]);
        visualize.push([j, array[j + 1], j + 1, array[j], "swap"]);
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        visualize.push([j, array[j + 1], j + 1, array[j], "return"]);
      } else {
        visualize.push([j, array[j], j + 1, array[j + 1], "return"]);
      }
    }
  }
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function selectionSort(array: number[]): (string | number)[][] {
  const visualize = [];
  const length = array.length;
  for (let i = 0; i < length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < length; j++) {
      visualize.push([minIndex, array[minIndex], j, array[j], "compare"]);
      if (array[j] < array[minIndex]) {
        visualize.push([minIndex, array[minIndex], j, array[j], "return"]);
        minIndex = j;
      } else {
        visualize.push([minIndex, array[minIndex], j, array[j], "return"]);
      }
    }
    visualize.push([i, array[i], minIndex, array[minIndex], "swap"]);
    visualize.push([i, array[minIndex], minIndex, array[i], "swap"]);
    visualize.push([i, array[minIndex], minIndex, array[i], "return"]);
    const temp = array[minIndex];
    array[minIndex] = array[i];
    array[i] = temp;
  }
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function gnomeSort(array: number[]): (string | number)[][] {
  const visualize = [];
  const length = array.length;
  let index = 0;
  while (index < length) {
    if (index == 0) {
      index++;
    }
    visualize.push([
      index - 1,
      array[index - 1],
      index,
      array[index],
      "compare",
    ]);
    if (array[index] >= array[index - 1]) {
      visualize.push([
        index - 1,
        array[index - 1],
        index,
        array[index],
        "return",
      ]);
      index++;
    } else {
      visualize.push([
        index - 1,
        array[index - 1],
        index,
        array[index],
        "swap",
      ]);
      visualize.push([
        index - 1,
        array[index],
        index,
        array[index - 1],
        "swap",
      ]);
      visualize.push([
        index - 1,
        array[index],
        index,
        array[index - 1],
        "return",
      ]);
      const temp = array[index];
      array[index] = array[index - 1];
      array[index - 1] = temp;
      index--;
    }
  }
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function mergeHelper(
  array: number[],
  copyArray: number[],
  left: number,
  middle: number,
  right: number,
  visualize: (string | number)[][]
): void {
  let i = left;
  let k = left;
  let j = middle + 1;
  while (i <= middle && j <= right) {
    visualize.push([i, copyArray[i], j, copyArray[j], "compare"]);
    visualize.push([i, copyArray[i], j, copyArray[j], "return"]);
    if (copyArray[i] <= copyArray[j]) {
      visualize.push([k, copyArray[i], i, copyArray[i], "overwrite"]);
      visualize.push([k, copyArray[i], i, copyArray[i], "return"]);
      array[k++] = copyArray[i++];
    } else {
      visualize.push([k, copyArray[j], j, copyArray[j], "overwrite"]);
      visualize.push([k, copyArray[j], j, copyArray[j], "return"]);
      array[k++] = copyArray[j++];
    }
  }
  while (i <= middle) {
    visualize.push([i, copyArray[i], i, copyArray[i], "compare"]);
    visualize.push([i, copyArray[i], i, copyArray[i], "return"]);
    visualize.push([k, copyArray[i], i, copyArray[i], "overwrite"]);
    visualize.push([k, copyArray[i], i, copyArray[i], "return"]);
    array[k++] = copyArray[i++];
  }
  while (j <= right) {
    visualize.push([j, copyArray[j], j, copyArray[j], "compare"]);
    visualize.push([j, copyArray[j], j, copyArray[j], "return"]);
    visualize.push([k, copyArray[j], j, copyArray[j], "overwrite"]);
    visualize.push([k, copyArray[j], j, copyArray[j], "return"]);
    array[k++] = copyArray[j++];
  }
}

export function sort(
  array: number[],
  copyArray: number[],
  left: number,
  right: number,
  visualize: (string | number)[][]
): void {
  if (left < right) {
    const middle = Math.floor((left + right) / 2);
    sort(copyArray, array, left, middle, visualize);
    sort(copyArray, array, middle + 1, right, visualize);
    mergeHelper(array, copyArray, left, middle, right, visualize);
  }
}

export function mergeSort(array: number[]): (string | number)[][] {
  const visualize: (string | number)[][] = [];
  const copyArray = array.slice();
  sort(array, copyArray, 0, array.length - 1, visualize);
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function cocktailBogoSort(array: number[]): (string | number)[][] {
  const visualize: (string | number)[][] = [];
  let start = 0;
  let end = array.length - 1;
  while (start < end) {
    let min = [array[start], start];
    let max = [array[start], start];
    for (let i = start + 1; i <= end; i++) {
      if (array[i] > max[0]) {
        max = [array[i], i];
      } else if (array[i] < min[0]) {
        min = [array[i], i];
      }
    }
    visualize.push([start, array[start], min[1], min[0], "swap"]);
    visualize.push([start, min[0], min[1], array[start], "swap"]);
    visualize.push([start, min[0], min[1], array[start], "return"]);
    visualize.push([end, array[end], max[1], max[0], "swap"]);
    visualize.push([end, max[0], max[1], array[end], "swap"]);
    visualize.push([end, max[0], max[1], array[end], "return"]);
    const minTemp = array[min[1]];
    const maxTemp = array[max[1]];
    array[min[1]] = array[start];
    array[max[1]] = array[end];
    array[start++] = minTemp;
    array[end--] = maxTemp;
    for (let i = start; i <= end; i++) {
      const swap = Math.floor(Math.random() * (end - i) + i);
      visualize.push([i, array[i], swap, array[swap], "swap"]);
      visualize.push([i, array[swap], swap, array[i], "swap"]);
      visualize.push([i, array[swap], swap, array[i], "return"]);
      const temp = array[swap];
      array[swap] = array[i];
      array[i] = temp;
    }
  }
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function insertionSortHelper(
  array: number[],
  left: number,
  right: number,
  visualize: (string | number)[][]
): void {
  for (let i = left; i <= right; i++) {
    const current = array[i];
    visualize.push([i, current, i, current, "compare"]);
    visualize.push([i, current, i, current, "return"]);
    let j = i - 1;
    while (j >= 0 && array[j] > current) {
      visualize.push([j, array[j], j + 1, array[j + 1], "swap"]);
      visualize.push([j, array[j + 1], j + 1, array[j], "swap"]);
      visualize.push([j, array[j + 1], j + 1, array[j], "return"]);
      array[j + 1] = array[j];
      j--;
    }
    visualize.push([j + 1, current, j + 1, current, "overwrite"]);
    visualize.push([j + 1, current, j + 1, current, "return"]);
    array[j + 1] = current;
  }
}

export function insertionSort(array: number[]): (string | number)[][] {
  const visualize: (string | number)[][] = [];
  insertionSortHelper(array, 0, array.length - 1, visualize);
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function timSort(array: number[]): (string | number)[][] {
  const visualize: (string | number)[][] = [];
  //Sorted into blocks known as RUN
  const RUN = 32;
  const length = array.length;
  for (let i = 0; i < length; i += RUN) {
    insertionSortHelper(array, i, Math.min(i + RUN - 1, length - 1), visualize);
  }

  for (let size = RUN; size < length; size = 2 * size) {
    for (let left = 0; left < length; left += 2 * size) {
      const middle = left + size - 1;
      const right = Math.min(left + 2 * size - 1, length - 1);
      const copyArray = array.slice();
      mergeHelper(array, copyArray, left, middle, right, visualize);
    }
  }
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function partition(
  array: number[],
  low: number,
  high: number,
  visualize: (string | number)[][]
): number {
  const pivot = array[high];
  visualize.push([high, pivot, high, pivot, "compare"]);
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (i >= 0) {
      visualize.push([i, array[i], j, array[j], "compare"]);
      visualize.push([i, array[i], j, array[j], "return"]);
    }

    if (array[j] < pivot) {
      i++;
      visualize.push([i, array[i], j, array[j], "swap"]);
      visualize.push([i, array[j], j, array[i], "swap"]);
      visualize.push([i, array[j], j, array[i], "return"]);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  visualize.push([high, pivot, high, pivot, "return"]);
  i++;
  visualize.push([i, array[i], high, array[high], "swap"]);
  visualize.push([i, array[high], high, array[i], "swap"]);
  visualize.push([i, array[high], high, array[i], "return"]);
  const temp = array[i];
  array[i] = array[high];
  array[high] = temp;
  return i;
}

export function quickSortHelper(
  array: number[],
  low: number,
  high: number,
  visualize: (string | number)[][]
): void {
  if (low < high) {
    const partitionIndex = partition(array, low, high, visualize);
    quickSortHelper(array, low, partitionIndex - 1, visualize);
    quickSortHelper(array, partitionIndex + 1, high, visualize);
  }
}

export function quickSort(array: number[]): (string | number)[][] {
  const visualize: (string | number)[][] = [];
  quickSortHelper(array, 0, array.length - 1, visualize);
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function heapify(
  array: number[],
  length: number,
  index: number,
  visualize: (string | number)[][]
): void {
  let largest = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  if (left < length && array[left] > array[largest]) {
    visualize.push([largest, array[largest], left, array[left], "compare"]);
    visualize.push([largest, array[largest], left, array[left], "return"]);
    largest = left;
  }
  if (right < length && array[right] > array[largest]) {
    visualize.push([largest, array[largest], right, array[right], "compare"]);
    visualize.push([largest, array[largest], right, array[right], "return"]);
    largest = right;
  }
  if (largest != index) {
    visualize.push([largest, array[largest], index, array[index], "swap"]);
    visualize.push([largest, array[index], index, array[largest], "swap"]);
    visualize.push([largest, array[index], index, array[largest], "return"]);
    const temp = array[index];
    array[index] = array[largest];
    array[largest] = temp;
    heapify(array, length, largest, visualize);
  }
}

export function heapSort(array: number[]): (string | number)[][] {
  const visualize: (string | number)[][] = [];
  const length = array.length;
  for (let i = Math.floor(length / 2 - 1); i >= 0; i--) {
    heapify(array, length, i, visualize);
  }
  for (let i = length - 1; i > 0; i--) {
    visualize.push([0, array[0], i, array[i], "swap"]);
    visualize.push([0, array[i], i, array[0], "swap"]);
    visualize.push([0, array[i], i, array[0], "return"]);
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;

    heapify(array, i, 0, visualize);
  }
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}

export function flip(
  array: number[],
  index: number,
  visualize: (string | number)[][]
): void {
  let start = 0;
  while (start < index) {
    visualize.push([start, array[start], index, array[index], "swap"]);
    visualize.push([start, array[index], index, array[start], "swap"]);
    visualize.push([start, array[index], index, array[start], "return"]);
    const temp = array[start];
    array[start] = array[index];
    array[index] = temp;
    start++;
    index--;
  }
}

export function pancakeSort(array: number[]): (string | number)[][] {
  const visualize: (string | number)[][] = [];
  const length = array.length;
  for (let i = length; i > 1; --i) {
    let max = 0;
    for (let j = 0; j < i; ++j) {
      visualize.push([j, array[j], max, array[max], "compare"]);
      visualize.push([j, array[j], max, array[max], "return"]);
      if (array[j] > array[max]) {
        max = j;
      }
    }
    if (max != i - 1) {
      flip(array, max, visualize);
      flip(array, i - 1, visualize);
    }
  }
  visualize.push([0, 0, 0, 0, "finished"]);
  return visualize;
}
