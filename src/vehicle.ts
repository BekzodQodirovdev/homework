abstract class Vehile {
  abstract start(): void;
  abstract stop(): void;
}

class Car extends Vehile {
  start(): void {
    console.log("Car started");
  }
  stop(): void {
    console.log("Car stoped");
  }
}

class MotorCycle extends Vehile {
  start(): void {
    console.log("MotorCycle started");
  }
  stop(): void {
    console.log("MotorCycle stoped");
  }
}

const car = new Car();
car.start();
car.stop();

const motorCycle = new MotorCycle();
motorCycle.start();
motorCycle.stop();
