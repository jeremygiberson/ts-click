// @ts-ignore
import {runExample} from './runExample';

const example = 'multiple_commands';

describe(example, () => {
  describe("command not specified", () => {
    it("should display usage help and list available commands",  async () => {
      const {stderr} = await runExample(example, '');
      expect(stderr).toContain(`index.ts <command>`);
      expect(stderr).toMatch(/index.ts hello <name>\s+Print a greeting/);
      expect(stderr).toMatch(/index.ts goodbye <name>\s+Print a farewell/);
    });
  })
  describe("command specified", () => {
    describe("missing argument", () => {
      it("should display hello usage help",  async () => {
        const {stderr} = await runExample(example, 'hello');
        expect(stderr).toContain(`Not enough non-option arguments: got 0, need at least 1`);
        expect(stderr).toContain(`index.ts hello <name>`);
        expect(stderr).toMatch(/Positionals:\s+name/m);
        expect(stderr).toMatch(/--yell\s+Print the greeting in upper case/);
      });
      it("should display goodbye usage help",  async () => {
        const {stderr} = await runExample(example, 'goodbye');
        expect(stderr).toContain(`Not enough non-option arguments: got 0, need at least 1`);
        expect(stderr).toContain(`index.ts goodbye <name>`);
        expect(stderr).toMatch(/Positionals:\s+name/m);
        expect(stderr).toMatch(/--yell\s+Print the farewell in upper case/);
      });
    })
    describe("with argument", () => {
      it("should say hello",  async () => {
        const {stdout} = await runExample(example, 'hello John');
        expect(stdout).toContain('Hello, John!');
      });
      it("should say goodbye",  async () => {
        const {stdout} = await runExample(example, 'goodbye John');
        expect(stdout).toContain('Goodbye, John!');
      });
      describe("with yell option", () => {
        it("should say goodbye loudly",  async () => {
          const {stdout} = await runExample(example, 'goodbye John --yell');
          expect(stdout).toContain('GOODBYE, JOHN!');
        });
      })
    })
  });
});
