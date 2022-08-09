const customerModal = require("../modals/customerModal")
const express = require("express")
const router = express.Router()

router.post("/add", (req, res) => {
    customerModal.find({ email: req.body.email }).then((data) => {
        if (data.length) {
            res.status(400).send("User Exists,Please try with different email")
        } else {
            customerModal.create({
                customer_id: req.body.customer_id,
                customer_name: req.body.customer_name,
                email: req.body.email
            }).then(()=>{
                res.status(400).send(`User added successfully`)
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        }
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

router.get("/details",(req,res)=>{
    customerModal.find().then((data)=>{
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})

module.exports=router
