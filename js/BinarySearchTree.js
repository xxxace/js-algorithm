class BinarySearchTree {
    constructor() {
        this.count = 0
        this.root = null
    }

    insert(key) {
        if (!key) return false

        const newNode = new Node(key);

        if (!this.root) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }

        this.count++
            return true
    }

    insertNode(node, newNode) {
        if (node) {
            if (node.key > newNode.key) {
                if (node.left) {
                    this.insertNode(node.left, newNode)
                } else {
                    node.left = newNode
                }
            } else if (node.key < newNode.key) {
                if (node.right) {
                    this.insertNode(node.right, newNode)
                } else {
                    node.right = newNode
                }
            } else {
                node.key = newNode.key
                this.count--
            }
        }
    }

    previousTraversal(handler) {
        this.root && this.previousTraversalNode(this.root, handler)
    }

    previousTraversalNode(node, handler) {
        handler && handler(node.key);
        node.left && this.previousTraversalNode(node.left, handler);
        node.right && this.previousTraversalNode(node.right, handler);
    }

    middleTraversal(handler) {
        this.root && this.middleTraversalNode(this.root, handler)
    }

    middleTraversalNode(node, handler) {
        node.left && this.middleTraversalNode(node.left, handler);
        handler && handler(node.key);
        node.right && this.middleTraversalNode(node.right, handler);
    }

    afterTraversal(handler) {
        this.root && this.afterTraversalNode(this.root, handler)
    }

    afterTraversalNode(node, handler) {
        node.right && this.afterTraversalNode(node.right, handler);
        handler && handler(node.key);
        node.left && this.afterTraversalNode(node.left, handler);
    }

    getMax() {
        if (this.root) {
            let current = this.root
            let max = this.root.key

            while (current.right) {
                current = current.right
                max = current.key
            }

            return max;
        } else {
            return null
        }
    }

    getMin() {
        if (this.root) {
            let current = this.root
            let min = this.root.key

            while (current.left) {
                current = current.left
                min = current.key
            }

            return min;
        } else {
            return null
        }
    }

    find(key) {
        if (this.root) {
            if (this.root.key === key) {
                return this.root
            } else {
                return this.findNode(this.root, key)
            }
        } else {
            return null
        }
    }

    findNode(node, key) {
        if (node) {
            if (node.key > key) {
                return this.findNode(node.left, key)
            } else if (node.key < key) {
                return this.findNode(node.right, key)
            } else {
                return node
            }
        } else {
            return null
        }
    }

    remove(key) {
        if (this.root) {
            let current = this.root
            let parent = this.root
            let isLeft = true

            while (current.key !== key) {
                parent = current
                if (current.key > key) {
                    isLeft = true
                    current = current.left
                } else if (current.key < key) {
                    isLeft = false
                    current = current.right
                }

                if (!current) return false
            }

            if (!current.left && !current.right) {
                if (current === this.root) {
                    this.root = null
                } else if (isLeft) {
                    parent.left = null
                } else {
                    parent.right = null
                }

            } else if (!current.left) {
                if (current === this.root) {
                    this.root = current.right
                } else {
                    if (isLeft) {
                        parent.left = current.right
                    } else {
                        parent.right = current.right
                    }
                }

            } else if (!current.right) {
                if (current === this.root) {
                    this.root = current.left
                } else {
                    if (isLeft) {
                        parent.left = current.left
                    } else {
                        parent.right = current.left
                    }
                }
            } else {
                const successor = this.getSuccessor(current)
                console.log(successor)
                if (current === this.root) {
                    this.root = successor
                } else if (isLeft) {
                    parent.left = successor
                } else {
                    parent.right = successor
                }

                successor.left = current.left
            }
            this.count -= 1
            return true
        } else {
            return false
        }

    }

    getSuccessor(deleteNode) {
        let successorParent = deleteNode
        let successor = deleteNode.right
        let current = deleteNode.right

        while (current.left) {
            successorParent = successor
            successor = current.left
            current = current.left
        }

        if (successor !== deleteNode.right) {
            successorParent.left = successor.right
            successor.right = deleteNode.right
        }

        return successor
    }
}

class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

export default BinarySearchTree