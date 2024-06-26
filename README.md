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


## Installation
This library requires TypeScript 4.0 or later, with `experimentalDecorators` enabled in your `tsconfig.json`.

1. Install the library via `npm install ts-click` or `yarn add ts-click`
2. Create a class(es) with the commands, arguments, and options (see examples or docs).
3. Create an entrypoint file that calls `run()` (where run is imported from the library)
   a. the entry point file should include the class or classes where the commands are defined via `import * from "./path/to/commandfile.ts"` imports.
   b. for single command scripts, this can be done in the same file as the command class definition.
4. Run the script with `ts-node` or compile it to JavaScript and run it with `node`

Notes: You can have multiple entry point files if you prefer to split your commands by concern or functionality. 

## Roadmap
- [x] commands
- [x] positional arguments
- [x] options
- [x] subcommands
- [ ] check function
- [ ] command middleware
- [ ] dependency injection for classes?
