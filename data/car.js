class Car {
  #brand;
  #model;

  constructor(brand, model) {
    this.#brand = brand;
    this.#model = model;
    this.speed = 0;
    this.isTrunkOpen = false;
  }

  displayInfo() {
    const trunkStatus = this.isTrunkOpen ? 'open' : 'closed';
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${trunkStatus}`);
  }

  go() {
    if (this.isTrunkOpen) {
      return;
    }
    this.speed = Math.min(200, this.speed + 5);
  }

  brake() {
    this.speed = Math.max(0, this.speed - 5);
  }
  
  openTrunk() {
    if(this.speed === 0) {
      this.isTrunkOpen = true;
    }
  }

  closeTrunk() {
    this.isTrunkOpen = false;
  }
}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');

/*
// --- 测试代码 ---
console.log('--- 后备箱测试 ---')
car1.displayInfo();
car1.openTrunk();
car1.displayInfo();

car1.go();
car1.displayInfo();

car1.closeTrunk();
car1.go();
car1.displayInfo();

car1.openTrunk();
car1.displayInfo();

console.log('--- 丰田卡罗拉测试 ---');
car1.displayInfo(); // 初始速度
car1.go();
car1.go();
car1.go();
car1.displayInfo(); // 加速后
car1.brake();
car1.displayInfo(); // 减速后

console.log('--- 特斯拉Model 3测试 ---');
car2.displayInfo(); // 初始速度
car2.go();
car2.displayInfo(); // 加速后
*/

class RaceCar extends Car {
  constructor(brand, model, acceleration) {
    super(brand, model);
    this.acceleration = acceleration;
  }

  go() {
    this.speed = Math.min(300, this.speed + this.acceleration);
  }

  openTrunk() {
    console.log('Race cars do not have a trunk.');
  }

  closeTrunk() {
    console.log('Race cars do not have a trunk.');
  } 
}

const raceCar1 = new RaceCar('McLaren', 'F1', 20);

/*
// --- 测试新代码 ---
console.log('--- 赛车测试 ---');
raceCar1.displayInfo(); // 初始速度
raceCar1.go();
raceCar1.displayInfo(); // 加速一次后 (速度 +20)
raceCar1.go();
raceCar1.displayInfo(); // 加速两次后 (速度 +20)
raceCar1.openTrunk(); // 尝试打开后备箱
*/