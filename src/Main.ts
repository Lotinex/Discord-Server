import WebSocket from 'ws';
import * as Http from 'http';

import Express from 'express';
import Path from 'path';

const App = Express();

App.use(Express.static(Path.resolve(__dirname, 'public')));

App.listen(80, () => {
    console.log('Web Server Opened.')
})

const clients: {
    [wsID: string]: WSClient;
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
    public static generateID(): string {
        const s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + s4();
    }
    public static sendAll<T extends keyof Discord.WSServerMsg>(type: T, data: Discord.WSServerMsg[T]): void {
        for(const id in clients){
            clients[id].send(type, data)
        }
    }
}
WSS.on('connection', ws => {
    const Client = new WSClient(ws);
    clients[WSClient.generateID()] = Client;
    Client.onMessage(msg => {
        switch(msg.type){
            case 'hello':
                Client.send('hello', {
                    msg: 'hello, there!'
                })
                break;
            case 'sendMessage':
                WSClient.sendAll('newMessage', {
                    message: (<Discord.WSClientMsg['sendMessage']>msg).message
                })
                break;
        }
    })
})