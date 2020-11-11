

type ArgsOf<T> = T extends (...args: infer A) => any ? A : never;
declare namespace Discord {
    interface WSClientMsg {
        'hello': {
            msg: string;
        }
    }
    interface WSServerMsg {
        'hello': {
            msg: string;
        }
    }
}
