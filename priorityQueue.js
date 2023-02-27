class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    enqueue(element, priority) {
        // Create a new object to represent the element and its priority
        let item = [element, priority];
  
        // Loop through the elements in the queue and find the correct position for the new element
        let added = false;
        for (let i = 0; i < this.elements.length; i++) {
            if (item[1] < this.elements[i][1]) {
                this.elements.splice(i, 0, item);
                added = true;
                break;
            }
        }
  
        // If the element has the highest priority so far, add it to the end of the queue
        if (!added) {
            this.elements.push(item);
        }
    }
  
    // Removes and returns the element with the lowest priority
    dequeue() {
        return this.elements.shift();
    }
  
    // Returns true if the queue is empty, false otherwise
    isEmpty() {
        return this.elements.length === 0;
    }

    // Empty this fucking thing
    toEmpty(){
        this.elements = [];
    }
  
    // Returns the priority of the given element in the queue
    getPriority(element) {
        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i][0] === element[0] && this.elements[i][1] === element[1]) {
                return this.elements[i][1];
            }
        }
        return undefined;
    }
}