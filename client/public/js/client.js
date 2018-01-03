$(document).ready(function(){
//init
$('#warning').hide();
var socket=io();
//Stop watch
var intervalID;
var count=1;
$('#start').click(function(){
    console.log("start clicked");
    intervalID=setInterval(function(){
        if(count>99){
            count=1;
        }
        socket.emit('counter',count);
        $('#counter').text(("0" + count).slice(-2));
        count++;
    },1000)
})
$('#stop').click(function(){
    clearInterval(intervalID);
})
$('#reset').click(function(){
    count=0;
    socket.emit('counter',count);
    $('#counter').text(count);
})
//math expression
$('#expBtn').click(function(){
    var exp=$('#expTxt').val();
    var result=eval(exp);
    if(result.toString().length>2){
        $('#warning').show();
    }else{
        $('#warning').hide();
        socket.emit('counter',result);
    }
    
})
// binary to decimal
$('#bnBtn').click(function(){
    var binary=$('#bnTxt').val();
    var result=parseInt(binary,2);
     if(result.toString().length>2){
        $('#warning').show();
    }else{
        $('#warning').hide();
        socket.emit('counter',result);
    }
    
    
})
//any number
$('#numBtn').click(function(){
    var result=$('#numTxt').val();
    if(result.toString().length>2){
        $('#warning').show();
    }else{
        $('#warning').hide();
        socket.emit('counter',result);
    }
})

})
