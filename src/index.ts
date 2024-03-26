/**
 * @since 0.1.0
 */
import 'reflect-metadata';
import * as yargs from 'yargs';
import {Arguments, InferredOptionTypes} from 'yargs';

const prototypes = new Set<Function>();

interface CommandDecoratorParams {
  name?: string;
  description?: string;
  isDefault?: boolean;
}

const COMMAND_METADATA = Symbol('COMMAND_METADATA');
type CommandMetadata = {
  name: string;
  propertyKey: string;
  description: string;
  isDefault: boolean;
  handler: Function;
  prototype: Function;
}
// @ts-ignore
const GROUP_METADATA = Symbol('GROUP_METADATA');
type GroupMetadata = {
  name: string;
  description: string;
}

// @ts-ignore
const OPTION_METADATA = Symbol('OPTION_METADATA');
type OptionMetadata = {
  propertyKey: string;
  parameterIndex: number;
  name: string;
  options: yargs.Options | yargs.PositionalOptions | undefined;
  positional: boolean;
  required?: boolean;
}

/**
 * Group decorator
 * Identifies a class as a group of commands
 * @param name The name of the group command.
 * @param options {description} A description of the group command, used in the help output.
 *
 * @since 0.1.0
 * @category Decorator
 */
export const Group = (name: string, options?: {description?: string}): ClassDecorator => {
  return (target) => {
    if(!prototypes.has(target.constructor)) {
      prototypes.add(target.constructor);
    }
    // Note: seems odd having to use target.constructor for class metadata, but using target just didn't work)
    const metadata = (Reflect.getMetadata(GROUP_METADATA, target.constructor) || []) as GroupMetadata[];
    metadata.push({
      name,
      description: options?.description || '',
    } as GroupMetadata);
    // Note: target sans .constructor is intentional, though not understood
    Reflect.defineMetadata(GROUP_METADATA, metadata, target);
  }
}

/**
 * Command decorator
 * Identifies a class method as a command (or subcommand) for the CLI
 * @param name The name of the command. If not provided, the method name will be used.
 * @param description A description of the command, used in the help output.
 * @param isDefault If true, this command will be executed if no other command is specified.
 *
 * @since 0.1.0
 * @category Decorator
 */
export const Command = ({name, description, isDefault}: CommandDecoratorParams = {}): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    const commandName = name || String(propertyKey);

    if(!prototypes.has(target.constructor)) {
      prototypes.add(target.constructor);
    }

    const metadata = (Reflect.getMetadata(COMMAND_METADATA, target) || []) as CommandMetadata[];

    // @ts-ignore
    metadata.push({
      name: commandName,
      propertyKey: String(propertyKey),
      description,
      isDefault,
      handler: descriptor.value,
      prototype: target.constructor,
    } as CommandMetadata);

    Reflect.defineMetadata(COMMAND_METADATA, metadata, target);
  }
}

/**
 * Option decorator
 * Identifies a method parameter as an option for the command.
 * @param name The name of the option. If not provided, the parameter name will be used.
 * @param options {alias, array, boolean, choices, coerce, config, configParser, conflicts, count, default, defaultDescription, demandOption, desc, describe, description, global, group, implies, nargs, normalize, number, requiresArg, skipValidation, string, type, implies, requiresArg, skipValidation, hidden, implies, requiresArg, skipValidation, type, demandOption, required} See yargs.Options for details.
 *
 * @since 0.1.0
 * @category Decorator
 */
export const Option = (name: string, options?: Omit<yargs.Options,"name">): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    if(!propertyKey) {
      // not sure if/when this would occur
      return
    }
    const metadata = (Reflect.getMetadata(OPTION_METADATA, target) || []) as OptionMetadata[];
    metadata.push({
      propertyKey: String(propertyKey),
      parameterIndex,
      name,
      options,
      positional: false
    });
    Reflect.defineMetadata(OPTION_METADATA, metadata, target);
  }
}

