---
title: Simple Commands
nav_order: 2
parent: Guide
---
## Prerequisites

Ensure that you have TypeScript 4.0 or later installed, with `experimentalDecorators` enabled in your `tsconfig.json`.

## Installation

First, install the TS Click library via npm or yarn:

```bash
npm install ts-click
# or
yarn add ts-click
```

## Introducing Decorators
In TS Click, we use decorators to define our CLI behavior. In the simplest scenario, we only need a `@Command` decorator on a method to get started. 
- `@Command`: This decorator is used to define a command (some action or operation) either within a group or by itself. 


## Creating a Simple Command

In TS Click, commands are defined as methods in a class, decorated with the `@Command` decorator. Here's an example of a simple command that prints "Hello!" to the console:

```typescript
import {Command, run} from "ts-click";

class DoesntMatter {
  @Command({description: 'Say hello', isDefault: true})
  public hello() {
    console.log(`Hello!`);
  }
}

run()
```

In this example, the `DoesntMatter` class has a single method `hello`, which is decorated with `@Command`. By the way, the class is named `DoesntMatter` in this example because the class name does not have any significance for the ts-click library. The `description` option provides a brief description of what the command does, and `isDefault: true` makes this command the default command that runs when no specific command is provided.

The `run()` function is called at the end to start the CLI. Note that in this simple example, `run()` is being included and executed in the same file as the class with the command definition because we are making a singular command tool which will be executed directly. If we were making a more complex CLI with multiple commands or groups of commands, `run()` would typically be imported and executed in a separate entry file (e.g., `index.ts`) after importing the files that have commands defined in them. This allows for a more modular and organized structure for larger CLI applications.


## Running the CLI

You can run the CLI using any TypeScript runtime, such as `ts-node`, or you can compile the TypeScript to JavaScript and then run the JavaScript directly with `node`.

Here's how you can do it with `ts-node`:

```bash
ts-node path/to/your/file.ts
```

This will print "Hello!" to the console.

If you prefer to compile your TypeScript to JavaScript first, you can do so using the TypeScript compiler (`tsc`). After compiling, you can run the resulting JavaScript file with `node`:

```bash
tsc path/to/your/file.ts
node path/to/your/file.js
```

That's it! You've created a CLI with multiple commands using TS Click. 

In the subsequent sections, we will delve into how you can leverage ts-click to develop more intricate command-line interfaces.
