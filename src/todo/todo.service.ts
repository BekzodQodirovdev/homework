import { Injectable } from '@nestjs/common';
import { Todo } from '../interfaces/todo.interface.js';
import { CreateTodoDto } from '../dto/create-todo.dto.js';
import { UpdateTodoDto } from '../dto/update-todo.dto.js';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

@Injectable()
export class TodoService {
  private readonly filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '..', 'db.json');
  }

  private readTodos(): Todo[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data).todos;
  }

  private writeTodos(todos: Todo[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify({ todos }, null, 2));
  }

  findAll(): Todo[] {
    return this.readTodos();
  }

  findOne(id: string): Todo {
    const todos = this.readTodos();
    return todos.find((todo) => todo.id === id);
  }

  create(createTodoDto: CreateTodoDto): Todo {
    const todos = this.readTodos();
    const newTodo: Todo = {
      id: uuidv4(),
      ...createTodoDto,
      completed: false,
    };
    todos.push(newTodo);
    this.writeTodos(todos);
    return newTodo;
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todos = this.readTodos();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return null;
    }

    todos[index] = { ...todos[index], ...updateTodoDto };
    this.writeTodos(todos);
    return todos[index];
  }

  delete(id: string): boolean {
    const todos = this.readTodos();
    const index = todos.findIndex((todo) => todo.id === id);

    if (index === -1) {
      return false;
    }

    todos.splice(index, 1);
    this.writeTodos(todos);
    return true;
  }
}
