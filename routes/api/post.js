const { Router } = require('express');
const Post = require('../../models/Posts')
const checkObjectId = require('../../middleware/checkObjId');

const route = Router()

route.get('/',async (req,res)=>{
    try{
        let posts = await Post.find().populate('user', ['name']).sort({date:-1})
        return res.json(posts)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

route.get('/:id',checkObjectId('id'),async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id).populate('user', ['name'])
        if (!post) return res.status(400).json({ msg: 'Post not found' });
        return res.json({post})
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

route.get('/genre/:genre',async (req,res)=>{
    try {
        const posts = await Post.find({genre:req.params.genre}).populate('user', ['name'])
        if (!posts) return res.status(400).json({ msg: 'Posts not found' });
        console.log(posts)
        return res.json({posts})
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

module.exports = { route };