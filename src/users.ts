class CRUD<T> {
  private items: T[] = [];

  create(item: T): void {
    this.items.push(item);
  }

  read(): T[] {
    return this.items;
  }

  update(index: number, item: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = item;
    } else {
      console.error("Item not found.");
    }
  }

  delete(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    } else {
      console.error("Item not found.");
    }
  }
}

class Users extends CRUD<{ name: string; age: number }> {}

const users = new Users();
users.create({ name: "Ali", age: 25 });
console.log(users.read());
users.update(0, { name: "Vali", age: 30 });
console.log(users.read());
users.delete(0);
console.log(users.read());
