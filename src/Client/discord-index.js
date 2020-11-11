const discord = Discord.connect();
discord.onReady = function(){
    discord.request('hello', {
        msg: 'hello?'
    })
}
discord.onMessage(msg => {
    switch(msg.type){
        case 'hello':
            console.log(msg.msg)
            break;
    }
})