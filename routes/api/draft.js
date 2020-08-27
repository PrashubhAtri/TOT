const { Router } = require('express');
const auth = require('../../middleware/auth');
const DraftPost = require('../../models/DraftPost');
const User = require('../../models/User');
const Draft = require('../../models/Posts');
const { check, validationResult } = require('express-validator');
const CheckObjId = require('../../middleware/checkObjId');

const route = Router()

//Getting my drafts
route.get('/',auth,async (req,res)=>{
    try{
        const drafts = await DraftPost.find().sort({date: -1})
        if(!drafts){
            return res.status(400).json({msg: 'No Drafts Found.'})
        }
        return res.json(drafts)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

//getting a specific draft
route.get('/:id',[auth,CheckObjId('id')],async (req,res)=>{
    try{
        const draft = await DraftPost.findById(req.params.id)
        if(!draft){
            return res.status(404).json({msg: 'DraftForm not found'})
        }
        return res.json(draft)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("server Error")
    }
})

//saving a draft via overwriting
route.put('/:id/save',[auth,CheckObjId('id'),
    [
        check('heading',"Heading is required.").not().isEmpty(),
        check('content',"Content is required.").not().isEmpty()
    ]],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {
        heading,
        featurephoto,
        genre,
        content,
        source
    } = req.body
    try{
        const user = await User.findById(req.user.id).select('-password')

        const DraftFields = {
            heading: heading,
            author: user.name,
            genre:genre,
            content: content,
            featurephoto: featurephoto,
            source: source,
            user: req.user.id
        }

        let draft = await DraftPost.findOneAndUpdate(
            { user: req.user.id },
            { $set: DraftFields },
            { new: true, upsert: true }
        );
        return res.json(draft);
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }
})

//deleting an draft and creating a DraftForm
route.delete('/:id/submit',[auth,CheckObjId('id')],async (req,res)=>{
    try {
        const draft = await DraftPost.findById(req.params.id)
        if(!draft){
            return res.status(404).json({msg: 'DraftForm not found'})
        }
        if(draft.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not Authorised'})
        }
        const newPost = new Draft({
            heading: draft.heading,
            author: draft.author,
            genre: draft.genre,
            content: draft.content,
            featurephoto: draft.featurephoto,
            contentrelphotos: draft.contentrelphotos,
            source: draft.source,
            user: draft.user
        })
        await newPost.save();
        await draft.remove();
        return res.json({msg: 'Created Post. Will be visible on the website now :).'})
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

module.exports = { route };