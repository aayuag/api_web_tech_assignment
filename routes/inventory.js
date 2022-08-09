const inventoryModal = require("../modals/inventoryModel")
const express = require("express")
const router = express.Router()

router.post("/add", (req, res) => {
    inventoryModal.find({ inventory_id: req.body.inventory_id }).then((data) => {
        if (data.length) {
            const quantity=(data[0].available_quantity)+(req.body.available_quantity)
            inventoryModal.updateOne({ inventory_id: req.body.inventory_id },{$set: {available_quantity:quantity}}).then((data)=>{
                res.status(200).send("Data Added")
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        } else {
            inventoryModal.create({
            inventory_id:req.body.inventory_id,
            inventory_type:req.body.inventory_type,
            item_name:req.body.item_name,
            available_quantity:req.body.available_quantity
            }).then((data)=>{
                res.status(400).send(`Data added successfully`)
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        }
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

router.get("/",(req,res)=>{
    inventoryModal.find().then((data)=>{
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

router.get('/:id', (req, res) => {
    inventoryModal.find({ inventory_type : req.params.id}).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

module.exports=router
