class brandModel {
  constructor ({
    id = null,
    name = "",
    average_price = 0,
    count = 0,
  }) {
    this.id = id;
    this.name = name;
    this.average_price = average_price;
    this.count = count;
  }

  getInfoBrand() {
    return {
      id : this.id,
      name : this.name,
      average_price: this.average_price
    }
  }
}

module.exports = { brandModel };