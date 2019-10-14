const Node = require('./node');

class LinkedList {
    constructor() {
    	this.length = 0;
    	this._head = new Node();
    	this._tail = new Node();
    }

    append(data) {
        let node = new Node(data);
        node.prev = this._tail;

        if (!this.length) {
            this._head = node;
        } else if (this.length === 1) {
            this._head.next = node;
        } else {
            this._tail.next = node;
        }

        this._tail = node;

    	this.length++;
        return this;
    }

    head() {
    	return this._head.data;
    }

    tail() {
    	return this._tail.data;
    }

    at(index) {
        let currentNode = this._head;
        let i = 1;
        while(i <= index) {
            currentNode = currentNode.next;
            i++;
        }
        return currentNode.data;
    }

    insertAt(index, data) {
        let currentNode = this._head;
        let i = 1;
        while(i < index) {
            currentNode = currentNode.next;
            i++;
        }
        let newNode = new Node(data, currentNode, currentNode.next);
        currentNode.next = newNode;
        return this;
    }

    isEmpty() {
    	return this.length === 0;
    }

    clear() {
    	this.length = 0;
        this._head = new Node();
        this._tail = new Node();
        return this;
    }

    deleteAt(index) {
        let currentNode = this._head;
        let i = 1;
        while(i <= index) {
            currentNode = currentNode.next;
            i++;
        }

        if (index) {
            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
        } else {
            currentNode.next.prev = null;
            currentNode.next = null;
        }
        
        this.length--;
        return this;
    }

    reverse() {
        let currentNode = this._head.next;
        [this._head, this._tail] = [this._tail, this._head];
        [this._head.next, this._tail.prev] = [this._head.prev, this._tail.next];
        for (let i = 1; i < this.length-1; i++) {
            [currentNode.prev, currentNode.next] = [currentNode.next, currentNode.prev];
            currentNode = currentNode.prev;
        }
        return this;
    }

    indexOf(data) {
        let currentNode = this._head;
        let i = 0;
        while(i < this.length && currentNode.data !== data) {
            currentNode = currentNode.next;
            i++;
        }

        return currentNode && currentNode.data === data ? i : -1;
    }
}

module.exports = LinkedList;
