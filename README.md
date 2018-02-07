## Mmque client for javascript

## Install 
> npm install --save mmque-client-js

## Usage
    
     const Mmque = require("mmque-client-js/app");
     const option = {
        host : "127.0.0.1",
        port : 8087
     }
     
     let client = New Mmque(option);
     
     let errorCount = 0;
     client.Error(err => {
         errorCount ++;
         if(errorCount > 5){
             client = new Mmque(option)
             // You can reconnect by your self or use client.Reconnect();
         }
     });
     
     client.Receive(data=>{
         console.log(data) //-> {ID:string,Msg:string,Status:string};
     });
     
     client.Pull({Channal:"test"});
     client.NewVersion({Channal:"test1"}).then(version => client.Push({Channal:"test2",Msg:string,Version:version}));
     client.Ack({Channal:"test1",Version:5});
