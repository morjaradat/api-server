class Collection {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    // Object.keys(data).forEach((element) => {
    //   if (!isNaN(data[element])) data[element] = parseInt(data[element]);
    // });
    return this.model.create(data);
  }

  getAll() {
    return this.model.findAll();
  }
  getById(id) {
    return this.model.findByPk(id);
  }

  async update(id, data) {
    const item = await this.model.findByPk(id);
    console.log(item);
    if (!item) throw new Error(`Item with id ${id} not found`);
    return item.update(data);
  }

  async delete(id) {
    const item = await this.model.findByPk(id);
    console.log(item);
    if (!item) throw new Error(`Item with id ${id} not found`);
    return item.destroy();
  }
}

module.exports = Collection;
