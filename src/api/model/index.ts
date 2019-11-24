const mongoose = require('mongoose');

const userSchema = {
    name: String,
    avatar: String
};

export const UserModel = mongoose.model("User", new mongoose.Schema(userSchema));


