# Complete TypeScript Learning Guide

TypeScript is a powerful programming language developed by Microsoft that builds on JavaScript by adding static type definitions. This guide will take you from beginner to advanced TypeScript concepts with detailed explanations and practical examples.

## Introduction to TypeScript

### What is TypeScript and why use it?

TypeScript is a superset of JavaScript that adds static typing to the language. This means you can catch errors at compile time rather than runtime, making your code more reliable and easier to maintain.

**Benefits of TypeScript:**

- **Type Safety**: Catch errors before your code runs
- **Better IDE Support**: Enhanced autocomplete, refactoring, and navigation
- **Self-Documenting Code**: Types serve as inline documentation
- **Easier Refactoring**: Confident code changes across large codebases
- **Modern JavaScript Features**: Use latest ECMAScript features with backward compatibility

```typescript
// JavaScript - potential runtime error
function greet(name) {
  return 'Hello, ' + name.toUpperCase();
}
greet(123); // Runtime error: name.toUpperCase is not a function

// TypeScript - compile-time error prevention
function greet(name: string): string {
  return 'Hello, ' + name.toUpperCase();
}
greet(123); // Compile error: Argument of type 'number' is not assignable to parameter of type 'string'
```

### Setting up the environment

To start using TypeScript, you need Node.js and the TypeScript compiler installed on your system.

```bash
# Install Node.js first (from nodejs.org)
# Then install TypeScript globally
npm install -g typescript

# Verify installation
tsc --version

# Create a new project
mkdir my-typescript-project
cd my-typescript-project
npm init -y

# Install TypeScript as a dev dependency (recommended for projects)
npm install -D typescript @types/node

# Initialize TypeScript configuration
tsc --init
```

### Understanding `.ts` vs `.js`

TypeScript files use the `.ts` extension and must be compiled to JavaScript before they can be run in browsers or Node.js environments.

```bash
# Compile TypeScript to JavaScript
tsc app.ts          # Creates app.js
tsc app.ts --watch  # Watch for changes and auto-compile
tsc                 # Compile all TypeScript files in project
```

**File structure example:**

```
src/
  ├── app.ts        # TypeScript source
  ├── utils.ts      # TypeScript source
dist/
  ├── app.js        # Compiled JavaScript
  ├── utils.js      # Compiled JavaScript
```

## Basic Types

TypeScript provides several fundamental types that form the building blocks of more complex type definitions.

### Primitive Types: string, number, boolean

These are the most basic types in TypeScript, corresponding to JavaScript's primitive types.

```typescript
// String type - for text data
let firstName: string = 'John';
let lastName: string = 'Doe';
let fullName: string = `${firstName} ${lastName}`; // Template literals work too

// Number type - for numeric data (integers and floating-point)
let age: number = 30;
let height: number = 5.9;
let hexValue: number = 0xf00d; // Hexadecimal
let binaryValue: number = 0b1010; // Binary
let octalValue: number = 0o744; // Octal

// Boolean type - for true/false values
let isActive: boolean = true;
let isComplete: boolean = false;
let isValid: boolean = age > 18; // Expression result
```

### Special Types: null, undefined, any, unknown, void

These types handle special cases and provide flexibility when needed.

```typescript
// null and undefined - represent absence of value
let emptyValue: null = null;
let notAssigned: undefined = undefined;

// any - disables type checking (use sparingly!)
let flexible: any = 'Could be anything';
flexible = 42;
flexible = true;
flexible.foo.bar; // No type checking - dangerous!

// unknown - type-safe alternative to any
let unknownValue: unknown = 10;
// unknownValue.toFixed(); // Error: Object is of type 'unknown'

// Type checking required before use
if (typeof unknownValue === 'number') {
  unknownValue.toFixed(2); // Now it's safe
}

// void - represents absence of return value
function logMessage(message: string): void {
  console.log(message);
  // No return statement, or return; without value
}

// never - represents values that never occur
function throwError(message: string): never {
  throw new Error(message);
  // This function never returns normally
}
```

### Type Inference

TypeScript can automatically infer types based on the assigned values, reducing the need for explicit type annotations.

