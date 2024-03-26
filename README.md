# TS Click
TS Click is heavily inspired by the original [Click](https://click.palletsprojects.com/en/8.1.x/) library for Python.

It aims tp provide a similar experience to writing CLIs as the original library, in the TypeScript ecosystem.

Under the hood the library uses [yargs](https://yargs.js.org/) to parse the arguments and options. 

## Why use ts-click?
IMHO, it provides a cleaner, more intuitive way to write CLIs. I think it results in code that is easier to understand and maintain than using yargs directly.

Here's an example of creating a simple CLI using yargs.
```typescript   
import yargs from 'yargs';
yargs.command('greet <name> [yell]', 'greet someone', (yargs) => {
    yargs.positional('name', {
        type: 'string',
        description: 'the name to greet'
    });
    yargs.option('yell', {
        type: 'boolean',
        description: 'yell the greeting'
    });
}, (argv) => {
    console.log(argv.yell ? `HELLO ${argv.name.toUpperCase()}` : `Hello ${argv.name}`);
}).argv;
```    

And here's the same example using ts-click
```typescript
import { Command, Option, Argument, run } from 'ts-click';
class Greeter {
  @Command({description: 'Print a greeting', isDefault: true})
  public hello(@Argument('name') name: string,
               @Option('yell', {type: 'boolean', description: 'Print the greeting in upper case'}) yell: boolean) {
    const greeting = `Hello, ${name}!`;
    console.log(yell ? greeting.toUpperCase() : greeting);
  }
}

run();
```

## Installation
This library requires TypeScript 4.0 or later, with `experimentalDecorators` enabled in your `tsconfig.json`.

... todo


## Roadmap
- [x] commands
- [x] positional arguments
- [x] options
- [x] subcommands
- [ ] check function
- [ ] command middleware
- [ ] dependency injection for classes?
