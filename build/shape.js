class Circle {
    radues;
    constructor(radues) {
        this.radues = radues;
    }
    accauntArea() {
        return Math.PI * Math.pow(this.radues, 2);
    }
}
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    accauntArea() {
        return this.width * this.height;
    }
}
const circle = new Circle(5);
console.log("Circle area:", circle.accauntArea());
const rectangle = new Rectangle(10, 20);
console.log("Rectangle area:", rectangle.accauntArea());
export {};
//# sourceMappingURL=shape.js.map