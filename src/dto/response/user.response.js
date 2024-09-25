
class UserResponse {
    constructor(username, email, name, dob, roles) {
        this.username = username;
        this.email = email;
        this.name = name;
        this.dob = dob;
        this.roles = roles;
    }
}


module.exports = { UserResponse };
