class Vehile {
}
class Car extends Vehile {
    start() {
        console.log("Car started");
    }
    stop() {
        console.log("Car stoped");
    }
}
class MotorCycle extends Vehile {
    start() {
        console.log("MotorCycle started");
    }
    stop() {
        console.log("MotorCycle stoped");
    }
}
const car = new Car();
car.start();
car.stop();
const motorCycle = new MotorCycle();
motorCycle.start();
motorCycle.stop();
export {};
//# sourceMappingURL=vehicle.js.map