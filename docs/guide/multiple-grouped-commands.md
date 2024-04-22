---
title: Multiple Grouped Commands
nav_order: 4
parent: Guide
---
# Multiple Grouped Commands with TS Click
We'll build on the last example and add another group of commands to our CLI.

## Creating Multiple Grouped Commands
In the previous example, we created `greeter.ts` which defined a `greeter` group with subcommands `hello` and `goodbye`, and an entry file `index.ts` to import the greeter group.
We'll continue with that pattern and add another group of commands to our CLI, in a file named `baker.ts`.



```typescript
import {Argument, Command, Group, Option, run} from "../../src";

@Group('baker', {description: 'Provides baked goods'})
// @ts-ignore
class AlsoDoesntMatter {
  @Command({description: "Order a cake"})
  public cake(@Argument('type', {choices: ['funfetti', 'marble', 'yellow']}) type: string,
              @Option('message', {alias: 'm', description: 'A message to write on the cake'}) message?: string) {
    if(message){
      console.log(`I'll get right on that ${type} cake with the message: ${message}!`);
    } else {
      console.log(`I'll get right on that ${type} cake!`);
    }
  }
}
```

In this file, the `AlsoDoesntMatter` class has a single method `cake`, which is decorated with `@Command`. The class itself is decorated with `@Group`, indicating that the commands within this class are part of the `baker` group. The `description` option for the group provides a brief description of what the group does.

In order to use these commands, we need to import the `baker.ts` file into our `index.ts` file, along with the `greeter.ts` file. Here's how you can do it:

```typescript
// file index.ts
import {run} from "ts-click"
import "./greeter"
import "./baker"
run();
```

## Running the CLI

Again, using `ts-node`, you can run the CLI with the `index.ts` file:

```bash
ts-node path/to/your/index.ts greeter hello John
```

This will print "Hello, John!" to the console.

You can also run the `cake` command from the `baker` group:

```bash
ts-node path/to/your/index.ts baker cake funfetti -m "Happy Birthday!"
```

This will print "I'll get right on that funfetti cake with the message: Happy Birthday!" to the console.

## Summary
In this guide, we've walked through the simplest case of creating a CLI with a single command, then expanded to multiple commands, 
and finally to multiple groups of commands. We've seen how to define commands, arguments, and options, and how to organize our code for larger CLI applications.

