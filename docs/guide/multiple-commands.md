---
title: Multiple Commands
nav_order: 3
parent: Guide
---
# Multiple Commands with TS Click
This guide will walk you through the process of creating a command-line interface (CLI) with multiple commands using the TS Click library. Multiple commands allow you to define different actions that your CLI can perform, providing a more versatile tool.

## Introducing Decorators
As stated earlier, in TS Click, we use decorators to define our CLI behavior. We've already seen the `@Command` decorator in action, we'll introduce a few more decorators in this example:
- `@Command`: This decorator is used to define a command (some action or operation) either within a group or by itself.
- `@Argument`: This decorator is used to define a (positional) argument for a command.
- `@Option`: This decorator is used to define an option for a command.


## Creating Multiple Commands
As we saw in the previous section, we can decorate a method in a class with `@Command` to define a command. To create multiple commands, you can define multiple methods in the same class, each decorated with `@Command`.
Here's an example of a CLI with two commands that print a greeting or a farewell to the console:

```typescript
import {Argument, Command, Option, run} from "ts-click";

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

run()
```

In this example, the `DoesntMatter` class has two methods `hello` and `goodbye`, each decorated with `@Command`. The `description` option for each command provides a brief description of what the command does.

Again, the `run()` function is included and called at the end to start the CLI. We'll look at organizing our code by commands w/ an entry file in the next section. 

## Arguments and Options
In the `hello` and `goodbye` methods, we have defined arguments and options.

### Arguments
Arguments represent positional values that are passed to the command when it is executed. In this case, the `name` argument represents the name of the person to greet or bid farewell to.
Keep in mind that the positional ordering is defined by the order of the arguments in the method signature. Additionally, you may have multiple arguments in a command method.
A final consideration for arguments is that they are required by default. If you want to make an argument optional, you can provide a default value or mark it as optional in the method signature.
The caveat to this is that if you have multiple arguments, the optional argument must come after the required argument(s) in the method signature.

Finally, at present we recommend only at most, **one optional argument per command method** -- as we are unable to infer which optional argument a value is intended for if multiple optional arguments are present and the number of values is less than the number of arguments.

### Options
Options represent named flags or parameters that can be passed to the command. In this case, the `yell` option is a boolean flag that determines whether the greeting or farewell should be printed in uppercase.
The order of options does not matter either when executing the command or in the method parameter definition. Options can be passed in any order, and they can be omitted if they have default values.


## Running the CLI

Using `ts-node` we'll run the CLI with the following command:

```bash
ts-node path/to/your/file.ts hello John
```

This will print "Hello, John!" to the console.

You can also run the `goodbye` command with the following command:

```bash
ts-node path/to/your/file.ts goodbye Jane
```

This will print "Goodbye, Jane!" to the console.


