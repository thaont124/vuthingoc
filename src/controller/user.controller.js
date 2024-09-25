// user.controller.js
const userService = require('../service/user.service');
const response = require('../dto/response/response');


class UserController {
    async getAllUsers(req, res) {
        const { page = 1, limit = 10 } = req.params;
        try {
            const users = await userService.getAllUsers(parseInt(page), parseInt(limit));
            const response = new ResponseDto(
                true,
                'Failed to create user test',
                users,
                'LISTUSER200'
            );
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        const { userId } = req.params;
        try {
            const user = await userService.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const newUser = await userService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        const { userId } = req.params;
        console.log(req.body)

        try {
            const updatedUser = await userService.updateUser(userId, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const { userId } = req.params;
        try {
            await userService.deleteUser(userId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
