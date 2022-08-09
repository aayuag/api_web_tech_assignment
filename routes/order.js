const orderModal = require("../modals/orderModal")
const inventoryModal = require("../modals/inventoryModel")
const express = require("express")
const router = express.Router()

router.post("/add", (req, res) => {
    inventoryModal.find({ inventory_id: req.body.inventory_id }).then((data) => {
        if (data.length) {
            const available = data[0].available_quantity
            if (available > req.body.quantity) {
                orderModal.create({
                    customer_id: req.body.customer_id,
                    inventory_id: req.body.inventory_id,
                    item_name: req.body.item_name,
                    quantity: req.body.quantity
                }).then(() => {
                    const setquantity = available - req.body.quantity
                    inventoryModal.updateOne({ inventory_id: req.body.inventory_id }, { $set: { available_quantity: setquantity } }).then(() => {
                        res.status(200).send("Order Placed Successfully")
                    }).catch((err) => {
                        res.status(400).send(err.message)
                    })
                }).catch((err) => {
                    res.status(400).send(err.message)
                })
            } else {
                res.status(400).send("Given quantity greater than the available quantity")
            }
        } else {
            res.status(400).send("No suck Inventory")
        }
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

router.get("/details", (req, res) => {
    orderModal.find().then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

module.exports = router
