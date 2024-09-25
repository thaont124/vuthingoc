const authService = require('../service/user.service');
const {ResponseDto} = require('../dto/response/response');

class AuthController {
    async signup(req, res) {
        try {
            const message = await authService.signup(req.body);
            const response = new ResponseDto(
                true,
                'User registered successfully',
                { message },
                'USER_SIGNUP_1200'
            );
            res.status(200).send(response);
        } catch (err) {
            const response = new ResponseDto(
                false,
                err.message || 'Some error occurred while registering the user.',
                null,
                'USER_SIGNUP_0500'
            );
            res.status(500).send(response);
        }
    }

    async signin(req, res) {
        try {
            const data = await authService.signin(req.body);
            const response = new ResponseDto(
                true,
                'Login successful',
                data,
                'USER_SIGNIN_1200'
            );
            res.status(200).send(response);
        } catch (err) {
            const response = new ResponseDto(
                false,
                err.message || 'Some error occurred during the login.',
                null,
                'USER_SIGNIN_0500'
            );
            res.status(500).send(response);
        }
    }
}

module.exports = new AuthController();
