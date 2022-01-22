const socket = io();

$('#chat-box').hide();

$('#sendbtn').click(() => {
    const text = $('#inp').val();
    
    //emit is used to send anything on pipeline
    socket.emit('send-msg',{
        msg:text
    })
    $('#inp').val("");
})

socket.on('rec-msg',(d)=>{
    $('#chat').append(`<li class="border p-2 ms-0 rounded-pill mb-2"><strong>${d.username}:</strong> - <span>${d.msg}</span></li>`)
    
})

$('#loginbtn').click(()=>{
    const username=$('#name').val();

    socket.emit('login',{
        username:username
    });

    $('#login').hide();
    $('#chat-box').show();

    $('#name').val("");
})