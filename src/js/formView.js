// prettier-ignore
import {DAY_ERR_CODE,EMPTY_ERR_CODE,MONTH_ERR_CODE,YEAR_ERR_CODE} from "./config";

class FormView {
  _parentEl = document.querySelector(".form");
  _submitBtn = document.querySelector(".btn");
  _results = document.querySelectorAll(".result");
  _errorsContainer = document.querySelectorAll(".error-msg");
  _input = document.querySelectorAll(".input");
  _label = document.querySelectorAll(".label");

  addHandlerCalculate(handler) {
    // this keyword in arrow function backs to its parent
    this._submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // focus on day
      this._input.forEach((input) => {
        if (input.id === "day") input.focus();
      });
      // clear errors

      // getting data
      const dataArr = [...new FormData(this._parentEl)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  renderData(ages) {
    // render data
    this._results.forEach((result, i) => {
      result.textContent = ages[i];
    });
    // clear inputs
    this._input.forEach((input) => {
      input.value = "";
    });
    // clear error

    this._errorsContainer.forEach((err) => {
      err.innerHTML = "";
    });

    // delete error class
    this._label.forEach((l) => l.classList.remove("error"));
    this._input.forEach((i) => i.classList.remove("error"));
  }

  renderError(msg) {
    // 1) we clear all of it
    this._errorsContainer[0].innerHTML = "";
    this._errorsContainer[1].innerHTML = "";
    this._errorsContainer[2].innerHTML = "";
    // 2) implement error msg
    msg.forEach((m) => {
      if (m.startsWith(YEAR_ERR_CODE))
        this._errorsContainer[2].innerHTML = m.slice(4);
    });

    msg.forEach((m) => {
      if (m.startsWith(MONTH_ERR_CODE))
        this._errorsContainer[1].innerHTML = m.slice(4);
    });

    msg.forEach((m) => {
      if (m.startsWith(DAY_ERR_CODE))
        this._errorsContainer[0].innerHTML = m.slice(4);
    });

    msg.forEach((m) => {
      if (m.startsWith(EMPTY_ERR_CODE))
        this._errorsContainer.forEach(
          (errCo) => (errCo.innerHTML = m.slice(4))
        );
    });

    // 3) add error class

    this._label.forEach((l) => l.classList.add("error"));
    this._input.forEach((i) => i.classList.add("error"));
  }
}
export default new FormView();