```typescript
// TypeScript infers the type based on the initial value
let city = 'New York'; // Inferred as string
let population = 8_400_000; // Inferred as number
let isCapital = false; // Inferred as boolean

// Type inference works with complex expressions too
let area = Math.PI * 5 * 5; // Inferred as number
let greeting = `Welcome to ${city}`; // Inferred as string

// Function return types can be inferred
function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}

// Best practice: Use inference when types are obvious,
// explicit types when they add clarity
```

## Objects and Arrays

TypeScript provides powerful ways to type objects and arrays, ensuring data structure consistency.

### Object Types

Objects are typed by describing their shape - what properties they have and what types those properties are.

```typescript
// Inline object type
let person: { name: string; age: number; isEmployed: boolean } = {
  name: 'Alice',
  age: 30,
  isEmployed: true,
};

// Optional properties with ?
let partialPerson: { name: string; age?: number } = {
  name: 'Bob',
  // age is optional, so this is valid
};

// Readonly properties
let config: { readonly apiUrl: string; timeout: number } = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
};
// config.apiUrl = "new url"; // Error: Cannot assign to readonly property

// Index signatures for dynamic properties
let scores: { [subject: string]: number } = {
  math: 95,
  science: 87,
  english: 92,
};
scores.history = 89; // Valid - any string key with number value
```

### Array Types

Arrays in TypeScript can be typed in multiple ways, providing flexibility for different use cases.

```typescript
// Array of numbers - two equivalent syntaxes
let numbers1: number[] = [1, 2, 3, 4, 5];
let numbers2: Array<number> = [1, 2, 3, 4, 5];

// Array of strings
let fruits: string[] = ['apple', 'banana', 'orange'];

// Array of objects
let users: { name: string; id: number }[] = [
  { name: 'Alice', id: 1 },
  { name: 'Bob', id: 2 },
];

// Mixed type arrays (union types)
let mixed: (string | number)[] = ['hello', 42, 'world', 99];

// Multidimensional arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
```

### Tuples and Readonly Arrays

Tuples allow you to express arrays with fixed length and specific types for each position.

```typescript
// Tuple - fixed length array with specific types at each position
let coordinate: [number, number] = [10, 20];
let person: [string, number, boolean] = ['Alice', 30, true];

// Accessing tuple elements
let x = coordinate[0]; // Type: number
let y = coordinate[1]; // Type: number
// let z = coordinate[2]; // Error: Tuple type has no element at index '2'

// Optional tuple elements
let optionalTuple: [string, number?] = ['hello'];
optionalTuple = ['hello', 42]; // Both are valid

// Rest elements in tuples
let restTuple: [string, ...number[]] = ['prefix', 1, 2, 3, 4];

// Readonly arrays - cannot be modified after creation
let readonlyNumbers: readonly number[] = [1, 2, 3];
let readonlyTuple: readonly [string, number] = ['hello', 42];

// readonlyNumbers.push(4); // Error: Property 'push' does not exist
// readonlyNumbers[0] = 5;  // Error: Index signature only permits reading
```

## Functions

Functions are first-class citizens in TypeScript, with comprehensive typing support for parameters, return values, and more.

### Function Type Annotations

TypeScript allows you to specify types for function parameters and return values, making your functions more predictable and safe.

```typescript
// Basic function with typed parameters and return type
function add(a: number, b: number): number {
  return a + b;
}

// Function expression with type annotation
const multiply = function (x: number, y: number): number {
  return x * y;
};

// Arrow function with types
const divide = (x: number, y: number): number => x / y;

// Function that returns void (no return value)
function logResult(result: number): void {
  console.log(`The result is: ${result}`);
}

// Function type as a variable type
let mathOperation: (a: number, b: number) => number;
mathOperation = add; // Valid
mathOperation = multiply; // Valid
// mathOperation = logResult; // Error: return type doesn't match
```

### Optional and Default Parameters

TypeScript supports optional parameters and default values, providing flexibility in function calls.

```typescript
// Optional parameters (marked with ?)
function greet(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}`;
  }
  return `Hello, ${name}`;
}

greet('Alice'); // "Hello, Alice"
greet('Bob', 'Dr.'); // "Hello, Dr. Bob"

