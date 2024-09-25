
const User = require('../models/user.model');

class UserRepository {
    async findAll() {
        return await User.find().populate('roles');
    }
    async findAll(page, limit) {
        const skip = (page - 1) * limit;
        return await User.find().populate('roles').skip(skip).limit(limit);
    }

    async findById(userId) {
        return await User.findById(userId).populate('roles');
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(userId, userData) {
        return await User.findByIdAndUpdate(userId, userData, { new: true });
    }

    async delete(userId) {
        return await User.findByIdAndDelete(userId);
    }

    async save(user) {
        const newUser = new User(user);
        return await newUser.save();
    }

    async findByUsername(username) {
        return await User.findOne({ username }).populate("roles", "-__v");
    }

    async updateRoles(userId, roles) {
        return await User.findByIdAndUpdate(userId, { roles });
    }
}

module.exports = new UserRepository();
