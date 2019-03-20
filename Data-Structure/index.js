// 栈
function Stack() {
    let item = [];
    this.push = function (...arg) {
        item.push(...arg);
    }
    this.pop = function () {
        return item.pop();
    }
    this.peek = function () {
        return item[item.length - 1];
    }
    this.isEmpty = function () {
        return item.length === 0;
    }
    this.clear = function () {
        item.length = 0;
    }
    this.size = function () {
        return item.length;
    }
    this.print = function () {
        return item.toString();
    }
}

// 队列
function Queue() {
    let item = [];
    this.enqueue = function (...arg) {
        item.push(...arg);
    }
    this.dequeue = function () {
        return item.shift()
    }
    this.front = function () {
        return item[0];
    }
    this.isEmpty = function () {
        return item.length === 0;
    }
    this.clear = function () {
        item.length = 0;
    }
    this.size = function () {
        return item.length;
    }
    this.print = function () {
        return item.toString();
    }
}


// 优先队列
function PriorityQueue() {
    let item = [];
    this.QueueElement = function (element, priority) {
        this.element = element;
        this.priority = priority;
    }
    this.enqueue = function (element, priority) {
        let queueElement = new this.QueueElement(element, priority);
        if (this.isEmpty()) {
            item.push(queueElement);
        } else {
            for (let i = 0; i < item.length; i++) {
                if (item[i].priority > queueElement.priority) {
                    item.splice(i, 0, queueElement);
                    return;
                }
                if (i === item.length - 1) {
                    item.push(queueElement);
                    return;
                }
            }
        }
    }
    this.print = function () {
        return console.log(item);
    }
    this.isEmpty = function () {
        return item.length === 0;
    }
}

// 链表
function LinkedList() {
    var length = 0;
    var head = null;

    function ListNode(val) {
        this.val = val;
        this.next = null;
    }

    this.append = function (element) {
        element = new ListNode(element);
        let current;

        if (head === null) {
            head = element;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            current.next = element;
        }

        length++;
    }
    this.remove = function (position) {

        if ((!position && position !== 0) || position < 0 || position > length - 1) {
            return false;
        }

        let index = 0;
        let current = head;
        let previous;

        if (position === 0) {
            head = head.next;
        } else {
            while (index < position) {
                previous = current;
                current = current.next;
                index++;
            }
            previous.next = current.next;
        }

        length--;
        return current;
    }
    this.insert = function (position, element) {
        element = new ListNode(element);

        if ((!position && position !== 0) || position < 0 || position > length - 1) {
            return false;
        }

        let index = 0;
        let current = head;
        let previous;

        if (position === 0) {
            head = element;
            head.next = current;
        } else {
            while (index < position) {
                previous = current;
                current = current.next;

                index++;
            }
            previous.next = element;
            element.next = current;
        }
        length++;
        return element;
    }

    this.indexOf = function (element) {
        let index = 0;
        let current = head;

        while (current) {
            if (current.val === element) {
                return index;
            }
            current = current.next;
            index++;
        }

        return -1;
    }

    this.print = function () {
        console.log(JSON.stringify(head, null, 4));
    }
}

var L = new LinkedList();

for (let i = 0; i < 5; i++) {
    L.append(i);
}