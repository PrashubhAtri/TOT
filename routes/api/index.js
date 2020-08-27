const { Router } = require('express');

const ArticleRoute = require('./articles').route
const LoginRoute = require('./auth').route
const DraftRoute = require('./draft').route
const PostRoute = require('./post').route

const route = Router()

route.use('/articles',ArticleRoute)
route.use('/auth',LoginRoute)
route.use('/drafts',DraftRoute)
route.use('/posts',PostRoute)

route.get('/',(req,res)=>{
    res.send("Hello");
})

module.exports = { route };