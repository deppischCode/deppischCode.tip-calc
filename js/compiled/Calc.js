export default class Calc {
    bill;
    percent;
    persons;
    constructor(bill, percent, persons) {
        this.bill = bill.length == 0 ? 0 : Number(bill);
        this.percent = percent.length == 0 ? 0 : Number(percent);
        this.persons = persons.length == 0 ? 0 : Number(persons);
    }
    tipAmountPP() {
        let percent = (this.percent / 100);
        let fraction = (this.bill / this.persons);
        return fraction * percent;
    }
    totalPP() {
        let percent = (this.percent / 100);
        let fraction = (this.bill / this.persons);
        return fraction + fraction * percent;
    }
}
