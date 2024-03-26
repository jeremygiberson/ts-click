// @ts-ignore
import {runExample} from './runExample';

const example = 'grouped_commands';

describe(example, () => {
  describe("command not specified", () => {
    it("should display usage help and list available (top level) commands",  async () => {
      const {stderr} = await runExample(example, '');
      expect(stderr).toContain(`index.ts <command>`);
      expect(stderr).toMatch(/index.ts greeter\s+Provides salutation commands/);
      expect(stderr).not.toMatch(/index.ts greeter hello <name>\s+Print a greeting/);
      expect(stderr).not.toMatch(/index.ts greeter goodbye <name>\s+Print a farewell/);
    });
  })
  describe("top level command specified", () => {
    it("should display usage help and list available sub commands",  async () => {
      const {stderr} = await runExample(example, 'greeter');
      expect(stderr).toMatch(/index.ts greeter\s+Provides salutation commands/);
      expect(stderr).toMatch(/index.ts greeter hello <name>\s+Print a greeting/);
      expect(stderr).toMatch(/index.ts greeter goodbye <name>\s+Print a farewell/);
    });
    describe('subcommand specified', () => {
      it('should execute the subcommand', async () => {
        const {stdout} = await runExample(example, 'greeter goodbye John');
        expect(stdout).toContain('Goodbye, John!');
      });
    });
  });
});
