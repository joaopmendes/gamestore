const { User } = require("../Models");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bc = require("bcrypt");
getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user || null;
  } catch (err) {
    return null;
  }
};
createUser = async (name, email, pass) => {
  const identifier = uuid.v1();
  let password;
  try {
    password = await bc.hash(pass, 5);
  } catch (e) {
    return null;
  }
  const token = jwt.sign({ identifier }, process.env.JWT_KEY, { expiresIn: "1h" });

  try {
    const user = await User.create({ email, password, name, identifier, token });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
};

module.exports = {
  register: async (req, res) => {
    const { name, email, password1, password2 } = req.body;

    //* Geral validations
    let errorMessage;
    if (!email || !password1 || password1 !== password2 || !name) {
      errorMessage = "Invalid Inputs.";
    }
    if (await getUserByEmail(email)) {
      errorMessage = "User is already register.";
    }
    if (errorMessage) {
      return res.status(400).json({ errorMessage });
    }
    //* User creation

    const user = await createUser(name, email, password1);
    if (!user) {
      errorMessage = "We couldn't process the registration right now. Please try again later.";
    }
    if (errorMessage) {
      return res.status(422).json({ errorMessage });
    }

    return res.status(201).json({ token: user.token });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    //* Geral validations
    let errorMessage;
    if (!email || !password) {
      errorMessage = "Invalid Inputs";
    }
    const user = await getUserByEmail(email);
    if (!user) {
      errorMessage = "User does not exist.";
    }
    if (errorMessage) {
      return res.status(400).json({ errorMessage });
    }

    let isPasswordValid;
    try {
      isPasswordValid = await bc.compare(password, user.password);
    } catch (e) {
      return res.status(422).json({ errorMessage: "The given password is invalid." });
    }

    if (!isPasswordValid) {
      return res.status(422).json({ errorMessage: "The given password is invalid." });
    }

    const token = jwt.sign({ identifier: user.identifier }, process.env.JWT_KEY, { expiresIn: "1h" });
    user.token = token;

    try {
      user.save();
      return res.status(200).json({ token });
    } catch (e) {
      return res.status(422).json({ errorMessage: "We couldn't process the login right now. Please try again later." });
    }
  },
  profile: async (req, res) => {
    console.log(req.user.identifier);
    try {
      const user = await User.findOne({ identifier: req.user.identifier }).select("name email admin token -_id").exec();
      console.log("user", user);

      if (!user) {
        throw new Error();
      }
      return res.status(200).json({ user });
    } catch (e) {
      return res.status(422).json({ errorMessage: "User Not Found" });
    }
  },
};
