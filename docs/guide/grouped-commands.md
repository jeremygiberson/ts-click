---
title: Grouped Commands
nav_order: 3
parent: Guide
---
# Grouped Commands with TS Click

This guide will walk you through the process of creating a command-line interface (CLI) with grouped commands using the TS Click library. Grouped commands allow you to organize related commands under a common group (ie command), providing a more structured and intuitive CLI.

## Introducing Decorators
We've already seen the `@Command`, `@Argument`, and `@Option` decorators in action. In this example, we'll introduce a new decorator `@Group` to define a group of related commands.
- `@Group`: This decorator is used to define a group of related commands. It takes two arguments: the name of the group and an options object. The name of the group is the parent command the commands will be grouped under. The options object can include a `description` property to provide a brief description of the group.
- `@Command`: This decorator is used to define a command within a group or standalone. It takes an options object as an argument, which can include a `description` property to provide a brief description of the command.
- `@Argument`: This decorator is used to define an argument for a command. It takes the name of the argument as an argument.
- `@Option`: This decorator is used to define an option for a command. It takes two arguments: the name of the option and an options object. The options object can include properties like `default`, `type`, and `description`.

## Creating Grouped Commands

In TS Click, grouped commands are defined as methods in a class, decorated with the `@Command` decorator, and the class itself is decorated with the `@Group` decorator. Here's an example of a group of commands that print a greeting or a farewell to the console:

```typescript
// file greeter.ts
import {Argument, Command, Group, Option, run} from "../../src";

@Group('greeter', {description: 'Provides salutation commands'})
// @ts-ignore
class DoesntMatter {
  @Command({description: 'Print a greeting'})
  public hello(@Argument('name') name: string,
               @Option('yell', {default: false, type: 'boolean', description: 'Print the greeting in upper case'}) yell: boolean) {
    const greeting = `Hello, ${name}!`;
    console.log(yell ? greeting.toUpperCase() : greeting);
  }

  @Command({description: 'Print a farewell'})
  public goodbye(@Argument('name') name: string,
                 @Option('yell', {default: false, type: 'boolean', description: 'Print the farewell in upper case'}) yell: boolean) {
    const greeting = `Goodbye, ${name}!`;
    console.log(yell ? greeting.toUpperCase() : greeting);
  }
}
```

In this example, the `DoesntMatter` class has two methods `hello` and `goodbye`, each decorated with `@Command`. The class itself is decorated with `@Group`, indicating that the commands within this class are part of the 'greeter' group. The `description` option for each command provides a brief description of what the command does.

Note the lack of the `run()` included in this example. That's because we are not going to use the file `greeter.ts` as the entry point. Instead create another file, say `index.ts`, and import the `greeter.ts` file and call `run()` in that file. This allows for a more modular and organized structure for larger CLI applications.

```typescript
// file index.ts
import {run} from "ts-click"
import "./greeter"
run();
```

Here, `index.ts` serves as the entry point for our CLI application. As we introduce more commands or groups of commands, we can import them into `index.ts` to make them available.

## Running the CLI

Running the cli is the same as before, but now we run the `index.ts` file instead of the `greeter.ts` file. Here's how you can do it with `ts-node`:

```bash
ts-node path/to/your/file.ts hello John
```

This will print "Hello, John!" to the console.

## Up next
We'll build on this example in the next section and introduce another set of grouped commands.
