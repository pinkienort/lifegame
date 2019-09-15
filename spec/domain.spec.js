
import { initializers, nextState } from '../src/domain';
import { createNumArray } from '../src/helper';
import { DEAD, ALIVE } from '../src/common';

describe("domain module:", () => {
  describe("randomRect initializer:", () => {
    it("outside of rect is DEAD", () => {
      const size = { x: 60, y: 60 };
      const start = { x: 10, y: 10 };
      const end = { x: 20, y: 20 };
      const randomRect = new initializers.RandomRect(size, start, end);
      expect(randomRect._get({ x: 33, y: 33 })).toBe(DEAD);
      expect(randomRect._get({ x: 22, y: 22 })).toBe(DEAD);
      expect(randomRect._get({ x: 21, y: 21 })).toBe(DEAD);
      expect(randomRect._get({ x: 9, y: 9 })).toBe(DEAD);
    });

    it("inside of rect is DEAD or ALIVE randomly", () => {
      const size = { x: 30, y: 30 };
      const start = { x: 5, y: 5 };
      const end = { x: 10, y: 10 };
      const randomRect = new initializers.RandomRect(size, start, end);
      const numAlive = createNumArray(10)
        .filter(() => randomRect._get({ x: 6, y: 6 }))
        .length;
      expect(numAlive).toBeGreaterThan(1);
    });
  });

  describe("nextState:", () => {

    const test = (current, numAlive, expectedValue) =>
      nextState(current, Array(numAlive).fill(ALIVE))
        |> expect
        |> ((m) => m.toBe(expectedValue))
    ;

    it("return ALIVE when current is ALIVE and around has 3 alive cell", () => test(ALIVE, 3, ALIVE)
    );

    it("return ALIVE when current is ALIVE and around has 2 alive cell", () => test(ALIVE, 2, ALIVE)
    );

    it("return ALIVE when current is DEAD and around has 3 alive cell", () => test(DEAD, 3, ALIVE)
    );

    it("return DEAD when current is DEAD and around has 2 alive cell", () => test(DEAD, 2, DEAD)
    );

    it("return DEAD when current is DEAD and around has 4 alive cell", () => test(DEAD, 4, DEAD)
    );

    it("return DEAD when current is ALIVE and around has 1 alive cell", () => test(ALIVE, 1, DEAD)
    );

    it("return DEAD when current is ALIVE and around has 4 alive cell", () => test(ALIVE, 4, DEAD)
    );
  });

});
