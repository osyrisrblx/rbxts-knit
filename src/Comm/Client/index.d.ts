import { ClientMiddleware, ClientMiddlewareFn } from "Comm/Types"
import ClientRemoteSignal from "Comm/Client/ClientRemoteSignal"
import ClientRemoteProperty from "Comm/Client/ClientRemoteProperty";

interface Client {
    GetFunction: (
        parent: Instance,
        name: string,
        usePromise: boolean,
        inboundMiddleware?: ClientMiddleware,
        outboundMiddleware?: ClientMiddleware
    ) => Callback;
    GetSignal: (
        parent: Instance,
        name: string,
        inboundMiddleware?: ClientMiddleware,
        outboundMiddleware?: ClientMiddleware
    ) => ClientRemoteSignal;
    GetProperty: <T>(
        parent: Instance,
        name: string,
        inboundMiddleware?: ClientMiddleware,
        outboundMiddleware?: ClientMiddleware
    ) => ClientRemoteProperty<T>;
}