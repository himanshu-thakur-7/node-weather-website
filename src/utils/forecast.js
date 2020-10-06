const request=require('request')

const forecast=(lat,long,callback)=>
{
   const url='https://api.weatherapi.com/v1/current.json?key=1a959342753e4ba398c124522200310&q='+encodeURIComponent(lat)+','+encodeURIComponent(long)

   request({url,json:true},(error,{body})=>{
       if(error)
       {
         callback('unable to connect to weather service',undefined)
       }
       else if(body.error)
       {
         callback('unable to get location',undefined)
       }
       else{
         const currentCond=body.current
         callback(undefined,currentCond)
       }
   })

}


module.exports=forecast