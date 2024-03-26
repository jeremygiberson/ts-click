import {Argument, Command, Option, run} from "../../src";

// @ts-ignore
class DoesntMatter {
  @Command({description: 'Print a greeting', isDefault: true})
  public hello(@Argument('name') name: string,
               @Option('yell', {default: false, type: 'boolean', description: 'Print the greeting in upper case'}) yell: boolean) {
    const greeting = `Hello, ${name}!`;
    console.log(yell ? greeting.toUpperCase() : greeting);
  }
}

run()

