# Homework: TypeScript'da OOP va Interfeyslar

#### Task 1: Shape interfeysini yaratish va undan Circle va Rectangle classlarini yaratish

1. **Shape interfeysini yaratish:**

   - `Shape` nomli interfeys yarating.
   - Ushbu interfeysda `accountArea` metodi bo'lsin.

2. **Circle classini yaratish:**

   - `Shape` interfeysini amalga oshiruvchi (`implements`) `Circle` classini yarating.
   - `Circle` classida radius xususiyati bo'lsin.
   - `accountArea` metodini `Circle` classida amalga oshiring.

3. **Rectangle classini yaratish:**
   - `Shape` interfeysini amalga oshiruvchi (`implements`) `Rectangle` classini yarating.
   - `Rectangle` classida kenglik (`width`) va balandlik (`height`) xususiyatlari bo'lsin.
   - `accountArea` metodini `Rectangle` classida amalga oshiring.

#### Task 2: Vehicle abstract classini yaratish va Car va MotorCycle classlarini yaratish

1. **Vehicle abstract classini yaratish:**

   - `Vehicle` nomli abstract class yarating.
   - Ushbu classda `start` va `stop` abstract metodlari bo'lsin.

2. **Car classini yaratish:**

   - `Vehicle` classidan meros oluvchi (`extends`) `Car` classini yarating.
   - `start` va `stop` metodlarini `Car` classida amalga oshiring.

3. **MotorCycle classini yaratish:**
   - `Vehicle` classidan meros oluvchi (`extends`) `MotorCycle` classini yarating.
   - `start` va `stop` metodlarini `MotorCycle` classida amalga oshiring.

#### Task 3: Users classini yaratish

1. **Users classini yaratish:**

   - `Users` nomli class yarating.
   - Ushbu classda `user_list` nomli xususiy (`private`) massiv bo'lsin.
   - Massiv ustida CRUD amallarini bajaruvchi metodlarni yarating.

2. **CRUD metodlari:**

   - **Create:** Yangi foydalanuvchi qo'shuvchi metod.
   - **Read:** Foydalanuvchilar ro'yxatini qaytaruvchi metod.
   - **Update:** Foydalanuvchi ma'lumotlarini yangilovchi metod.
   - **Delete:** Foydalanuvchini o'chiruvchi metod.

3. **class va Genericlardan foydalanish:**
   - CRUD amallari uchun class yarating va undan meros olish orqali `Users` classini yarating.
   - CRUD metodlarida generiklardan foydalaning.

## Task: `Database` classi va `MongoDB` va `SQLDB` classlarini Yaratish

#### Task 1: `Database` classini Yaratish

1. **`Database` classini yaratish:**
   - `Database` nomli class yarating.
   - Umumiy metodlarni class metodlari sifatida belgilang:
     - `connect()`: Ma'lumotlar bazasiga ulanish.
     - `disconnect()`: Ma'lumotlar bazasidan ajralish.
     - `create(item: T)`: Yangi ma'lumot qo'shish.
     - `read()`: Barcha ma'lumotlarni o'qish.
     - `update(id: number, item: T)`: Ma'lumotlarni yangilash.
     - `delete(id: number)`: Ma'lumotlarni o'chirish.

#### Task 2: `MongoDB` classini Yaratish

1. **`MongoDB` classini yaratish:**
   - `Database` classidan meros oluvchi (`extends`) `MongoDB` classini yarating.
   - `MongoDB` classida `Database` classidagi metodlarni amalga oshiring (`override`).
   - Ma'lumotlarni saqlash uchun xususiy massivdan (`private items: T[] = []`) foydalaning.

#### Task 3: `SQLDB` classini Yaratish

1. **`SQLDB` classini yaratish:**
   - `Database` classidan meros oluvchi (`extends`) `SQLDB` classini yarating.
   - `SQLDB` classida `Database` classidagi metodlarni amalga oshiring (`override`).
   - Ma'lumotlarni saqlash uchun xususiy massivdan (`private items: T[] = []`) foydalaning.

### Full Example

**Full Code Example:**

```typescript
// Task : MongoDB class

// Examples of using the classes
const mongoDb = new MongoDB<any>();
mongoDb.connect();
mongoDb.create({ name: "Ali", age: 30 });
console.log(mongoDb.read());
mongoDb.update(0, { name: "Vali", age: 25 });
console.log(mongoDb.read());
mongoDb.delete(0);
console.log(mongoDb.read());
mongoDb.disconnect();

const sqlDb = new SQLDB<any>();
sqlDb.connect();
sqlDb.create({ name: "Hasan", age: 40 });
console.log(sqlDb.read());
sqlDb.update(0, { name: "Husan", age: 35 });
console.log(sqlDb.read());
sqlDb.delete(0);
console.log(sqlDb.read());
sqlDb.disconnect();
```