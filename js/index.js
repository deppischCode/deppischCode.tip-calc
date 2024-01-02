import NumberValidator from "./compiled/NumberValidator.js";
import Calc from "./compiled/Calc.js";
import Reset from "./compiled/Reset.js";
import { resetResult, appendErrorMessage } from "./fn.js";

const form = document.querySelector("form");
const bill = document.querySelector("#bill");
const radio = document.querySelectorAll("[type=radio]");
const selectTip = document.querySelector("#select-tip");
const custom = document.querySelector("#custom-percent");
const errorMsg = document.querySelector(".error-msg");
const persons = document.querySelector("#number-of-people");
const reset = document.querySelector("#reset");

const resultsPrice = document.querySelectorAll(".results__price");

let validator = new NumberValidator();

form.addEventListener("input", function () {
  let percent = 0;

  Array.from(selectTip.getElementsByTagName("input")).forEach(tipValue => {
    if (tipValue.checked) percent = tipValue.value;
    if (tipValue.type == "text" && tipValue.value.length != 0) percent = tipValue.value;
  });

  let calc = new Calc(bill.value, percent, persons.value);
  let notEmpty = [bill.value, percent, persons.value].filter(num => NumberValidator.empty(num));

  if (validator.isValid() && notEmpty.length == 0) {
    let tipAmount = calc.tipAmountPP().toFixed(2);
    let total = calc.totalPP().toFixed(2);

    if (!isNaN(tipAmount) && !isNaN(total)) {
      resultsPrice[0].lastElementChild.textContent = tipAmount;
      resultsPrice[1].lastElementChild.textContent = total;
    }

    return;
  }

  resetResult(resultsPrice);
});

radio.forEach(btn => {
  btn.addEventListener("click", function () {
    Reset.button(reset, ...radio, bill, custom, persons);

    custom.value = "";
  });
});

custom.addEventListener("focus", function () {
  Reset.input(...radio);

  if ([bill, persons]
    .filter(input => input.value.length != 0)
    .length == 0) Reset.button(reset, ...radio, bill, custom, persons);
});

bill.addEventListener("input", function (event) {
  Reset.button(reset, ...radio, bill, custom, persons);

  validator.register(event.target, NumberValidator.between, parseFloat(event.target.value), 0, 2500);

  appendErrorMessage("bill", validator);
});

custom.addEventListener("input", function (event) {
  Reset.button(reset, ...radio, bill, custom, persons);

  validator.register(event.target, NumberValidator.between, parseInt(event.target.value), 0, 100);

  appendErrorMessage("custom-percent", validator);
});

persons.addEventListener("input", function (event) {
  Reset.button(reset, ...radio, bill, custom, persons);

  validator.register(event.target, NumberValidator.greaterThan, parseInt(event.target.value), 1);

  if (NumberValidator.greaterThan(event.target.value, 1)()
    || NumberValidator.empty(event.target.value))
      errorMsg.textContent = "";
  else
    errorMsg.textContent = "Can't be zero or below";

  appendErrorMessage("number-of-people", validator);
});

reset.addEventListener("click", function () {
  Reset.input(...radio, bill, custom, persons);
  Reset.button(reset, ...radio, bill, custom, persons);

  resetResult(resultsPrice);
});
