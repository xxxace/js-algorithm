import Queue from './Queue.js'

class LoopQueue extends Queue {
    constructor(size = 12) {
        super()
        this.head = this.tail = this.nextIndex = this.count = 0

        this.size = size
        this.items = Array(size)
    }

    enqueue(item) {
        if (this.count >= this.size) return false;
        this.tail = this.nextIndex
        this.items[this.nextIndex++] = item;

        if (this.nextIndex >= this.size) this.nextIndex -= this.size;

        this.count += 1;
        return true;
    }

    dequeue() {
        if (this.isEmpty()) return false;
        this.items[this.head++] = undefined;
        if (this.head >= this.size) this.head -= this.size
        this.count -= 1;
        return true;
    }


    front() {
        return this.items[this.head]
    }

    back() {
        return this.items[this.tail]
    }

    isEmpty() {
        return this.count === 0
    }

    toString() {
        let str = `LoopQueue(${this.count}) : [`
        for (let i = this.head, j = 0; j < this.count; j++) {
            const index = (i + j) % this.size;
            const item = this.items[index]
            str += `${item}, `
        }
        const lastIndex = str.lastIndexOf(',')
        if (lastIndex > -1) str = str.substring(0, lastIndex);
        str += ']'
        return str;
    }
}

export default LoopQueue;