// Default parameters
function createUser(name: string, role: string = 'user', isActive: boolean = true) {
  return {
    name,
    role,
    isActive,
  };
}

createUser('Alice'); // role: "user", isActive: true
createUser('Bob', 'admin'); // role: "admin", isActive: true
createUser('Charlie', 'user', false); // role: "user", isActive: false

// Optional parameters must come after required ones
// function invalid(optional?: string, required: string) {} // Error!
```

### Rest Parameters

Rest parameters allow functions to accept a variable number of arguments as an array.

```typescript
// Rest parameters - accepts any number of arguments
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // 6
sum(10, 20, 30, 40); // 100
sum(); // 0

// Rest parameters with other parameters
function introduce(greeting: string, ...names: string[]): string {
  return `${greeting} ${names.join(', ')}!`;
}

introduce('Hello', 'Alice', 'Bob', 'Charlie');
// "Hello Alice, Bob, Charlie!"

// Rest parameters in function types
type Logger = (level: string, ...messages: string[]) => void;

const consoleLogger: Logger = (level, ...messages) => {
  console.log(`[${level}]`, ...messages);
};
```

### Function Overloading

Function overloading allows you to define multiple function signatures for the same function name.

```typescript
// Function overloads - multiple signatures for the same function
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: boolean, b: boolean): boolean;

// Implementation signature (must be compatible with all overloads)
function combine(a: any, b: any): any {
  return a + b;
}

// Usage
let result1 = combine('Hello, ', 'World'); // string
let result2 = combine(5, 10); // number
let result3 = combine(true, false); // boolean
// let result4 = combine("Hello", 5);       // Error: No matching overload

// Real-world example: DOM element selection
function getElementById(id: string): HTMLElement | null;
function getElementById(id: string, parent: Document): HTMLElement | null;
function getElementById(id: string, parent: HTMLElement): HTMLElement | null;

function getElementById(id: string, parent: Document | HTMLElement = document): HTMLElement | null {
  return parent.getElementById ? parent.getElementById(id) : null;
}
```

## Union and Intersection Types

TypeScript's union and intersection types provide powerful ways to combine and work with multiple types.

### Union Types (|)

Union types allow a value to be one of several types, providing flexibility while maintaining type safety.

```typescript
// Basic union types
let id: string | number;
id = 'ABC123'; // Valid
id = 12345; // Valid
// id = true;     // Error: boolean is not assignable

// Union types with functions
function printId(id: string | number): void {
  console.log(`ID: ${id}`);
}

printId('ABC123'); // Works
printId(12345); // Works

// Union types in arrays
let mixedArray: (string | number)[] = ['hello', 42, 'world', 99];

// Union types with objects
type LoadingState = {
  state: 'loading';
};

type SuccessState = {
  state: 'success';
  data: any;
};

type ErrorState = {
  state: 'error';
  error: string;
};

type AppState = LoadingState | SuccessState | ErrorState;

// Usage with type guards
function handleState(state: AppState) {
  switch (state.state) {
    case 'loading':
      console.log('Loading...');
      break;
    case 'success':
      console.log('Data:', state.data); // TypeScript knows state.data exists
      break;
    case 'error':
      console.log('Error:', state.error); // TypeScript knows state.error exists
      break;
  }
}
```

### Intersection Types (&)

Intersection types combine multiple types into one, requiring the value to satisfy all combined types.

```typescript
// Basic intersection types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  id: number;
  department: string;
};

// Intersection - must have ALL properties from both types
type Staff = Person & Employee;

let employee: Staff = {
  name: 'Alice',
  age: 30,
  id: 1001,
  department: 'Engineering',
  // Must include all properties from both Person and Employee
};

// Intersection with methods
type Loggable = {
  log(): void;
};

type Serializable = {
  serialize(): string;
};

type LoggableSerializable = Loggable & Serializable;

class DataProcessor implements LoggableSerializable {
  log(): void {
    console.log('Processing data...');
  }

