console.log('client side javascript loaded')
// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//       console.log(data)
//     })

// })

const weatherForm=document.querySelector('form');
const input=document.querySelector('input');
const message1=document.querySelector('#message1')

const message2=document.querySelector('#message2')

message1.textContent=''
message2.textContent=''

weatherForm.addEventListener('submit',(event)=>{  
    
     event.preventDefault()
    console.log('test')
     console.log(input.value)
     message1.textContent='loading...'
     message2.textContent=''
 const url='http://localhost:3000/weather?address='+encodeURIComponent(input.value);
fetch(url).then((res)=>{
    res.json().then((data)=>{
        if(data.error)
        { 
            
         console.log(data.error)
         message1.textContent="error:"+data.error
         message2.textContent=''
        }
        else{
       message1.textContent= 'Location:'+data.location
       message2.textContent='forecast:'+data.forecast
        }
    })
})
})

