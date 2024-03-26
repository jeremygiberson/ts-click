// @ts-ignore
import {runExample} from './runExample';
const example = 'simple';

describe(example, () => {
  describe("no arguments", () => {
    it("should execute the default command",  async () => {
      const {stdout} = await runExample(example, '');
      expect(stdout).toContain('Hello!');
    });
  });
});
