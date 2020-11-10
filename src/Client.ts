import {io} from 'socket.io-client';
import Socket from 'socket.io-client';

class Discord {
    private socket: Socket.Socket;
    private static serverURL = 'http://lotix.kro.kr:7010';
    constructor(socket: Socket.Socket){
        this.socket = socket;
    }
    public request<T extends keyof Discord.SocketRequestCallback, A extends ArgsOf<Discord.SocketRequestCallback[T]>>(
        event: T,
        ...args: A
    ): Promise<Discord.SocketResponseType[T]> {
        return new Promise((resolve, reject) => {
            this.socket.emit(event, ...args)
            this.socket.on(`${event}-response`, resolve)
        })
    }
    public connect(connectOptions: Discord.ConnectOptions): Discord | null {
        const client = new Discord(io(Discord.serverURL));
        let authSuccess = false;
        client.request('client-auth', connectOptions['auth-token']).then(res => {
            authSuccess = true;
        })
        if(authSuccess) return client;
        return null;
    }
}