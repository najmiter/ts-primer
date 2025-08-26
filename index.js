// const digit = 123;
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// string, boolean, number
// let digit: number = 123;
// digit = 345;
// let str = 'thi s';
// str = 23;
// type Person = {
//   name: string;
//   age: number;
// };
// const person: Person = {
//   age: 90,
//   name: 'najmiter',
// };
// interface IPerson {
//   name: string;
//   age: number;
//   talk: () => void;
// }
// const person2: IPerson = {
//   name: 'CodeMite',
//   age: -90,
//   talk(): void {
//     console.log('I am talking');
//   },
// };
// person2.talk();
// function doSomething(takes: string): string {
//   return takes;
// }
// const doSomething2 = (takes: string): string => {
//   return takes;
// };
// type Number = number;
// type VoidFunc = (a: number, b: string) => void;
// type Product = {
//   // func: (a: number, b: string) => void;
//   func: VoidFunc;
// };
// const numbers: Product[] = [];
// numbers.push({
//   func(a, b) {},
// });
// const tuple: readonly [number, boolean, string] = [1, false, ''];
// const Colors = {
//   BLUE: '#0000ff'
// }
// enum Colors {
//   RED = '#ff0000',
//   GREEN = '#00ff00',
//   BLUE = '#0000ff',
// }
// let color: Colors = Colors.BLUE; // 'BLUE'
// color = 'sadfsf';
// const Colours = {
//   RED: '#ff0000',
//   GREEN: '#00ff00',
//   BLUE: '#0000ff',
// } as const;
// type Color = keyof (typeof Colours);
// function doColor(color: Color) {
//   Colours[color];
// }
// doColor('BLUE');
// type StringNumber = string | number;
// let value: StringNumber = 123;
// value = 'string';
// value = 234;
// interface IPerson2 {
//   name: string;
// }
// interface IPerson {
//   name: string;
// }
// type Person = {
//   name: string;
// };
// type Person2 = {
//   name: string;
// };
// interface IEmployee extends IPerson, IPerson2 {
//   id: string;
// }
// type Employee = Person &
//   Person2 & {
//     id: string;
//   };
// const empl: IEmployee = {
//   name: '',
//   id: '',
// };
// const empl2: Employee = {
//   name: '',
//   id: '',
// };
// class Person {
//   // name: string;
//   constructor(
//     public name: string,
//     public age: number
//   ) {
//     // this.name = name;
//   }
//   private getName() {
//     return this.name;
//   }
// }
// const person = new Person('najmiter', 90);
// function whoAmI<T>(take: T): T {
//   return take;
// }
// let value = whoAmI(123);
// let value2 = whoAmI('123');
// let value3 = whoAmI(false);
// let value4 = whoAmI({ id: '' });
// type PaginatedRespons<T> = {
//   docs: T[];
//   totalDocs: number;
//   hasNextPage: boolean;
// };
// interface IPaginatedResponse<T> {
//   docs: T[];
//   totalDocs: number;
//   hasNextPage: boolean;
// }
// interface IUser {
//   username: string;
// }
// interface IProduct {
//   id: string;
// }
// const user: IPaginatedResponse<IUser> = {
//   hasNextPage: false,
//   totalDocs: 10,
//   docs: [
//     {
//       username: '',
//     },
//   ],
// };
// const product: IPaginatedResponse<IProduct> = {
//   hasNextPage: false,
//   totalDocs: 10,
//   docs: [
//     {
//       id: '',
//     },
//   ],
// };
// const tryCatchAsync = async <T, V = Error>(fn: () => Promise<T>): Promise<{ data: T | null; error: V | null }> => {
//   try {
//     const data = await fn();
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error };
//   }
// };
// const { data, error } = await tryCatchAsync(async () => {
//   return 123;
// });
// if (error) throw error;
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function square(target, propertyKey, originalMethod) {
    var original = originalMethod.value;
    originalMethod.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return original(args.flat().map(function (n) { return Math.pow(n, 2); }));
    };
}
var Ryazi = /** @class */ (function () {
    function Ryazi() {
    }
    Ryazi.modifyNumbers = function (numbers) {
        return numbers.map(function (n) { return n / 2; });
    };
    __decorate([
        square
    ], Ryazi, "modifyNumbers", null);
    Ryazi = __decorate([
        sealed
    ], Ryazi);
    return Ryazi;
}());
console.log(Ryazi.modifyNumbers([2, 3, 4])); // [4, 9, 16] => [2, 4.5, 8]
