# A Practical Guide to TypeScript

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. This guide provides a comprehensive overview of TypeScript, from fundamental concepts to advanced features, with clear explanations and practical examples.

## 1. Introduction to TypeScript

### What is TypeScript and Why Use It?

TypeScript is a superset of JavaScript that adds static types. By understanding your code's types, TypeScript can catch errors early in development, provide rich autocompletion, and make your codebase more readable and maintainable.

**Key Benefits:**

- **Static Type Checking**: Catch errors before you run your code.
- **Improved IDE Support**: Superior autocompletion, navigation, and refactoring.
- **Predictable Code**: Types make code behavior easier to reason about.
- **Modern JavaScript**: Use the latest JavaScript features and compile them to run on any platform.

```typescript
// JavaScript - A common runtime error
function printName(name) {
  console.log('Hello, ' + name.toUpperCase());
}
printName(42); // 💥 Throws a runtime error: name.toUpperCase is not a function

// TypeScript - The error is caught during development
function printNameTS(name: string): void {
  console.log('Hello, ' + name.toUpperCase());
}
printNameTS(42); // 🚨 Compile-time error: Argument of type 'number' is not assignable to parameter of type 'string'.
```

### Setting Up Your Environment

To get started, you need Node.js. Then, you can install TypeScript globally or as a project dependency.

```bash
# 1. Install Node.js from nodejs.org

# 2. Install TypeScript globally (for access to the `tsc` command anywhere)
npm install -g typescript

# 3. Verify the installation
tsc --version

# 4. Set up a new project
mkdir my-ts-project
cd my-ts-project
npm init -y
npm install typescript --save-dev

# 5. Create a TypeScript configuration file
tsc --init # This creates a tsconfig.json file
```

### Understanding `tsconfig.json`

The `tsconfig.json` file specifies the root files and the compiler options required to compile a TypeScript project. Key options include:

- `target`: The JavaScript version to compile to (e.g., `"ES2016"`).
- `module`: The module system to use (e.g., `"CommonJS"`).
- `strict`: Enables all strict type-checking options.
- `outDir`: The directory where compiled JavaScript files will be placed.
- `rootDir`: The directory containing your TypeScript source files.

## 2. Fundamental Types

### Primitive Types: `string`, `number`, `boolean`

These are the basic data types that form the foundation of JavaScript and TypeScript.

```typescript
let language: string = 'TypeScript';
let version: number = 4.9;
let isAwesome: boolean = true;
```

### Special Types: `any`, `unknown`, `void`, `null`, `undefined`, `never`

- `any`: Disables type checking. Use it as a last resort.
- `unknown`: A type-safe alternative to `any`. You must perform type checking before using an `unknown` value.
- `void`: Represents the absence of a return value in a function.
- `null` & `undefined`: Represent the absence of a value.
- `never`: Represents a value that will never occur (e.g., a function that always throws an error).

```typescript
let flexible: any = 42;
flexible = 'a string'; // No error

let safe: unknown = 'this is a string';
// console.log(safe.length); // 🚨 Error: Object is of type 'unknown'.
if (typeof safe === 'string') {
  console.log(safe.length); // OK
}

function logMessage(message: string): void {
  console.log(message);
}

function throwError(message: string): never {
  throw new Error(message);
}
```

### Type Inference

TypeScript can often infer the type of a variable from its initial value, so you don't always need to write explicit type annotations.

```typescript
let framework = 'React'; // Inferred as type `string`
let year = 2023; // Inferred as type `number`
```

## 3. Data Structures

### Arrays and Tuples

- **Arrays**: Collections of values of the same type.
- **Tuples**: Arrays with a fixed number of elements and known types for each element.

```typescript
// An array of numbers
let fibonacci: number[] = [1, 1, 2, 3, 5];

// A tuple representing a key-value pair
let entry: [string, number] = ['age', 30];

// Accessing tuple elements with type safety
console.log(entry[0].substring(1)); // OK
// console.log(entry[1].substring(1)); // 🚨 Error: 'substring' does not exist on type 'number'.
```

### Objects

You can define the "shape" of an object using an interface or a type alias.

```typescript
type User = {
  id: number;
  name: string;
  isActive: boolean;
  email?: string; // Optional property
};

let user: User = {
  id: 1,
  name: 'John Doe',
  isActive: true,
};
```

