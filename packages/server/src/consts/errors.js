const INTERNAL_SERVER_ERROR = {
  errors: [
    {
      msg: "Internal server error",
    },
  ],
};

const INVALID_CREDENTIALS = {
  errors: [
    {
      msg: "Invalid credentials",
    },
  ],
};

const INVALID_TOKEN = {
  errors: [
    {
      msg: "Invalid token",
    },
  ],
};

const UNAUTHORIZED_ACCESS = {
  errors: [
    {
      msg: "Unauthorized access",
    },
  ],
};

const USERNAME_ALREADY_IN_USE = {
  errors: [
    {
      msg: "Username already in use",
    },
  ],
};

const EMAIL_ALREADY_IN_USE = {
  errors: [
    {
      msg: "Email already in use",
    },
  ],
};

const CATEGORY_NAME_ALREADY_IN_USE = {
  errors: [
    {
      msg: "Category name already in use",
    },
  ],
};

const CATEGORY_NOT_EXIST = {
  errors: [
    {
      msg: "Category doesn't exist",
    },
  ],
};

const OUT_OF_STOCK = {
  errors: [
    {
      msg: "One or multiple products are out of stock",
    },
  ],
};

const INVALID_REQUEST = {
  errors: [
    {
      msg: "Invalid request",
    },
  ],
};

module.exports = {
  INTERNAL_SERVER_ERROR,
  INVALID_CREDENTIALS,
  INVALID_TOKEN,
  UNAUTHORIZED_ACCESS,
  USERNAME_ALREADY_IN_USE,
  EMAIL_ALREADY_IN_USE,
  CATEGORY_NAME_ALREADY_IN_USE,
  CATEGORY_NOT_EXIST,
  OUT_OF_STOCK,
  INVALID_REQUEST,
};
