export default class NumberValidator {
  private validations: {
    [index: string]: [HTMLElement, Function]
  };

  constructor () {
    this.validations = {};
  }

  register(element: HTMLElement, callback: Function, ...args: number[]) {
    this.validations[element.id] = [element, callback(...args)];
  }

  static between(number: number, start: number, end: number): Function {
    return function () {
      return number < start || number > end
        ? false
        : true;
    };
  }

  static notEqual(number: number, forbidden: number): Function {
    return function () {
      return number == forbidden
        ? false
        : true;
    };
  }

  static greaterThan(number: number, lim: number): Function {
    return function () {
      return number < lim
        ? false
        : true;
    };
  }

  static empty(number: string): boolean {
    return number.length == 0 ? true : false;
  }

  isValid(): boolean {
    if (arguments.length == 0) {
      for (let [_, validation] of Object.entries(this.validations)) {
        if (!validation[1]()) return false;
      }

      return true;
    }

    if (!this.validations[arguments[0]][1]()) return false;

    return true;
  }
}