### Enums

Enums allow you to define a set of named constants. They are useful for representing a fixed set of options, like states or roles.

```typescript
enum UserRole {
  Admin, // 0
  Editor, // 1
  Viewer, // 2
}

let role: UserRole = UserRole.Admin;
console.log(role); // 0

// You can also assign string values
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

let move: Direction = Direction.Up;
console.log(move); // "UP"
```

## 4. Functions

TypeScript enhances functions with typed parameters and return values.

```typescript
// Typed parameters and return value
function greet(name: string, greeting: string = 'Hello'): string {
  return `${greeting}, ${name}!`;
}

// Arrow function syntax
const add = (a: number, b: number): number => a + b;

// Function overloading
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === 'string') {
    return value.trim();
  }
  return value.toFixed(2);
}

const formattedString = format('  hello  '); // "hello"
const formattedNumber = format(3.14159); // "3.14"
```

## 5. Object-Oriented Programming with Classes

Classes are a core feature of object-oriented programming. TypeScript adds features like access modifiers and decorators.

### Defining a Class

```typescript
class Product {
  // Properties
  id: number;
  name: string;
  private price: number; // Accessible only within the class

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  // Method
  getProductInfo(): string {
    return `ID: ${this.id}, Name: ${this.name}, Price: $${this.price}`;
  }
}

const product = new Product(1, 'Laptop', 999);
console.log(product.getProductInfo());
// console.log(product.price); // 🚨 Error: Property 'price' is private.
```

### Inheritance

Classes can inherit properties and methods from other classes.

```typescript
class Book extends Product {
  author: string;

  constructor(id: number, name: string, price: number, author: string) {
    super(id, name, price); // Call the parent constructor
    this.author = author;
  }
}

const book = new Book(2, 'The Hobbit', 15, 'J.R.R. Tolkien');
console.log(book.getProductInfo()); // Inherited method
```

## 6. Advanced Type System

### Union and Intersection Types

- **Union (`|`)**: A value can be one of several types.
- **Intersection (`&`)**: A value must have all properties of multiple types.

```typescript
// Union Type
let id: string | number = 'user-123';
id = 456; // OK

// Intersection Type
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type Widget = Draggable & Resizable;

let widget: Widget = {
  drag: () => console.log('Dragging...'),
  resize: () => console.log('Resizing...'),
};
```

### Type Aliases and Interfaces

- **Type Alias**: A name for any type. Can represent primitives, unions, intersections, etc.
- **Interface**: A way to define an object's shape. Can be extended and implemented.

```typescript
// Type Alias for a union
type Status = 'pending' | 'completed' | 'failed';

// Interface for an object shape
interface Person {
  name: string;
  age: number;
}

// Interfaces can be extended
interface Employee extends Person {
  employeeId: string;
}
```

**When to use which?**

- Use `interface` when defining the shape of an object or class that you expect others to implement or extend.
- Use `type` for everything else, especially for union types, intersection types, or when you need to name a primitive type.

### Generics

Generics allow you to write reusable code that can work with multiple types.

```typescript
function createBox<T>(value: T) {
  return { value };
}

let numberBox = createBox(123); // Type of numberBox is { value: number }
let stringBox = createBox('hello'); // Type of stringBox is { value: string }

interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
}

type UserResponse = ApiResponse<User[]>;
```

### Decorators

Decorators are a special kind of declaration that can be attached to a class, method, accessor, property, or parameter. They are an experimental feature and must be enabled in `tsconfig.json` by setting `"experimentalDecorators": true`.

```typescript
// A simple class decorator
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

// A method decorator
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling "${propertyKey}" with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`"${propertyKey}" returned`, result);
    return result;
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);
// Logs:
// Calling "add" with [2, 3]
// "add" returned 5
```

## 7. Modules and Asynchronous Code

### Modules

TypeScript uses ES Modules syntax for importing and exporting code between files.

```typescript
// utils.ts
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// main.ts
import { capitalize } from './utils';

const message = capitalize('hello world');
console.log(message); // "Hello world"
```

### Async/Await

TypeScript provides strong typing for asynchronous operations using Promises.

```typescript
interface User {
  id: number;
  name: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const user: User = await response.json();
  return user;
}

fetchUser(1)
  .then((user) => console.log(user.name))
  .catch((error) => console.error(error.message));
```
