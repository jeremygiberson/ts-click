---
title: index.ts
nav_order: 1
parent: Modules
---

## index overview

Added in v0.1.0

---

<h2 class="text-delta">Table of contents</h2>

- [Decorator](#decorator)
  - [Argument](#argument)
  - [Command](#command)
  - [Group](#group)
  - [Option](#option)
- [Entry Point](#entry-point)
  - [run](#run)

---

# Decorator

## Argument

Argument decorator
Identifies a method parameter as an argument (positional option) for the command.

**Signature**

```ts
export declare const Argument: (
  name: string,
  options?: (yargs.PositionalOptions & { required?: boolean | undefined }) | undefined
) => ParameterDecorator
```

Added in v0.1.0

## Command

Command decorator
Identifies a class method as a command (or subcommand) for the CLI

**Signature**

```ts
export declare const Command: ({ name, description, isDefault }?: CommandDecoratorParams) => MethodDecorator
```

Added in v0.1.0

## Group

Group decorator
Identifies a class as a group of commands

**Signature**

```ts
export declare const Group: (name: string, options?: { description?: string | undefined } | undefined) => ClassDecorator
```

Added in v0.1.0

## Option

Option decorator
Identifies a method parameter as an option for the command.

**Signature**

```ts
export declare const Option: (
  name: string,
  options?:
    | Pick<
        yargs.Options,
        | 'string'
        | 'number'
        | 'boolean'
        | 'description'
        | 'alias'
        | 'array'
        | 'choices'
        | 'coerce'
        | 'config'
        | 'configParser'
        | 'conflicts'
        | 'count'
        | 'default'
        | 'defaultDescription'
        | 'demand'
        | 'deprecate'
        | 'deprecated'
        | 'demandOption'
        | 'desc'
        | 'describe'
        | 'global'
        | 'group'
        | 'hidden'
        | 'implies'
        | 'nargs'
        | 'normalize'
        | 'require'
        | 'required'
        | 'requiresArg'
        | 'skipValidation'
        | 'type'
      >
    | undefined
) => ParameterDecorator
```

Added in v0.1.0

# Entry Point

## run

Run the CLI
Run is effectively the main entry point for the CLI. It will parse the command line arguments and execute the appropriate command.

**Signature**

```ts
export declare const run: () => { [x: string]: unknown; _: (string | number)[]; $0: string }
```

Added in v0.1.0
