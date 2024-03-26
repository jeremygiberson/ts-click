---
title: TS Click
nav_order: 1
---

# TS Click
TS Click is heavily inspired by the original [Click](https://click.palletsprojects.com/en/8.1.x/) library for Python.

It aims tp provide a similar experience to writing CLIs as the original library, in the TypeScript ecosystem.

Under the hood the library uses [yargs](https://yargs.js.org/) to parse the arguments and options.

TS Click in three points:
* Typesafe decorators for defining commands, arguments, and options
* CLI definitions are co-located with the class/method/arguments that implements the command
* Leverages the existing (mature and robust) yargs library for familiarity and functionality

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

And here's the same example using ts-click, note the additional type safety and the co-location of the command argument and option definitions.
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

In such a simple example, the difference is not that big, but as the complexity of the CLI grows, the benefits of ts-click become more apparent.

