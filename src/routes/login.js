const Express = require('express')
const loginRouter = Express.Router()
const Account = require('../models/account')
const { findByEmail } = require('./accounts.js')

loginRouter.post("/", async (req, res) => {
    if (req.body.password && req.body.email) {
            const account = await findByEmail(req.body.email)
            if (!account) {
                return res.status(404).json({"message": "Account not found."})
            }

            if (account.password == req.body.password) {
                account.lastLogin = Date.now().toString()
                try {
                    await account.save()
                } catch(err) {
                    return res.status(500).json({"message": err.message})
                }
                return res.status(200).json(account)
            } else {
                return res.status(404).json({ "message": "Incorrect password."})
            }
    } else {
        res.status(401).json({ "message": "Missing data." })
    }
})

module.exports = { loginRouter }