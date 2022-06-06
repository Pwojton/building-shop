const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()
const cors = require('cors');
const {prisma} = require('@prisma/client')

const idLenght = 4;




/**
 *  @swagger
 * components:
 *  schemas:
 *      Item:
 *          type: object
 *          required:
 *            - name
 *            - price
 *          properties:
 *            id:
 *              type: string
 *              description: The auto-generated id of the item
 *            name:
 *              type: string
 *              description: The item name
 *            price:
 *              type: number
 *              description: The item price
 *            example:
 *              id: qwer
 *              name: mlotek
 *              price: 20
 */

/**
 * @swagger
 * /items:
 *  get:
 *      summary: Returns the list of items
 *      responses:
 *          200: 
 *              description: The list of the items
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *      
 */

/**
 * @swagger
 * /items:
 *   post:
 *      summary: Insert item to database
 *      requestBody:
 *        required: True
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                price: 
 *                  type: number
 *                shop_id:
 *                  type: number
 *                quantity:
 *                  type: number
 *                
 *                
*/



router.get("/", cors() ,async (req, res) => {
    const items = await prisma.item.findMany({
        include: {name: true},
        include: {price: true},
        include: {shop_id: true},
        include: {quantity: true},
    })
    res.json(items)
})

router.get('/:id', cors(),(req, res) => {
    const item = req.app.db.get('items').find({id: req.params.id}).value()
    res.send(book)
})

router.post('/', cors(),async (req, res) => {
    try{
        const {name, price, shop_id, quantity} = req.body
        const result = await prisma.item.create({
            data: {
                name,
                price,
                shop_id,
                quantity
            },

        })
        res.json(result)
    } catch {
        return res.status(500).send(error)
    }
})

router.put('/:id', (req, res) => {
    try {
        req.app.db.get('items').find({ id: req.params.id}).assing(req.body).write()

        res.send(req.app.db.get('items').find({id:req.params.id}))
    } catch(err) {
        return res.status(500).send(err)
    }
})

router.delete("/:id", (req,res) => {
    req.app.db.get('items').remove({ id: req.params.id}).write()

    res.sendStatus(200)
})

module.exports = router;