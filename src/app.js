const path=require('path')
const hbs=require('hbs')
const express=require('express')
const geocode=require('./utils/geoloc')
const forecast=require('./utils/forecast')
console.log(__filename)
console.log(__dirname)

console.log(path.join(__dirname,'../public'))

// define path for Express config
const staticPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
const app=express()

// setup handlebars engine and views location
app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)
// set up static directory to serve
app.use(express.static(staticPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Himanshu'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Himanshu'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'lorem ipsum help help',
        title:'Help',
        name:'Himanshu'
    })
})
 app.get('/weather',(req,res)=>{
    
    if(!req.query.address)
    {
        return res.send({
            error:'address is required'
        })
    }
        geocode(req.query.address,(error,{latitude=0,longitude=0,place_name}={})=>{
            if(error!=undefined)
            {
                return res.send({
                    error:'location not defined'
                })
            }
            console.log(latitude,longitude)
            forecast(latitude,longitude,(error,{temp_c,precip_in})=>{
                if(error!=undefined)
                {
                    return res.send({
                        error:'weather service unavailable'
                    })
                }
            res.send({
            location: place_name,
            forecast:'It is currently '+temp_c+' degrees out. There is a '+precip_in+'% chance of rain'
        })
            })
            
        })
 })
 app.get('/products',(req,res)=>{
    
    if(!req.query.search)
    {
       return  res.send('must provide search term')
    }

    console.log(req.query)
     res.send({
         products:[]
     })

 })
 app.get('/help/*',(req,res)=>{
     res.render('error',{
         message:'Help article not found',
         title:'Help article unfound',
         name:'Himanshu'
     })
 })

 app.get('*',(req,res)=>{
    res.render('error',{
        message:'Page not found',
        title:'Error 404',
        name:'Himanshu'
    })
})
app.listen(3000,()=>{
    console.log('server running on port:3000')
})
// app.com
