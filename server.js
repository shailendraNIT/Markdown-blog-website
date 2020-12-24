const express=require('express');
const mongoose=require('mongoose');
const Article=require('./models/article');
const articleRouter=require('./routes/article.js');
const methodOverride=require('method-override');

const app=express();
const port=process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});




//viewEngine
app.set('view engine','ejs');


//middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//The express.urlencoded() parses incoming requests with urlencoded payloads and is based on body-parser

app.get('/',async(req,res)=>{
    const articles=await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{articles:articles});
})

app.use('/article',articleRouter);

app.listen(port,()=>{
    console.log(`sever is up and running at port: ${port} `)
})