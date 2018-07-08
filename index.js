const Tree = require('./DS/bst')

let tree = new Tree();

let input = "5 6 8 9 1 3 10";

let inputArr = input.split(' ').map(x => parseInt(x));

for(let i=0;i<inputArr.length;i++){
  tree.insert(inputArr[i]);
}

tree.levelOrder(tree.root)


