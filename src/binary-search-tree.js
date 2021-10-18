const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = class BinarySearchTree {

  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(value) {
    if (this.node === null) {
      this.node = new Node(value);
    } else {
      let current = this.node;
      while (true) {
        if (current.data > value) {
          if (current.left) {
            current = current.left;
          } else {
            current.left = new Node(value);
            break;
          }
        } else {
          if (current.right) {
            current = current.right;
          } else {
            current.right = new Node(value);
            break;
          }
        }
      }
    }
    return this;

  }

  has(value) {
    return this.find(value) !== null;
  }

  find(value) {
    let current = this.node;

    if (!current) return null;

    while (true) {

      if (current === null) return null;
      if (value === current.data) return current;

      if (value < current.data) {
        current = current.left;
        continue;
      };

      if (value > current.data) {
        current = current.right;
        continue;
      };
    };
  }

  remove(value, tree = this.node) {
    if (tree === null) return tree;
    else if (value < tree.data) tree.left = this.remove(value, tree.left);
    else if (value > tree.data) tree.right = this.remove(value, tree.right);
    else {
      if (tree.left === null && tree.right === null) {
        tree = null;
      }
      else if (tree.left === null) {
        tree = tree.right;
      }
      else if (tree.right === null) {
        tree = tree.left;
      }
      else {
        const minR = this.min(tree.right);
        tree.data = minR;
        tree.right = this.remove(minR, tree.right);

      };
    };

    return tree;
  }

  min(node = this.node) {

    if (!node) return null;
    if (node.left === null) return node.data;

    return this.min(node.left);
  }

  max(node = this.node) {
    if (!node) return null;
    if (node.right === null) return node.data;

    return this.max(node.right);
  }

}