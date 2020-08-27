const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const { check ,validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const User = require('../../models/User')

const route = Router()

route.get('/',auth,async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user){
            return res.status(400).json({errors:[{msg: 'No User'}]}).select('-password')
        }
        return res.json(user)
    }catch (err){
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

route.post('/',[
    check('username','Credentials required').exists(),
    check('password','Credentials required').exists()
], async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { username , password } = req.body

    try{
        let user = await User.findOne({username})

        if (!user){
            return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({errors:[{msg: 'Invalid credentials'}]})
        }

        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(payload,config.get('secret'),{expiresIn:360000},(err,token)=>{
            if(err) {
                throw err
            }
            res.json({token})
        })

    }catch (err){
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

module.exports = { route }