  serialize(): string {
    return JSON.stringify(this);
  }
}
```

### Type Narrowing

Type narrowing is the process of refining union types to more specific types within conditional blocks.

```typescript
// Type narrowing with typeof
function processValue(value: string | number): string {
  if (typeof value === 'string') {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

// Type narrowing with instanceof
class Dog {
  bark(): void {
    console.log('Woof!');
  }
}

class Cat {
  meow(): void {
    console.log('Meow!');
  }
}

function makeSound(animal: Dog | Cat): void {
  if (animal instanceof Dog) {
    animal.bark(); // TypeScript knows animal is Dog
  } else {
    animal.meow(); // TypeScript knows animal is Cat
  }
}

// Type narrowing with 'in' operator
type Fish = { swim(): void };
type Bird = { fly(): void };

function move(animal: Fish | Bird): void {
  if ('swim' in animal) {
    animal.swim(); // TypeScript knows animal is Fish
  } else {
    animal.fly(); // TypeScript knows animal is Bird
  }
}

// Discriminated unions (tagged unions)
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      // Exhaustiveness checking
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

## Type Aliases and Interfaces

Type aliases and interfaces are two ways to define custom types in TypeScript, each with their own strengths and use cases.

### Defining Type Aliases

Type aliases create new names for existing types, making complex types more readable and reusable.

```typescript
// Basic type aliases
type ID = string | number;
type UserRole = 'admin' | 'user' | 'guest';

// Object type aliases
type Point = {
  x: number;
  y: number;
};

type User = {
  id: ID;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

// Function type aliases
type EventHandler = (event: string, data: any) => void;
type Validator = (value: string) => boolean;

// Generic type aliases
type Container<T> = {
  value: T;
  isEmpty: boolean;
};

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// Union type aliases
type Status = 'pending' | 'completed' | 'failed';
type Theme = 'light' | 'dark' | 'auto';

// Usage examples
let userPoint: Point = { x: 10, y: 20 };
let currentUser: User = {
  id: 'user_123',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'admin',
  isActive: true,
};

let apiResult: ApiResponse<User[]> = {
  data: [currentUser],
  status: 200,
  message: 'Success',
};
```

### Creating and Extending Interfaces

Interfaces define contracts for object shapes and can be extended to create more specific types.

```typescript
// Basic interface
interface Person {
  readonly id: number; // readonly property
  name: string;
  age: number;
  email?: string; // optional property
}

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

// Extending interfaces
interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
  startDate: Date;
}

interface Manager extends Employee {
  teamSize: number;
  directReports: Employee[];
  budget: number;
}

// Multiple inheritance
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Versioned {
  version: number;
}

interface Document extends Timestamped, Versioned {
  title: string;
  content: string;
  author: string;
}

// Interface merging (declaration merging)
interface Window {
  customProperty: string;
}

interface Window {
  anotherCustomProperty: number;
}

// Now Window has both properties
// window.customProperty and window.anotherCustomProperty
```

### Interface vs Type Alias Differences

Understanding when to use interfaces vs type aliases helps you make better design decisions.

```typescript
// Interfaces are better for object shapes that might be extended
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

// Type aliases are better for unions, primitives, and computed types
type Pet = Dog | Cat | Bird;
type EventMap = {
  [K in keyof HTMLElementEventMap]: (event: HTMLElementEventMap[K]) => void;
};

// Interfaces can be reopened (declaration merging)
interface User {
  name: string;
}

interface User {
  age: number; // This merges with the above
}

// Type aliases cannot be reopened
type UserType = {
  name: string;
};

// type UserType = {  // Error: Duplicate identifier
//     age: number;
// };

// Interfaces can only describe object shapes
interface Config {
  apiUrl: string;
  timeout: number;
}

// Type aliases can describe any type
type StringOrNumber = string | number;
type ConfigType = {
  apiUrl: string;
  timeout: number;
};

// Both are equivalent for object types
let config1: Config = { apiUrl: '...', timeout: 5000 };
let config2: ConfigType = { apiUrl: '...', timeout: 5000 };

/**
 * Best Practices:
 * - Use interfaces for object shapes that might be extended
 * - Use type aliases for unions, intersections, primitives, and computed types
 * - Use interfaces for public APIs that others might extend
 * - Use type aliases for internal implementation details
 */
```

This comprehensive guide covers the fundamental concepts of TypeScript with detailed explanations and practical examples. Each section builds upon the previous ones, providing a solid foundation for understanding TypeScript's type system and its practical applications in real-world development.
