// code derived from https://codeburst.io/linked-lists-in-javascript-es6-code-part-1-6dd349c3dcc3

class Node {
  constructor(data, next = null) {
    this.data = data,
      this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.current = null;
  }

  setCurrent(data) {
    this.current = data
  }

  insertAtBeginning(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    return newNode;
  }

  insertAtEnd(data) {
    let newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      return newNode;
    }

    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    tail.next = newNode; 
    return newNode;
  }

  insertAfter(prev, data) {
    let newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
      return newNode;
    }

    let tail = prev || this.head;
    tail.next = newNode; 
    return newNode;
  }

  getAt(index) {
    let counter = 0;
    let node = this.head;
    while (node) {
      if (counter === index) {
        return node;
      }
      counter++;
      node = node.next;
    }
    return null;
  }

  insertAt(data, index) {
    if (!this.head) {
      this.head = new Node(data);
      return this.head;
    }

    if (index === 0) {
      this.head = new Node(data, this.head);
      return this.head;
    }

    const previous = this.getAt(index - 1);
    let newNode = new Node(data);
    newNode.next = previous.next;
    previous.next = newNode;

    return newNode
  }

  relinkCurrentTo(node) {
    this.current.next = node
  }

  find(cb) {
    let node = this.head;
    while (node) {
      if (cb(node)) {
        return node;
      }
      node = node.next;
    }
    return null;
  }

  forEach(cb) {
    let node = this.head;
    while (node) {
      cb(node)
      node = node.next;
    }
    return null;
  }

  deleteFirstNode() {
    if (!this.head) {
      return;
    }
    this.head = this.head.next;
    return this.head;
  }

  deleteLastNode() {
    if (!this.head) {
      return null;
    }    

    if (!this.head.next) {
      this.head = null;
      return;
    } let previous = this.head;
    let tail = this.head.next;

    while (tail.next !== null) {
      previous = tail;
      tail = tail.next;
    }

    previous.next = null;
    return this.head;
  }

  deleteAt(index) {
    if (!this.head) {
      return;
    }

    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    const previous = this.getAt(index - 1);

    if (!previous || !previous.next) {
      return;
    }

    previous.next = previous.next.next;
    return this.head
  }

  deleteList() {
    this.head = null;
  }
}

module.exports = LinkedList
