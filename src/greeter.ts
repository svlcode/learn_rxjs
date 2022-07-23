export class Greeter {
  constructor(private greeting: string) {

  }
  greet(name: string) {
    console.log(`${this.greeting} ${name}`);
  }
}