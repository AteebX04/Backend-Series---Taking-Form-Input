const express = require('express')
const app = express()
const port = 3000
const path = require ('path')
const userModel = require('./models/user')


app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
  })
  app.get('/read',async (req, res) => {
    let users = await userModel.find()
    res.render('read',  {users})
  })
  app.post('/create', async(req, res) => {
    let {name, email, imageurl} = req.body
    let createdUser = await userModel.create({
        name,
        email,
        imageurl
    })
    res.redirect('/read')
  })
  app.get('/delete/:id', async(req, res) => {
    await userModel.findOneAndDelete({_id: req.params.id})
    res.redirect('/read')
  })

  app.get('/edit/:userid',async (req, res) => {
    let user = await userModel.findOne({_id: req.params.userid})
    res.render('edit',  {user})
  })
  app.post ('/update/:userid',async (req, res) => {
    let  {imageurl, name, email} = req.body
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {name,email,imageurl}, {new:true})
    res.redirect('/read')
  })

  app.listen(port, () => {
    console.log(`App Running On Port : ${port}`)
  })