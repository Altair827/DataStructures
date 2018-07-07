const Node = require('./treeNode');

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

}

module.exports =  BST;
