function uppercase(method: Function) {
  return function (this: any, ...args: string[]) {
    const upper = args.map(s => String(s.toUpperCase()));
    return method.call(this, ...upper);
  };
}

class Greeter {
  @uppercase
  greetUser(name: string): string {
    return `Hello, ${name}!`;
  }

  @uppercase
  greeatWithTitle(title: string, name: string): string {
    return `Hello, ${title} ${name}.`;
  }
}

const greeter = new Greeter();
console.log(greeter.greetUser("Dan"));
console.log(greeter.greeatWithTitle("Mr.", "Daniel"));

class Messenger {
  @repeat(3)
  sayHello(name: string): string {
    return `Hello ${name}!`;
  }

  @repeat(1)
  sayBye(name: string): string {
    return `Bye ${name}!`;
  }
}

// Should work like:
const msg = new Messenger();
console.log(msg.sayHello("Alice")); // "Hello Alice! Hello Alice! Hello Alice!"
console.log(msg.sayBye("Bob"));     // "Bye Bob!"

function repeat(times: number) {        // Level 1: Decorator factory
  return function (method: Function) {  // Level 2: Method decorator
    return function (this: any, ...args: any[]) {  // Level 3: Wrapped method
      let result = '';
      for (let i = 0; i < times; i++) {
        result += method.apply(this, args);
        if (i < times - 1) result += ' '; // Add space between repetitions
      }
      return result;
    };
  };
}
