interface shape {
  accauntArea(): number;
}

class Circle implements shape {
  constructor(private radues: number) {}
  accauntArea(): number {
    return Math.PI * Math.pow(this.radues, 2);
  }
}

class Rectangle implements shape {
  constructor(private width: number, private height: number) {}
  accauntArea(): number {
      return this.width * this.height
  }
}

const circle = new Circle(5);
console.log("Circle area:", circle.accauntArea());

const rectangle = new Rectangle(10, 20);
console.log("Rectangle area:", rectangle.accauntArea());