
class CreateUserRequest {
    constructor(username, password, email, name, dob) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
        this.dob = dob;
        this.roles = roles;
    }
}

class UpdateUserRequest {
    constructor(email, name, dob) {
        this.email = email;
        this.name = name;
        this.dob = dob;
    }
}

module.exports = { CreateUserRequest, UpdateUserRequest };
