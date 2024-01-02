export default class Calc {
  private bill: number;
  private percent: number;
  private persons: number;

  constructor(bill: string, percent: string, persons: string) {
    this.bill = bill.length == 0 ? 0 : Number(bill);
    this.percent = percent.length == 0 ? 0 : Number(percent);
    this.persons = persons.length == 0 ? 0 : Number(persons);
  }

  tipAmountPP() {
    let percent: number = (this.percent / 100);
    let fraction: number = (this.bill / this.persons);

    return fraction * percent;
  }

  totalPP() {
    let percent: number = (this.percent / 100);
    let fraction: number = (this.bill / this.persons);

    return fraction + fraction * percent;
  }
}
