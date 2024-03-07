import { FnBind, ServerMiddleware } from "../Types";
import RemoteSignal from "../Server/RemoteSignal";

interface Server {
    BindFunction: (
        parent: Instance,
        name: string,
        func: FnBind,
        inboundMiddleware?: ServerMiddleware,
        outboundMiddleware?: ServerMiddleware
    ) => RemoteFunction;
    WrapMethod: (
        parent: Instance,
        tbl: {},
        name: string,
        inboundMiddleware?: ServerMiddleware,
        outboundMiddleware?: ServerMiddleware
    ) => RemoteFunction;
    CreateSignal: (
        parent: Instance,
        name: string,
        reliable?: boolean,
        inboundMiddleware?: ServerMiddleware,
        outboundMiddleware?: ServerMiddleware
    ) => RemoteSignal;
}