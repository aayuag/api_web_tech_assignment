const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer_id:String,
    inventory_id:String,
    item_name:String,
    quantity:Number
});

const orderModal = mongoose.model("order", orderSchema);

module.exports = orderModal;