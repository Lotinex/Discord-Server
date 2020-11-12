export default class Discord {
    private ws: WebSocket;
    private static serverURL = 'ws://clonecord.herokuapp.com';
    constructor(ws: WebSocket){
        this.ws = ws;
    }
    public request<T extends keyof Discord.WSClientMsg>(type: T, data: Discord.WSClientMsg[T]): void {
        const requestData: {type?: T} & Discord.WSClientMsg[T] = data;
        requestData.type = type;
        this.ws.send(JSON.stringify(requestData))
    }
    public static connect(): Discord {
        return new Discord(new WebSocket(Discord.serverURL));
    }
    public onMessage<T extends keyof Discord.WSServerMsg>(onMessageCallback: (msg: {type: T} & Discord.WSServerMsg[T]) => void): void {
        this.ws.onmessage = function(event){
            const msgObject = JSON.parse(event.data)
            onMessageCallback(msgObject)
        }
    }
    public set onReady(onReadyCallback: () => void){
        this.ws.onopen = onReadyCallback;
    }
}
