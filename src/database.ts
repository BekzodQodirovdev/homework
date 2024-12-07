abstract class Database<T> {
  abstract connect(): void;
  abstract disconnect(): void;
  abstract create(time: T): void;
  abstract read(): T[];
  abstract update(id: number, item: T): void;
  abstract delete(id: number): void;
}

class MongoDb<T> extends Database<T> {
  private items: T[] = [];
  connect(): void {
    console.log("Mongodb connected");
  }
  disconnect(): void {
    console.log("Mongodb Disconnected");
  }
  create(time: T): void {
    this.items.push(time);
  }
  read(): T[] {
    return this.items;
  }
  update(id: number, item: T): void {
    if (id >= 0 && id < this.items.length) {
      this.items[id] = item;
    } else {
      console.error("item not found");
    }
  }
  delete(id: number): void {
    if (id >= 0 && id < this.items.length) {
      this.items.splice(id, 1);
    } else {
      console.error("item not found");
    }
  }
}

class SqlDB<T> extends Database<T> {
  private items: T[] = [];
  connect(): void {
    console.log("Sql connected");
  }
  disconnect(): void {
    console.log("Sql Disconnected");
  }
  create(time: T): void {
    this.items.push(time);
  }
  read(): T[] {
    return this.items;
  }
  update(id: number, item: T): void {
    if (id >= 0 && id < this.items.length) {
      this.items[id] = item;
    } else {
      console.error("item not found");
    }
  }
  delete(id: number): void {
    if (id >= 0 && id < this.items.length) {
      this.items.splice(id, 1);
    } else {
      console.error("item not found");
    }
  }
}

const mongoDb = new MongoDb<any>();
mongoDb.connect();
mongoDb.create({ name: "Ali", age: 30 });
console.log(mongoDb.read());
mongoDb.update(0, { name: "Vali", age: 25 });
console.log(mongoDb.read());
mongoDb.delete(0);
console.log(mongoDb.read());
mongoDb.disconnect();

const sqlDb = new SqlDB<any>();
sqlDb.connect();
sqlDb.create({ name: "Hasan", age: 40 });
console.log(sqlDb.read());
sqlDb.update(0, { name: "Husan", age: 35 });
console.log(sqlDb.read());
sqlDb.delete(0);
console.log(sqlDb.read());
sqlDb.disconnect();
