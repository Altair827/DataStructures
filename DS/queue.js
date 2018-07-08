const Node = require('./listNode');

class Queue {

  constructor(){
    this.head = null;
  }

  enqueue(data){

    let newNode = new Node(data);

    if(this.head === null){
      this.head = newNode;
    }
    else{
      let node = this.head;

      while(node.next != null){
        node = node.next;
      }

      node.next = newNode;
    }

  }

  dequeue(){

    if(this.head === null) throw "Queue Is Empty";

    let node = this.head;

    this.head = this.head.next;

    return node.data;

  }

  isEmpty(){
    return this.head === null;
  }

}

module.exports = Queue;