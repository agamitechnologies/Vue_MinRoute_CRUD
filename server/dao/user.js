const user = require("../models/user");
const Mongoose = require("mongoose");
const objectId = Mongoose.Types.ObjectId;

module.exports.getUsers = async () => {
    return await user.find({})
}

module.exports.addUser = async (obj) => {
    return await user(obj).save();
}

module.exports.deleteUser = async (id) => {
    return await user.deleteOne({ _id: objectId(id) })
}

module.exports.updateUser = async (body) => {
    return await user.updateOne({ _id: objectId(body._id) }, {
        email: body.email, phone: body.phone, name: body.name
    })
}