import RemoteProperty from "../Server/RemoteProperty";
import RemoteSignal from "../Server/RemoteSignal";
import { FnBind, ServerMiddleware } from "../Types";

declare interface ServerComm {
    BindFunction(name: string,
        fn: FnBind,
        inboundMiddleware?: ServerMiddleware,
        outboundMiddleware?: ServerMiddleware): RemoteFunction
    WrapMethod: (
        tbl: any,
	    name: string,
        inboundMiddleware?: ServerMiddleware,
        outboundMiddleware?: ServerMiddleware
    ) => RemoteFunction;
    CreateSignal: <T extends Callback = Callback>(
        name: string,
	    unreliable?: boolean,
        inboundMiddleware?: ServerMiddleware,
        outboundMiddleware?: ServerMiddleware
    ) => RemoteSignal<T>;
    CreateProperty: <T>(
        name: string,
        initialValue: T,
        inboundMiddleware?: ServerMiddleware,
        outboundMiddleware?: ServerMiddleware
    ) => RemoteProperty<T>;
    Destroy: () => void;
}

interface ServerCommConstructor {
    new(parent: Instance, namespace?: string): ServerComm;
}

declare const ServerComm: ServerCommConstructor;

export = ServerComm;