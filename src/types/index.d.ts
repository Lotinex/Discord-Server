type ArgsOf<T> = T extends (...args: infer A) => any ? A : never;
declare namespace Discord {
    interface SocketRequestCallback {
        'client-auth': (token: string) => void;
        'test': (message: string) => void;
    }
    interface SocketResponseType {
        'client-auth': boolean;
        'test': string;
    }
    interface SocketSend {
        
    }
    interface ConnectOptions {
        'auth-token': string;
    }
}
