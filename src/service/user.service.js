const config = require("../config/auth");
const userRepository = require('../repository/user.repository');
const roleRepository = require('../repository/role.repository');

const bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const { CreateUserRequest } = require('../dto/request/user.request');
const { UserResponse } = require('../dto/response/user.response');
const { LoginResponse } = require('../dto/response/login.response');

class UserService {
    async getAllUsers(page = 1, limit = 10) {
        const users = await userRepository.findAll(page, limit);
        return users.map(user => new UserResponse(user.username, user.email, user.name, user.dob, user.roles));
    }

    async getUserById(userId) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return new UserResponse(user.username, user.email, user.name, user.dob, user.roles);
    }

    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 8);
        const newUser = new CreateUserRequest(
            userData.username,
            hashedPassword,
            userData.email,
            userData.name,
            userData.dob,
            userData.roles
        );
        const createdUser = await userRepository.create(newUser);
        return new UserResponse(createdUser.username, createdUser.email, createdUser.name, createdUser.dob, createdUser.roles);
    }

    async updateUser(userId, userData) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        if (userData.email) {
            user.email = userData.email;
        }
        if (userData.name) {
            user.name = userData.name;
        }
        if (userData.dob) {
            user.dob = new Date(userData.dob);
        }

        const updatedUser = await user.save();
        return new UserResponse(updatedUser.username, updatedUser.email, updatedUser.name, updatedUser.dob, updatedUser.roles);
    }

    async deleteUser(userId) {
        return await userRepository.delete(userId);
    }

    async signup(userData) {
        const hashedPassword = bcrypt.hashSync(userData.password, 8);
        const newUser = {
            name: userData.name,
            dob : userData.dob,
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
        };

        const savedUser = await userRepository.save(newUser);

        const defaultRole = await roleRepository.findByName("user");
        savedUser.roles = [defaultRole._id];
        await userRepository.updateRoles(savedUser._id, savedUser.roles);

        return "User was registered successfully!";
    }

    async signin(userData) {
        const user = await userRepository.findByUsername(userData.username);
        if (!user) {
            throw new Error("User Not found.");
        }

        const passwordIsValid = bcrypt.compareSync(userData.password, user.password);
        if (!passwordIsValid) {
            throw new Error("Invalid Password!");
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            algorithm: 'HS256',
            expiresIn: 86400, // 24 hours
        });

        const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

        return new LoginResponse (
            user._id,
            user.username,
            user.email,
            authorities,
            token
        );
    }
}

module.exports = new UserService();
