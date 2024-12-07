class CRUD {
    items = [];
    create(item) {
        this.items.push(item);
    }
    read() {
        return this.items;
    }
    update(index, item) {
        if (index >= 0 && index < this.items.length) {
            this.items[index] = item;
        }
        else {
            console.error("Item not found.");
        }
    }
    delete(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
        else {
            console.error("Item not found.");
        }
    }
}
class Users extends CRUD {
}
const users = new Users();
users.create({ name: "Ali", age: 25 });
console.log(users.read());
users.update(0, { name: "Vali", age: 30 });
console.log(users.read());
users.delete(0);
console.log(users.read());
export {};
//# sourceMappingURL=users.js.map