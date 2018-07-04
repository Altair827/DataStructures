const Heap = require('./DS/heap').Heap;

let minHeap = new Heap();

minHeap.add(1);
minHeap.add(2);
minHeap.add(3);
minHeap.add(4);
minHeap.add(5);
minHeap.add(7);
minHeap.add(3);
minHeap.add(1);

minHeap.add(-4);

console.log(minHeap._heap);

console.log(minHeap._find(1,0));
