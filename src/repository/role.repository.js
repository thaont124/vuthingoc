

const Role = require('../models/role.model');;

class RoleRepository {
  async findByName(roleName) {
    return await Role.findOne({ name: roleName });
  }
}

module.exports = new RoleRepository();
