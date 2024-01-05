function clean(array) {
	for (let index = 0; index < array.length; index++) {
		if (array[index] === array[index - 1]) {
			array.splice(index, 1);
		}
		if (typeof array[index + 2] !== "number") {
			console.log(array.pop());
		}
	}
	return array;
}
function merge(leftArray, rightArray) {
	let i = 0;
	let k = 0;
	array = [];
	//sort
	while (array.length < leftArray.length + leftArray.length) {
		if (
			((leftArray[i] < rightArray[k]) & (i < leftArray.length)) |
			((typeof leftArray[i] === "number") &
				(typeof rightArray[k] !== "number"))
		) {
			array.push(leftArray[i]);
			i++;
		} else {
			array.push(rightArray[k]);
			k++;
		}
	}

	//console.log(leftArray + " y " + rightArray);
	return array;
}
function mergeSort(array) {
	if (array.length === 1) {
		return array;
	} else {
		let midpoint = Math.ceil(array.length / 2);
		let leftArray = mergeSort(array.slice(0, midpoint));
		let rightArray = mergeSort(array.slice(midpoint, array.length));

		return merge(leftArray, rightArray);
	}
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}
class Node {
	constructor(value) {
		this.value = value;
		this.left = null;
		this.right = null;
	}
}
class Tree {
	constructor(array) {
		let cleanArray = clean(mergeSort(array));
		this.root = this.buildTree(cleanArray, 0, cleanArray.length - 1);
	}
	buildTree(array, star, end) {
		if (star > end) {
			//const node = new Node(array[0]);
			return null;
		} else {
			let midpoint = parseInt((star + end) / 2);
			const node = new Node(array[midpoint]);
			node.left = this.buildTree(array, star, midpoint - 1);
			node.right = this.buildTree(array, midpoint + 1, end);
			return node;
		}
	}
	find(value, node = this.root) {
		if (node === null) {
			console.log("X");
			return null;
		} else if (node.value === value) {
			return node;
		} else {
			if (value < node.value) {
				return this.find(value, node.left);
			} else {
				return this.find(value, node.right);
			}
		}
	}
	findDistance(value, node = this.root, i = 0) {
		if (node === null) {
			return null;
		} else if (node.value === value) {
			console.log(i);
			return i;
		} else {
			if (value < node.value) {
				this.findDistance(value, node.left, (i += 1));
			} else {
				this.findDistance(value, node.right, (i += 1));
			}
		}
		return;
	}
	insert(value, ptr = this.root) {
		if (value === ptr.value) {
			return null;
		} else if (ptr.value > value) {
			if (ptr.left === null) {
				const node = new Node(value);
				ptr.left = node;
			} else {
				this.insert(value, ptr.left);
			}
		} else {
			if (ptr.right === null) {
				const node = new Node(value);
				ptr.right = node;
			} else {
				this.insert(value, ptr.right);
			}
		}
	}
	biggerThan(ptr) {
		ptr = ptr.right;
		while (ptr.left !== null) {
			ptr = ptr.left;
		}
		return ptr.value;
	}
	delate(value, ptr = this.root) {
		if (value < ptr.value) {
			if (value === ptr.left.value) {
				if ((null === ptr.left.left) & (null === ptr.left.right)) {
					ptr.left = null;
				} else {
					if (
						!((null !== ptr.left.left) & (null !== ptr.left.right))
					) {
						console.log("!");
						if (null !== ptr.left.left) {
							ptr.left = ptr.left.left;
						} else {
							ptr.left = ptr.left.right;
						}
					} else {
						ptr.left.value = this.biggerThan(ptr.left);
						this.delate(ptr.left.value, ptr.left);
					}
				}
			} else {
				this.delate(value, ptr.left);
			}
		} else if (value > ptr.value) {
			if (value === ptr.right.value) {
				if ((null === ptr.right.left) & (null === ptr.right.right)) {
					ptr.right = null;
				} else {
					if (
						!(
							(null !== ptr.right.left) &
							(null !== ptr.right.right)
						)
					) {
						console.log("!");
						if (null !== ptr.right.left) {
							ptr.right = ptr.right.left;
						} else {
							ptr.right = ptr.right.right;
						}
					} else {
						ptr.right.value = this.biggerThan(ptr.right);
						if (ptr.right.value === ptr.right.right.value) {
							ptr.right.right = ptr.right.right.right;
						} else {
							this.delate(ptr.right.value, ptr.right);
						}
					}
				}
			} else {
				this.delate(value, ptr.right);
			}
		} else {
			if (ptr === this.root) {
				ptr.value = this.biggerThan(ptr);
				this.delate(ptr.value, ptr.right);
			}
		}
	}
	levelOrder(array = [this.root], callback = []) {
		if (array.length === 0) {
			if (typeof callback === "function") {
				return;
			} else {
				return callback;
			}
		} else {
			if (typeof callback === "function") {
				callback(array[0]);
			} else {
				callback.push(array[0].value);
			}

			if (array[0].left !== null) {
				array.push(array[0].left);
			}
			if (array[0].right !== null) {
				array.push(array[0].right);
			}
			array.shift();
			this.levelOrder(array, callback);
			if (typeof callback !== "function") {
				return callback;
			}
		}
	}
	preOrder(node = this.root, callback = [], last = true) {
		if (typeof callback === "function") {
			callback(node);
		} else {
			callback.push(node.value);
		}

		if (node.left !== null) {
			this.preOrder(node.left, callback, false);
		}
		if (node.right !== null) {
			this.preOrder(node.right, callback, false);
		}

		if (last & (typeof callback !== "function")) {
			return callback;
		}
	}
	inOrder(node = this.root, callback = [], last = true) {
		if (node.left !== null) {
			this.inOrder(node.left, callback, false);
		}

		if (typeof callback === "function") {
			callback(node);
		} else {
			callback.push(node.value);
		}

		if (node.right !== null) {
			this.inOrder(node.right, callback, false);
		}

		if (last & (typeof callback !== "function")) {
			return callback;
		}
	}
	postOrder(node = this.root, callback = [], last = true) {
		if (node.left !== null) {
			this.postOrder(node.left, callback, false);
		}

		if (node.right !== null) {
			this.postOrder(node.right, callback, false);
		}

		if (typeof callback === "function") {
			callback(node);
		} else {
			callback.push(node.value);
		}

		if (last & (typeof callback !== "function")) {
			return callback;
		}
	}
	checkBalance(node = this.root, i = 0, array = []) {
		if ((node.left == null) | (node.right == null)) {
			array.push(i);
			console.log(node.value + ": " + i);
			if ((node.left == null) & (node.right == null)) {
				return;
			} else if (node.left == null) {
				this.checkBalance(node.right, (i += 1), array);
			} else if (node.right == null) {
				this.checkBalance(node.left, (i += 1), array);
			}
			return array; //*
		} else {
			this.checkBalance(node.left, i, array);
			this.checkBalance(node.right, i, array);
			return array;
		}
	}
	isBalanced() {
		const balanceArray = this.checkBalance();
		let disbalance = balanceArray.find((element) => element >= 2);
		if (disbalance > 1) {
			return false;
		} else {
			return true;
		}
	}
	height(nodeStar = this.root, levelOrderArray = this.levelOrder()) {
		let lastLeft = levelOrderArray[levelOrderArray.length - 1];
		this.findDistance(lastLeft, nodeStar);
	}
	depth(value) {
		return this.findDistance(value);
	}
	rebalance() {
		let inOrderArray = this.inOrder();
		this.root = this.buildTree(inOrderArray, 0, inOrderArray.length - 1);
	}
}

arrayOfRandoms = [];
for (let index = 0; index < 99; index++) {
	arrayOfRandoms.push(getRandomInt(0, 1000));
}
console.log(arrayOfRandoms);
const tree = new Tree(arrayOfRandoms);
prettyPrint(tree.root);
/*
tree.insert(2);
tree.insert(4.5);
tree.insert(21);
tree.insert(8);
tree.insert(8.5);
tree.insert(0.1);
tree.insert(100);
tree.insert(7.5);
tree.insert(16);
tree.delate(21);
tree.insert(17);
tree.insert(18);
tree.insert(19);
tree.insert(17.5);
prettyPrint(tree.root);
console.log(tree.find(1));
tree
	.levelOrder /*
	[tree.root],
	(randomFunction = (a) => {
		console.log("( " + a.value + " )");
	})*/
/*();
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.depth(17));
tree.rebalance();
prettyPrint(tree.root);*/
