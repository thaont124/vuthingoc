class LoginResponse {
    constructor(id, username, email, roles, accessToken) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.accessToken = accessToken;
    }
}


module.exports = { LoginResponse };