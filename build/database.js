class Database {
}
class MongoDb extends Database {
    items = [];
    connect() {
        console.log("Mongodb connected");
    }
    disconnect() {
        console.log("Mongodb Disconnected");
    }
    create(time) {
        this.items.push(time);
    }
    read() {
        return this.items;
    }
    update(id, item) {
        if (id >= 0 && id < this.items.length) {
            this.items[id] = item;
        }
        else {
            console.error("item not found");
        }
    }
    delete(id) {
        if (id >= 0 && id < this.items.length) {
            this.items.splice(id, 1);
        }
        else {
            console.error("item not found");
        }
    }
}
class SqlDB extends Database {
    items = [];
    connect() {
        console.log("Sql connected");
    }
    disconnect() {
        console.log("Sql Disconnected");
    }
    create(time) {
        this.items.push(time);
    }
    read() {
        return this.items;
    }
    update(id, item) {
        if (id >= 0 && id < this.items.length) {
            this.items[id] = item;
        }
        else {
            console.error("item not found");
        }
    }
    delete(id) {
        if (id >= 0 && id < this.items.length) {
            this.items.splice(id, 1);
        }
        else {
            console.error("item not found");
        }
    }
}
const mongoDb = new MongoDb();
mongoDb.connect();
mongoDb.create({ name: "Ali", age: 30 });
console.log(mongoDb.read());
mongoDb.update(0, { name: "Vali", age: 25 });
console.log(mongoDb.read());
mongoDb.delete(0);
console.log(mongoDb.read());
mongoDb.disconnect();
const sqlDb = new SqlDB();
sqlDb.connect();
sqlDb.create({ name: "Hasan", age: 40 });
console.log(sqlDb.read());
sqlDb.update(0, { name: "Husan", age: 35 });
console.log(sqlDb.read());
sqlDb.delete(0);
console.log(sqlDb.read());
sqlDb.disconnect();
export {};
//# sourceMappingURL=database.js.map