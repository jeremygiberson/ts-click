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

run()

