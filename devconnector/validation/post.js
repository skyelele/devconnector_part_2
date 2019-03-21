const Validator = require("validator");
const isEmpty = require("./is.empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // setting data.text to empty string ('') if
  // empty, undefined, or null.
  // We use the ternary operator for cases in which
  // data.text is undefined or null.
  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be between 10 and 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
