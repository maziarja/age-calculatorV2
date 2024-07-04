"use strict";
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import formView from "./formView.js";

const formDataController = function (data) {
  try {
    const ages = model.userDate(data);
    if (!ages) return;
    formView.renderData(ages);
  } catch (err) {
    formView.renderError(err);
  }
};

const init = function () {
  formView.addHandlerCalculate(formDataController);
};

init();
