import {Command, run} from "../../src";

// @ts-ignore
class DoesntMatter {
  @Command({description: 'Say hello', isDefault: true})
  public hello() {
    console.log(`Hello!`);
  }
}

run()

