export default class NumberValidator {
    validations;
    constructor() {
        this.validations = {};
    }
    register(element, callback, ...args) {
        this.validations[element.id] = [element, callback(...args)];
    }
    static between(number, start, end) {
        return function () {
            return number < start || number > end
                ? false
                : true;
        };
    }
    static notEqual(number, forbidden) {
        return function () {
            return number == forbidden
                ? false
                : true;
        };
    }
    static greaterThan(number, lim) {
        return function () {
            return number < lim
                ? false
                : true;
        };
    }
    static empty(number) {
        return number.length == 0 ? true : false;
    }
    isValid() {
        if (arguments.length == 0) {
            for (let [_, validation] of Object.entries(this.validations)) {
                if (!validation[1]())
                    return false;
            }
            return true;
        }
        if (!this.validations[arguments[0]][1]())
            return false;
        return true;
    }
}
