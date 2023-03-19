// Modules
const bcrypt = require("bcrypt");

// Schema
/*
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
*/

// User Module
let User = {};

/**
 * Verify If Email Exists in Database
 * @param {string} email Email to Verify
 */
function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    // Get Database
    const db = global.db;

    // Existing Email Validation
    const emailExistsQuery = "SELECT user_email FROM User WHERE user_email = ?";

    db.get(emailExistsQuery, email, function (err, res) {
      if (err) {
        reject(err);
      } else if (res) {
        reject("Email Address Already In Use");
      } else {
        resolve();
      }
    });
  });
}

/**
 * Create a New User in Database
 * @param {string} email Email of New User
 * @param {string} hash_password Hash Password of New User
 */
function createUser(email, hash_password) {
  return new Promise((resolve, reject) => {
    // Get Database
    const db = global.db;

    // Create New User
    const createUserQuery =
      "INSERT INTO user (user_email, user_password) VALUES (?, ?)";
    db.run(createUserQuery, [email, hash_password], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

/**
 * Select User
 * @param {array} filters Filters to Find User
 * @param {array} columns Columns to Select
 * @returns Filtered User
 */
function selectUser(filters, columns = "*") {
  return new Promise((resolve, reject) => {
    // Get Database
    const db = global.db;

    let select;

    if (columns === "*") {
      select = columns;
    } else {
      select = columns.join(" ");
    }

    // Get User at Id
    var selectUserQuery = `SELECT ${select} FROM User WHERE 1 `;

    Object.keys(filters).forEach((key) => {
      selectUserQuery = selectUserQuery.concat(`AND ${key} = ? `);
    });

    db.get(selectUserQuery, Object.values(filters), function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

/**
 * Register User Using Credentials
 * @param {string} email
 * @param {string} password
 * @returns User
 */
User.register = async function (email, password) {
  // Empty Fields Validation
  if (!email || !password) {
    throw Error("Please Fill In Missing Fields");
  }

  // Get Database
  const db = global.db;

  try {
    await checkEmailExists(email);
  } catch (err) {
    console.error(err);
    throw Error(err);
  }

  // Email Format Validation
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailPattern.test(email)) {
    throw Error("Invalid Email Format");
  }

  // Password Format Validation
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordPattern.test(password)) {
    throw Error("Weak Password");
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);

  let lastId;

  try {
    lastId = await createUser(email, password_hash);
  } catch (err) {
    console.error(err);
    throw Error(err);
  }

  let user;

  try {
    user = await selectUser({ user_id: lastId });
  } catch (err) {
    console.error(err);
    throw Error(err);
  }

  return user;
};

/**
 * Log In User Using Credentials
 * @param {string} email
 * @param {string} password
 */
User.login = async function (email, password) {
  // Empty Validation
  if (!email || !password) {
    throw Error("Please Fill In Missing Fields");
  }

  let user;

  try {
    user = await selectUser({ user_email: email });
  } catch (err) {
    console.error(err);
    throw Error(err);
  }

  if (!user) {
    throw Error("Invalid Login Credentials");
  }

  // Password Match Validation
  const match = await bcrypt.compare(password, user.user_password);

  if (!match) {
    throw Error("Invalid Login Credentials");
  }

  return user;
};

User.exists = async function (user_id) {
  return await selectUser({ user_id: user_id });
};

// Exports
module.exports = User;
