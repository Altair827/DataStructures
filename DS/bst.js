const Node = require('./treeNode');

const Queue = require('./queue');

class QItem {
  constructor(node,distance){
    this.node = node;
    this.distance = distance;
  }
}

class BST{

  constructor(){
    this.root = null;
  }

  insert(value){
    let node = new Node(value);

    if(this.root === null){
      this.root = node;
    }
    else{
      this._placeNode(this.root,node);
    }
  }

  inOrder(node){
    if(node!=null){
      this.inOrder(node.left);
      console.log(node.data);
      this.inOrder(node.right);
    }
  }

  preOrder(node){
    if(node!=null){
      console.log(node.data);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  postOrder(node){
    if(node!=null){
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.data);
    }
  }

  levelOrder(root){
    
    let queue  = new Queue();

    queue.enqueue(root);

    while(!queue.isEmpty()){

      let node  = queue.dequeue();

      console.log(node.data);

      if(node.left != null)
        queue.enqueue(node.left);
      if(node.right != null){
        queue.enqueue(node.right);
      }
    }

  }

  topView(root){

    /* 
    
    The distance in QItem are use to track the horizontal distance of the node from root.
    Queue is used so that the tree is traversed in correct order.
    If a node is first to visit a horizontal distance, it will be on top, so add it in the map.
    Else, it is shadowed so don't add it in map, but add its child to queue, which may not be shadowed.
    
    For Items in Queue,
      distance => horizontal distance
      node => respective node
    
	*/


    let distance = {};
    
    let q = new Queue();
    
    let hd = 0;
    
    let qItem = new QItem(root,hd);

    q.enqueue(qItem);
    
    while(!q.isEmpty()){
      
      let qHead = q.dequeue();
      
      if(distance[qHead.distance] === undefined){
        distance[qHead.distance] = qHead.node.data;
      }
      
      if(qHead.node.left != null){
        let child = new QItem(qHead.node.left,qHead.distance - 1);
        q.enqueue(child);
      }
      if(qHead.node.right != null){
        let child = new QItem(qHead.node.right,qHead.distance + 1);
        q.enqueue(child);
      }
      
    }
    
    let distanceArray = Object.keys(distance).map(x => parseInt(x));

    distanceArray = distanceArray.sort(function(a,b){return a - b});
    
    let topView = "";

    for(let i = 0;i < distanceArray.length;i++){
      topView += distance[distanceArray[i]] + " ";
    }

    return topView;

  }

  height(node) {
    
    let leftCount = 0;
    let rightCount = 0;
    
    if(node.left != null){
      leftCount  = this.height(node.left) + 1;
    }
    if(node.right != null){
      rightCount = this.height(node.right) + 1;
    }
    
    return leftCount > rightCount ? leftCount : rightCount;
    
  }

  min(node){
    while(node.left != null){
      node = node.left;
    }
    return node.data;
  }

  max(node){
    while(node.right != null){
      node = node.right;
    }
    return node.data;
  }
  
  isBST(root) {

    return this._checkBST(root,Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER);

  }

  
  //private methods

  _placeNode(parent,newNode){

    if(parent === null){
      return newNode;
    }
    else{
      if(newNode.data <= parent.data){
        let current = this._placeNode(parent.left,newNode);
        parent.left = current;
      }
      else{
        let current = this._placeNode(parent.right,newNode);
        parent.right = current;
      }
      return parent;
    }
  }
  
  _checkBST(node,minOfSubtree,maxOfSubtree){
    
    if(node === null)
      return true;
    
    if(node.data > minOfSubtree && node.data < maxOfSubtree){
      return (this._checkBST(node.left,minOfSubtree,node.data)) && (this._checkBST(node.right,node.data,maxOfSubtree));
    }
    else{
      return false;
    }
    
  }

}

module.exports =  BST;
