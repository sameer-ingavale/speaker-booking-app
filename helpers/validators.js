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
  }

  if (password === "") {
    errors.password = "Password can not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

/* validateCreateCompanyInput: (
    name,
    address,
    phone,
    einNumber,
    companyType
  ) => {
    const errors = {};
    if (name.trim() === "") {
      errors.name = "Company can not be empty";
    }
    if (phone.trim() === "") {
      errors.phone = "Phone number can not be empty";
    } else if (phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (einNumber.trim() === "") {
      errors.einNumber = "EIN number is required";
    } else if (einNumber.length !== 9) {
      errors.phone = "Must be a valid EIN number";
    }

    return {
      errors,
      valid: Object.keys(errors).length < 1
    };
  } */
