module.exports = class UserRepository {
  constructor(User) {
    this.User = User;
  }

  async showById(id) {
    return await this.User.findOne({
      where: {
        id,
      },
    });
  }

  async showAll() {
    return await this.User.findAll();
  }

  async create(firstname, lastname) {
    return await this.User.create({ firstname, lastname });
  }

  async update(id, data) {
    console.log(data);
    const result = await this.User.update(data, {where: {id}});
    return !!result[0];
  }

  async delete(id) {
    return !!await this.User.destroy({ where: { id } });
  }
};
