type Node<T> = {
    value: T
    next?: Node<T>
    prev?: Node<T>
}

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>

    constructor() {
        this.head = undefined
        this.length = 0
    }

    prepend(item: T): void {
        const lk = { value: item } as Node<T>
        this.length++;

        lk.next = this.head;
        if (this.head) this.head.prev = lk
        this.head = lk
    }

    append(item: T): void {
        if (!this.head) {
            this.prepend(item)
            return
        }
        const lk = { value: item } as Node<T>
        this.length++;

        let curr = this.head
        while (curr.next) curr = curr.next

        curr.next = lk
        lk.prev = curr
    }
    insertAt(item: T, idx: number): void {
        if (idx > length) {
            throw new Error("Index can not be greater than the length")
        } else if (idx == length) {
            this.append(item)
            return
        } else if (idx == 0) {
            this.prepend(item)
            return
        }
        if (!this.head) {
            this.prepend(item);
            return
        }
        let curr: Node<T> = this.head;
        for (let i = 0; i < idx; i++) {
            curr = curr.next!
        }

        const lk = { value: item } as Node<T>
        lk.next = curr;
        if (curr.prev)
            curr.prev.next = lk
        lk.prev = curr.prev

    }
    get(idx: number): T | undefined {
        if (idx > this.length) return undefined
        if (!this.head) return undefined

        let curr = this.head
        for (let i = 0; i < idx; i++) {
            curr = curr.next!
        }

        return curr.value

    }
    removeAt(idx: number): T | undefined {
        if (idx > this.length) return undefined
        if (!this.head) return undefined
        this.length--
        let curr = this.head
        for (let i = 0; i < idx; i++) {
            curr = curr.next!
        }
        if (idx === 0)
            this.head = curr.next

        if (curr.next)
            curr.next.prev = curr.prev
        if (curr.prev)
            curr.prev.next = curr.next


        return curr.value
    }
    remove(item: T): T | undefined {
        if (!this.head) return undefined

        let curr = this.head
        let i = 0
        for (; i < this.length; i++) {
            if(curr.value == item)
                break
            curr = curr.next!
        }
        if(!curr) return undefined
        return this.removeAt(i)
    }
}
