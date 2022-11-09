const Express = require('express')
const accountRouter = Express.Router()
const Account = require('../models/account')

// Get All
accountRouter.get("/", async (req, res) => {
    try {
        const accounts = await Account.find()
        res.json(accounts)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get One
accountRouter.get("/:id", getAccount, (req, res) => {
    res.json(res.account)
})

// Create new account
accountRouter.post("/", async (req, res) => {
    // Get Info as JSON
    const account = new Account({
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile,
        characters: req.body.characters,
        meta: req.body.meta
    })

    try {
        const newAccount = await account.save()
        res.status(201).json(newAccount)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }

    // TODO:Validation
})

// Update Account
accountRouter.patch("/:id", getAccount, async (req, res) => {
    for (key in req.body) {
        switch(key) {
            case 'email': res.account.email = req.body.email
            break;
            case 'password': res.account.password = req.body.password
            break;
            case 'profile': res.account.profile = req.body.profile
            break;
            case 'characters': res.account.characters = req.body.characters
            break;
            case 'meta': res.account.meta = req.body.meta
            break;
        }
    }

    try {
        const updatedAccount = await res.account.save()
        res.json(updatedAccount)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete Account
accountRouter.delete("/:id", getAccount, async (req, res) => {
    try {
        await res.account.remove()
        res.json({ message: "Account deleted." })
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

async function getAccount(req, res, next) {
    let account 

    try {
        account = await Account.findById(req.params.id)
        if (!account) {
            return res.status(404).json({ message: "Account not found." })
        }
    } catch(err) {
        return res.status(500).json({ message: err.message })
    }

    res.account = account
    next()
}

async function findByEmail(email) {
    let account 

    try {
        accounts = await Account.find({ "email": email })
        if (accounts == null || accounts.length == 0) {
            return false
        }
    } catch {
        return false
    }

    return accounts[0]
}

module.exports = { accountRouter, getAccount, findByEmail }


