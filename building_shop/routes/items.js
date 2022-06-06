const express = require('express');
const router = express.Router()
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();


router.get("/", async (req, res) => {
    const items = await prisma.item.findMany()
    res.json(items)
})

router.get('/:id',async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const item = await prisma.item.findUnique({
            where: {
                id: +id,
            },
        })

        res.status(200).json(item)
    } catch(e) {
        res.status(400).json({error: e.message})
    }
})

router.post('/',async (req, res) => {
    try{
        const {name, price, quantity} = req.body
        await prisma.item.create({
            data: {
                name,
                price,
                shop_id,
                quantity
            },

        })
        res.status(201).json({status: 'git'})
    } catch (e){
        return res.status(500).send(e)
    }
})

module.exports = router;
