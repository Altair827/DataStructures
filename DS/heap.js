const Type = {
    MaxHeap : "MaxHeap",
    MinHeap : "MinHeap"
}

class Heap{
  
  constructor(type = Type.MinHeap){
    
    if(!Type[type]){
        throw "Invalid Heap Type"
    }
    
    this._heap = [];
    
    this._size = 0;
    
    this.type = type;
    
    if(type === Type.MinHeap){
      this.comparator = (parent,child) => {
        return parent <= child;
      }
    }
    else{
      this.comparator = (parent,child) => {
        return parent >= child;
      }
    }
    
  }

  getSize(){
    return this._size;
  }

  add(value){
    this._heap.push(value);
    
    this._size++;
    
    if(this._size === 1 || this.comparator(this._getParent(this._size-1),value)){
       return;
    }
    this._bubbleUp(this._size - 1);
  }

  poll(){
  
    let polledElement = this._heap[0];
    
    this._heap[0] = this._heap[this._size - 1];
    this._heap.pop();
    
    this._size--;
    
    this._bubbleDown(0); 
    
    return polledElement;
  }

  peek(){
    if(this._size > 0) return this._heap[0];
    
    throw "Heap Empty"
  }

  hasValue(element){
    return this._find(element,0) !== -1 ? true : false;
  }

  delete(element){
    let index = this._indexOf(element);

    if(index === -1) throw "Element Not Found";
    
    this._heap[index] = this._heap[this._size - 1];
    this._heap.pop();
    this._size--;
    
    if(!this.comparator(this._getParent(index),this._heap[index])){
      this._bubbleUp(index);
    }
    else{
      this._bubbleDown(index);
    }
  }


  //private methods

  _indexOf(element){
    return this._find(element,0);
  }

  _find(element,parentIndex){
    let rightChildIndex = this._getRightChildIndex(parentIndex);
    let leftChildIndex = this._getLeftChildIndex(parentIndex);
    
    if(element === this._heap[parentIndex]){
       return parentIndex;
    }
    
    if(rightChildIndex < this._size){
      if(this._heap[rightChildIndex] === element){
         return rightChildIndex;
      }
      if(this.comparator(this._heap[rightChildIndex],element)){
       let index = this._find(element,rightChildIndex);
       if(index !== -1) return index;
      } 
    }
    
    if(leftChildIndex < this._size){
      if(this._heap[leftChildIndex] === element){
         return leftChildIndex;
      }
      if(this.comparator(this._heap[leftChildIndex],element)){
        let index = this._find(element,leftChildIndex);
        if(index !== -1) return index;
      }
    }
    
    return  -1;
  }
  
  _getRightChild(parentIndex){
    return (2*parentIndex)+2 < this._size && parentIndex >= 0 ? this._heap[(2*parentIndex)+2] : null;
  }

  _getLeftChild(parentIndex){
    return (2*parentIndex)+1 < this._size && parentIndex >= 0 ? this._heap[(2*parentIndex)+1] : null;
  }

  _getParent(childIndex){
    if(childIndex === 0) return this._heap[0];
    return this._heap[Math.floor((childIndex-1)/2)];
  }

  _getRightChildIndex(parentIndex){
    return (2*parentIndex)+2;
  }

  _getLeftChildIndex(parentIndex){
    return (2*parentIndex)+1;
  }

  _getParentIndex(childIndex){
    if(childIndex === 0) return 0;
    return Math.floor((childIndex-1)/2);
  }

  _bubbleUp(index){
    
    let parentIndex = this._getParentIndex(index);
    let childIndex = index;
    while(childIndex < this._size && !this.comparator(this._heap[parentIndex],this._heap[childIndex])){
      
      this._swap(childIndex,parentIndex);
  
      childIndex = parentIndex;
      parentIndex = this._getParentIndex(childIndex);
    }
          
  }  

  _bubbleDown(index){
  
    let parentIndex = index;
    let rightChildIndex = this._getRightChildIndex(parentIndex);
    let leftChildIndex = this._getLeftChildIndex(parentIndex);
    
    while(parentIndex < this._size){
      
      let swapChildIndex = -1;

      if(leftChildIndex < this._size && !this.comparator(this._heap[parentIndex],this._heap[leftChildIndex])){
        swapChildIndex = leftChildIndex;
      }

      if(rightChildIndex < this._size && !this.comparator(this._heap[parentIndex],this._heap[rightChildIndex])){
        swapChildIndex = this.comparator(this._heap[rightChildIndex],this._heap[leftChildIndex]) ? rightChildIndex : leftChildIndex;
      }
      
      if(swapChildIndex === -1) break;
      
      this._swap(swapChildIndex,parentIndex);
      parentIndex = swapChildIndex;
      rightChildIndex = this._getRightChildIndex(swapChildIndex);
      leftChildIndex = this._getLeftChildIndex(swapChildIndex);
      
    }
  }      
  
  _swap(index1,index2){
    let temp = this._heap[index1];
    this._heap[index1] = this._heap[index2];
    this._heap[index2] = temp;
  }

  _minChildOf(parentIndex){
    let rightChildIndex = this._getRightChildIndex(parentIndex);
    let leftChildIndex = this._getLeftChildIndex(parentIndex);

    let minChildIndex = -1;
    
    if(rightChildIndex < this._size){
      minChildIndex = this._heap[rightChildIndex] <= this._heap[leftChildIndex] ? rightChildIndex : leftChildIndex;
    }
    else if(leftChildIndex < this._size){
      minChildIndex = leftChildIndex;
    }
    
    return minChildIndex >= 0 ? this._heap[minChildIndex] : null;
  }
  
}

module.exports =  {
  Heap,
  Type
};
