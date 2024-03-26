// @ts-ignore
import {runExample} from './runExample';

const example = 'single_command';

describe(example, () => {
  describe("missing argument", () => {
    it("should display usage help",  async () => {
      const {stderr} = await runExample(example, '');
      expect(stderr).toContain(`Not enough non-option arguments: got 0, need at least 1`);
      expect(stderr).toContain(`index.ts hello <name>`);
      expect(stderr).toMatch(/Positionals:\s+name/m);
      expect(stderr).toMatch(/--yell\s+Print the greeting in upper case/);
    });
  })
  describe("with name argument", () => {
    it("should say hello",  async () => {
      const {stdout} = await runExample(example, 'John');
      expect(stdout).toContain('Hello, John!');
    });
    describe("with yell option", () => {
      it("should say hello loudly",  async () => {
        const {stdout} = await runExample(example, 'John --yell');
        expect(stdout).toContain('HELLO, JOHN!');
      });
    })
  })
});
