const db = require('../db')
class ItemsController {ItemsController
    async createItem(req, res) {
        try{
        const {name, description, category, price, static_img, storage, color, size, screen, diagonal, generation, connection, model, complect, compatibility, power, length} = req.body
        const newUser = await db.query(`INSERT INTO items (name, description, category, price, static_img, storage, color, size, screen, diagonal, generation, connection, model, complect, compatibility, power, length) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`, [name, description, category, price, static_img, storage, color, size, screen, diagonal, generation, connection, model, complect, compatibility, power, length])
        res.json(newUser.rows[0])
        }
        catch (e){
            res.json({error: e.message})
        }
    }
    async getItems(req, res) {
        try {
        const users = await db.query(`SELECT * FROM items`)
        res.json(users.rows)
        }
        catch (e) {
            res.json({"message": e})
        }
    }
    async getOneItem(req, res) {
        const id = req.params.id
        const item = await db.query(`SELECT * FROM items WHERE id = $1`, [id])
        res.json(item.rows[0])
    }
    async updateItem(req, res) {
        const {id, name, description, category, price, static_img, storage, color, size, screen, diagonal, generation, connection, model, complect, compatibility, power, length} = req.body
        const user = await db.query(`UPDATE items set price = $1, static_img = $2, storage = $3, color = $4, size = $5, screen = $6, diagonal = $7, generation = $8, connection = $9, model = $10, complect = $11, compatibility = $12, power = $13, length = $14, category = $15, name = $16, description = $17 WHERE id = $18 RETURNING *`, [price, static_img, storage, color, size, screen, diagonal, generation, connection, model, complect, compatibility, power, length, category, name, description, id])
        res.json(user.rows[0])
    }
    async deleteItem(req, res) {
        const id = req.params.id
        const user = await db.query(`DELETE FROM items WHERE id = $1`, [id])
        res.json(user.rows[0])
    }
    async findCategory(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT * FROM items WHERE category = $1`, [id])
	const data = user.rows
	data.sort((a, b) => a["id"] - b["id"])
        res.json(data)
    }
}

module.exports = new ItemsController()
