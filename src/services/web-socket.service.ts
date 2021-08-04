import {Injectable} from "@tsed/di";
import { Args, Emit, Input, IO, Nsp, Socket, SocketService, SocketSession,  } from "@tsed/socketio";
import * as SocketIO from "socket.io";

@Injectable()
@SocketService("/ws")
export class WebSocketService {

    @Nsp nsp: SocketIO.Namespace;

    constructor(@IO private io: SocketIO.Server){

    }

    @Input("message")
    @Emit("messageResponse")
    public handleMessage(@Args(0) data: any, @Nsp socket: SocketIO.Socket){
        return data;
    }


    $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession){
        socket.emit("message", "Hello, World!");
        console.log("asdfasdf");
    }

    $onDisconnect(@Socket socket: SocketIO.Socket) {

    }
}
