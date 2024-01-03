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
	insert(value, ptr = this.root) {
		if (value === ptr.value) {
			console.log("1!");
			return null;
		} else if (ptr.value > value) {
			if (ptr.left === null) {
				const node = new Node(value);
				ptr.left = node;
			} else {
				this.insert(value, ptr.left);
			}
			console.log("3!");
		} else {
			if (ptr.right === null) {
				const node = new Node(value);
				ptr.right = node;
			} else {
				this.insert(value, ptr.right);
			}
			console.log("2!");
		}
	}
}
console.log("1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,");
const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
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
tree.insert(2);
tree.insert(21);
tree.insert(8);
prettyPrint(tree.root);
console.log(tree.find(1));
