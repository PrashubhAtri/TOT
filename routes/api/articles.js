const { Router } = require('express');
const auth = require('../../middleware/auth');
const Articles = require('../../models/Article');
const User = require('../../models/User');
const DraftPost = require('../../models/DraftPost');
const { check, validationResult } = require('express-validator');
const CheckObjId = require('../../middleware/checkObjId');

const route = Router()

//Getting my articles
route.get('/',auth,async (req,res)=>{
    try{
        const articles = await Articles.find({user:req.user.id}).sort({date: -1})
        if(!articles){
            return res.status(400).json({msg: 'No Articles Found.'})
        }
        return res.json(articles)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

//Creating a new article
route.post('/new',[auth,
[
    check('heading',"Heading is required.").not().isEmpty(),
    check('content',"Content is required.").not().isEmpty(),
    check('genre',"Genre is required.").not().isEmpty()
]
],async (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
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

        const newArticle = new Articles({
            heading: heading,
            author: user.name,
            genre:genre,
            content: content,
            featurephoto: featurephoto,
            source: source,
            user: req.user.id
        })

        const article = await newArticle.save()

        return res.json(article)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }
})

//getting a specific article
route.get('/:id',[auth,CheckObjId('id')],async (req,res)=>{
    try{
        const article = await Articles.findById(req.params.id)
        if(!article){
            return res.status(404).json({msg: 'ArticleGrid not found'})
        }
        return res.json(article)
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("server Error")
    }
})

//saving a draft via overwriting
route.put('/:id/save',[auth,CheckObjId('id'),
[
    check('heading',"Heading is required.").not().isEmpty(),
    check('content',"Content is required.").not().isEmpty(),
    check('genre',"Genre is required.").not().isEmpty()
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

        const articleFields = {
            heading: heading,
            author: user.name,
            genre:genre,
            content: content,
            featurephoto: featurephoto,
            source: source,
            user: req.user.id
        }

        let article = await Articles.findOneAndUpdate(
            { heading: heading },
            { $set: articleFields },
            { new: true, upsert: true }
        );
        return res.json(article);
    }catch (err) {
        console.error(err.message)
        return res.status(500).send("Server error")
    }
})

//deleting an article and creating a draftpost
route.delete('/:id/submit',[auth,CheckObjId('id')],async (req,res)=>{
    try {
        const article = await Articles.findById(req.params.id)
        if(!article){
            return res.status(404).json({msg: 'ArticleGrid not found'})
        }
        if(article.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not Authorised'})
        }
        const newdraft = new DraftPost({
            heading: article.heading,
            author: article.author,
            genre:article.genre,
            content: article.content,
            featurephoto: article.featurephoto,
            source: article.source,
            user: article.user
        })
        await newdraft.save()
        await article.remove();
        return res.json({msg: 'Created DraftForm. Waiting for the Editor...'})
    } catch (err) {
        console.error(err.message)
        return res.status(500).send("Server Error")
    }
})

module.exports = { route };