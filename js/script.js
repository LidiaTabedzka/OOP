function Phone(brand, price, color, weight) {
    this.brand = brand;
    this.price = price;
    this.color = color;
    this.weight = weight;
}

Phone.prototype = {
    getWarrantyCost: function() {
        return this.price * 0.1;
    },
    printInfo: function() {
        console.log("The phone brand is " + this.brand + ", color is " + this.color + ", the price is " + this.price + "zł, the price of the extended warranty is " + this.getWarrantyCost() + "zł and the weight is " + this.weight + "g.");
    }
}

var samsungGalaxyS6 = new Phone("Samsung", 2000, "black", 138);
var iPhone6S = new Phone("Apple", 3000, "white", 143);
var onePlusOne = new Phone("OnePlus", 1500, "blue", 162);

samsungGalaxyS6.printInfo();
iPhone6S.printInfo();
onePlusOne.printInfo();