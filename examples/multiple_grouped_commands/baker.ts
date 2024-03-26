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

run()

