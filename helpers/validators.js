module.exports.validateCreateUserInput = (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (firstName.trim() === "") {
    errors.firstName = "First name can not be empty";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name can not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email can not be empty";
  } else if (
    !email.match(
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    )
  ) {
    errors.email = "Must be a valid email address";
  }

  if (password === "") {
    errors.password = "Password can not be empty";
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email can not be empty";
  } else if (
    !email.match(
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    )
  ) {
    errors.email = "Must be a valid email address";
  }

  if (password === "") {
    errors.password = "Password can not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateCreateCompanyInput = (
  name,
  phone,
  einNumber,
  address
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Company name can not be empty";
  }
  if (phone.trim() === "") {
    errors.phone = "Phone number can not be empty";
  } else if (!phone.match(/^[0-9]*$/) || phone.length !== 10) {
    errors.phone = "Must be a valid phone number";
  }
  if (einNumber.trim() === "") {
    errors.einNumber = "EIN number can not be epmty";
  } else if (!einNumber.match(/^[0-9]*$/) || einNumber.length !== 9) {
    errors.einNumber = "Must be a valid EIN number";
  }
  if (address.streetAddress1.trim() === "") {
    errors.streetAddress1 = "Street address can not be empty";
  } else if (!address.streetAddress1.match(/^[a-zA-Z0-9.\s]*$/)) {
    errors.streetAddress1 = "Street address can not contain special characters";
  }

  if (!address.streetAddress2.match(/^[a-zA-Z0-9.\s]*$/)) {
    errors.streetAddress2 = "Street address can not contain special characters";
  }

  if (address.state.trim() === "") {
    errors.state = "State can not be empty";
  }

  if (address.city.trim() === "") {
    errors.city = "City can not be empty";
  } else if (!address.city.match(/^[a-zA-Z\s]*$/)) {
    errors.city = "City names can contain only letters and spaces";
  }

  if (!address.zip.match(/^[0-9]*$/) || address.zip.length < 5) {
    errors.zip = "Must be a valid zip code";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateCreateEventInput = (
  title,
  payType,
  payAmount,
  expectedTurnout,
  address
) => {
  const errors = {};
  if (title.trim() === "") {
    errors.title = "Title can not be empty";
  }

  if (payType === "PAID" && payAmount === "0") {
    errors.payAmount = "Pay amount can not be zero";
  } else if (!payAmount.match(/^[0-9]*$/)) {
    errors.payAmount = "Pay amount must be a valid dollar amount";
  }

  if (expectedTurnout === "0") {
    errors.expectedTurnout = "Expected turnout can not be zero";
  } else if (!expectedTurnout.match(/^[0-9]*$/)) {
    errors.expectedTurnout = "Expected turnout must be a valid number";
  }

  if (address.streetAddress1.trim() === "") {
    errors.streetAddress1 = "Street address can not be empty";
  } else if (!address.streetAddress1.match(/^[a-zA-Z0-9.\s]*$/)) {
    errors.streetAddress1 = "Street address can not contain special characters";
  }

  if (!address.streetAddress2.match(/^[a-zA-Z0-9.\s]*$/)) {
    errors.streetAddress2 = "Street address can not contain special characters";
  }

  if (address.state.trim() === "") {
    errors.state = "State can not be empty";
  }

  if (address.city.trim() === "") {
    errors.city = "City can not be empty";
  } else if (!address.city.match(/^[a-zA-Z\s]*$/)) {
    errors.city = "City names can contain only letters and spaces";
  }

  if (!address.zip.match(/^[0-9]*$/) || address.zip.length < 5) {
    errors.zip = "Must be a valid zip code";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};
