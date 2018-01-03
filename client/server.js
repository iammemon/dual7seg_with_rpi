var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var zerorpc = require("zerorpc");

app.use(express.static('public'));
var client = new zerorpc.Client();
client.connect("tcp://192.168.137.15:4242");



app.get('/',function(req,res){
    res.sendfile(__dirname+'/public/index.html');
});

io.on('connection',function(socket){
    console.log('Connected');
    socket.on('disconnect',function(){
        console.log('disconnected');
    });
    socket.on('counter',function(value){
        client.invoke("SetDual7Seg",parseInt(value),function(err,res,more){
            if(err){
                console.log(err);
            }
        })
    })
})

http.listen(3000,function(){
    console.log('App is listening to port 3000');
})
