export function resetResult(resultsPrice) {
  resultsPrice[0].lastElementChild.textContent = Number(0).toFixed(2);
  resultsPrice[1].lastElementChild.textContent = Number(0).toFixed(2);
}

export function appendErrorMessage(id, validator) {
  if (!validator.isValid(id)) {
    event.target.classList.add("error");
    return;
  }

  event.target.classList.remove("error");
}
