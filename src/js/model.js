//prettier-ignore
import { MONTHS, FEB_LEAP_YEAR, FEB_REG_YEAR, DAY_ERR_CODE,EMPTY_ERR_CODE,MONTH_ERR_CODE,YEAR_ERR_CODE } from "./config.js";
import { leapYear } from "./helpers.js";

const ageCalculation = function (birth) {
  const currentDate = new Date();

  // Calculate the difference in years
  let ageYears = currentDate.getFullYear() - birth.getFullYear();

  // Adjust age if birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < birth.getMonth() ||
    (currentDate.getMonth() === birth.getMonth() &&
      currentDate.getDate() < birth.getDate())
  ) {
    ageYears--;
  }

  // Calculate the difference in months
  let ageMonths = currentDate.getMonth() - birth.getMonth();
  if (ageMonths < 0) {
    ageMonths += 12;
  }

  // Calculate the difference in days
  let ageDays = currentDate.getDate() - birth.getDate();
  if (ageDays < 0) {
    const prevMonthLastDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    ageDays += prevMonthLastDay;
    ageMonths--;
  }
  return [ageYears, ageMonths, ageDays];
};

export const userDate = function (data) {
  try {
    const error = [];
    const dateArr = Object.values(data);
    const index = dateArr.findIndex((dateArr) => dateArr === "");
    if (index !== -1) dateArr.splice(index, 1);

    const year = +dateArr[2];
    const month = +dateArr[1] - 1;
    const day = +dateArr[0];
    // first error (empty fields)
    // if (dateArr.length < 3) throw new Error("This field is required");

    if (dateArr.length < 3) {
      error.push(`${EMPTY_ERR_CODE}This field is required`);
    }
    // second error (years validation)

    if (dateArr[2] > new Date().getFullYear()) {
      error.push(`${YEAR_ERR_CODE}Must be in the past`);
    }
    // third error (months validation)

    if (dateArr[1] > MONTHS)
      error.push(`${MONTH_ERR_CODE}Must be a valid month`);

    // forth error (days validation)
    if (leapYear(year) && month === 1 && day > FEB_LEAP_YEAR) {
      error.push(`${DAY_ERR_CODE}Must be a valid date`);
    }
    if (!leapYear(year) && month === 1 && day > FEB_REG_YEAR) {
      error.push(`${DAY_ERR_CODE}Must be a valid date`);
    }

    if ((month === 3 || month === 5 || month === 8 || month === 10) && day > 30)
      error.push(`${DAY_ERR_CODE}Must be a valid date`);
    if (day > 31) {
      error.push(`${DAY_ERR_CODE}Must be a valid date`);
    }
    if (error.length > 0) throw error;
    // else calculate age
    const birth = new Date(+dateArr[2], +dateArr[1] - 1, +dateArr[0]);
    const ages = ageCalculation(birth);
    return ages;
  } catch (err) {
    throw err;
  }
};