/**
 * Argument decorator
 * Identifies a method parameter as an argument (positional option) for the command.
 * @param name The name of the argument.
 * @param options {array, boolean, choices, coerce, config, configParser, conflicts, count, default, defaultDescription, demandOption, desc, describe, description, global, group, implies, nargs, normalize, number, requiresArg, skipValidation, string, type, implies, requiresArg, skipValidation, hidden, implies, requiresArg, skipValidation, type, demandOption, required} See yargs.PositionalOptions for details.
 *
 * @since 0.1.0
 * @category Decorator
 */
export const Argument = (name: string, options?: yargs.PositionalOptions & {required?: boolean}): ParameterDecorator => {
  return (target, propertyKey, parameterIndex) => {
    if(!propertyKey) {
      // not sure if/when this would occur
      return
    }
    const metadata = (Reflect.getMetadata(OPTION_METADATA, target) || []) as OptionMetadata[];
    metadata.push({
      propertyKey: String(propertyKey),
      parameterIndex,
      name,
      options: (options || {}) as yargs.PositionalOptions,
      positional: true,
      required: options?.required !== false
    });
    Reflect.defineMetadata(OPTION_METADATA, metadata, target);
  }
}

function registerCommand(instance: Object, command: CommandMetadata, options: OptionMetadata[], _yargs: yargs.Argv<{}> | typeof yargs) {
  const {name, description, handler} = command;
  const commandOptions = options.filter(option => option.propertyKey === command.propertyKey);

  const argsSuffix = commandOptions
    .filter(option => option.positional)
    .map(option => option.required ? `<${option.name}>`: `[${option.name}]`)
    .reverse()
    .join(' ');

  _yargs.command(command.isDefault ? [`$0 ${argsSuffix}`.trim(),`${name} ${argsSuffix}`.trim()] : `${name} ${argsSuffix}`.trim(), description, (_argv) => {
    commandOptions.forEach(option => {
      const {name, options} = option;
      if(option.positional) {
        _argv.positional(name, options as yargs.PositionalOptions);
      } else {
        _argv.option(name, options as yargs.Options);
      }
    });
  }, (argv: Arguments<InferredOptionTypes<any>>) => {
    const args = commandOptions.reverse().map(option => argv[option.name]);
    return handler.call(instance, ...args);
  });
}

/**
 * Run the CLI
 * Run is effectively the main entry point for the CLI. It will parse the command line arguments and execute the appropriate command.
 * @returns {Promise<void>}
 *
 * @since 0.1.0
 * @category Entry Point
 */
export const run = () => {
  // @ts-ignore
  const instances = Array.from(prototypes).map(prototype => new prototype());

  instances.forEach(instance => {
    const commands = (Reflect.getMetadata(COMMAND_METADATA, instance) || []) as CommandMetadata[];
    const options = (Reflect.getMetadata(OPTION_METADATA, instance) || []) as OptionMetadata[];
    // Note: instance.constructor is intentional, though not understood
    const groups = (Reflect.getMetadata(GROUP_METADATA, instance.constructor) || []) as GroupMetadata[];

    if(groups.length) {
      // register commands to each group
      for(const group of groups) {
        yargs.command(group.name, group.description, (_yargs) => {
          commands.forEach(command => {
            registerCommand(instance, command, options, _yargs);
          });
        }, (_) => {
          yargs.showHelp();
        })
      }
    } else {
      // register commands at top level
      commands.forEach(command => {
        registerCommand(instance, command, options, yargs);
      })
    }
  });

  return yargs
    .strict()
    .demandCommand(1, '') // demand at least one command be executed
    .help() // add a help command
    .fail((msg, err, yargs) => { // handle failure
      if (err) {
        console.error(err);
      } else if (msg) {
        console.error(msg);
      }
      yargs.showHelp();
    })
    .parse();
}
//
