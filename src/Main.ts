import WebSocket from 'ws';
import * as Http from 'http';
const clients: {
    [wsID: string]: WebSocket;
} = {};
const HttpServer = Http.createServer();
HttpServer.listen(7010, () => {
    console.log('server opened.')
})
const WSS = new WebSocket.Server({
    server: HttpServer
});

class WSClient {
    private ws: WebSocket;
    constructor(ws: WebSocket){
        this.ws = ws;
    }
    public send<T extends keyof Discord.WSServerMsg>(type: T, data: Discord.WSServerMsg[T]): void {
        const requestData: {type?: T} & Discord.WSServerMsg[T] = data;
        requestData.type = type;
        this.ws.send(JSON.stringify(requestData))
    }
    public onMessage<T extends keyof Discord.WSClientMsg>(onMessageCallback: (msg: {type: T} & Discord.WSClientMsg[T]) => void): void {
        this.ws.on('message', msg => {
            const msgObject = JSON.parse(msg as string);
            onMessageCallback(msgObject as any)
        })
    }
}
WSS.on('connection', ws => {
    const Client = new WSClient(ws);
    Client.onMessage(msg => {
        switch(msg.type){
            case 'hello':
                Client.send('hello', {
                    msg: 'hello, there!'
                })
                break;
        }
    })
})