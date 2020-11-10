import SocketIO from 'socket.io';
import * as Http from 'http';
import * as SETTINGS from './data/settings.json';

const Server = Http.createServer();

const Socket = SocketIO(Server);
const clients: {
    [socketID: string]: SocketClient;
} = {};

class SocketClient {
    private socket: SocketIO.Socket;
    public authenticated: boolean = false;
    constructor(socket: SocketIO.Socket){
        this.socket = socket;
    }
    public send<T extends keyof Discord.SocketSend>(): void {
    }
    public on<T extends keyof Discord.SocketRequestCallback>(event: T, callback: Discord.SocketRequestCallback[T]): void {
        this.socket.on(event, callback)
    }
}
Socket.on('connect', socket => {
    const Client = new SocketClient(socket);
    clients[socket.id] = Client;

    clients[socket.id].on('client-auth', token => {
        if(token === SETTINGS['API_AUTH_TOKEN']){
            clients[socket.id].authenticated = true;
        }
    })
    if(clients[socket.id].authenticated){
        onSocketRequest(clients[socket.id]);
    }
})
function onSocketRequest(Client: SocketClient): void {
    Client.on('test', message => {
        console.log(`새 클라이언트로부터 받은 메시지: ${message}`)
    })
}
Server.listen(7010, () => {
    console.log('Socket Server Opened.')
})