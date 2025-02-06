/**
 * This code doesn't use any p5.js so nothing will be rendered when you run it
 * Open the browser console to see the output
 */

class Parent {
    att1;
    att2;

    /**
     * Creates a new Parent
     * @param {number} a 
     * @param {number} b 
     */
    constructor(a, b) {
        this.att1 = a;
        this.att2 = b;
    }

    /**
     * Multiples all attributes together.
     * @returns {number} The product of all attributes
     */
    multiply() {
        return this.att1 * this.att2;
    }

}

class Child extends Parent {
    #att3;

    /**
     * Creates a new Child
     * @param {number} a 
     * @param {number} b 
     * @param {number} c 
     */
    constructor(a, b, c) {
        super(a, b);
        this.#att3 = c;
    }


    multiply() {
        return this.att1 * this.att2 * this.#att3;
        // Alternative (more OOP and more future-proof!) - try changing super to this and see what happens
        // return super.multiply() * this.#att3;
    }


    /**
     * Gets the third attribute
     * @returns {number}
     */
    getAtt3() {
        return this.#att3;
    }
}

class Child2 extends Parent {

    /**
     * Gets a pointless message
     * @returns {string}
     */
    pointlessMethod() {
        return "hello from a Child2";
    }
}


class GrandChild extends Child {
    
    /**
     * Divides all attributes by each other
     * @returns {number}
     */
    divide() {
        return this.getAtt3() / this.att1 / this.att2;
    }
}


const p = new Parent(2, 10);
const c = new Child(-1, 2, 3);
const c2 = new Child2(4, 10);
const g = new GrandChild(3, 4, 5);


console.log("parent multiply() =", p.multiply());
console.log("child multiply() =", c.multiply());
console.log("child getAtt3() =", c.getAtt3());

// Child classes can't access private members of a parent class (see the divide() method)
console.log("grandchild divide() =", g.divide());

// Instances of Child2 still have the multiply() method, even though it is not implemented
console.log("child2 att1 =", c2.att1);
console.log("child2 multiply() =", c2.multiply());
console.log("child2 pointlessMethod() =", c2.pointlessMethod());

// This will result in an error, the method only exists in Child
console.log("parent getAtt3() =", p.getAtt3());