class modelBrandModel {
  constructor ({
    id = null,
    name,
    average_price,
    brand_id = ""
  }) {
    this.id = id;
    this.name = name;
    this.average_price = average_price;
    this.brand_id = brand_id;
  }

  getInfoModel() {
    return {
      id : this.id,
      name: this.name,
      average_price : this.average_price
    }
  }

  setBrandID(id) {
    this.brand_id = id;
  }
}

module.exports = { modelBrandModel };