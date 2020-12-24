const express=require('express');
const mongoose=require('mongoose');
const Article=require('./models/article');
const methodOverride=require('method-override');
const createDomPurifier=require('dompurify');
const {JSDOM}=require('jsdom');

const dompurify=createDomPurifier(new JSDOM().window);

 


const app=express();

//routes
const articleRouter=require('./routes/article.js');

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});


const port=process.env.PORT || 3000;

//viewEngine
app.set('view engine','ejs');


//middlewares
app.use(express.urlencoded({extended:false}));

app.use('/article',articleRouter);
//The express.urlencoded() parses incoming requests with urlencoded payloads and is based on body-parser

app.use(methodOverride('_method'));


app.get('/',async(req,res)=>{
    const articles=await Article.find().sort({createdAt:'desc'});
    res.render('articles/index',{articles:articles});
})

app.listen(port,()=>{
    console.log(`sever is up and running at port: ${port} `)
})