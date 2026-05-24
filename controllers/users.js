import User from "../models/users.js"

const signup = async (req, res) => {
    const user = new User({
        name: "roman",
        email: "roman@gmail.com",
        password: "12345",
    });

    await user.save();
    res.json(user);
};

export { signup };