const avgNeighbors = arr => 
  arr.slice(1).map((x, i) => (x + arr[i]) / 2);

const numbers = [10, 20, 30, 40, 50];

const result = avgNeighbors(numbers);

console.log(result); 