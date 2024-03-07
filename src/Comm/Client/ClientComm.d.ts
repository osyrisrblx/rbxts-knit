import { ClientMiddleware } from "../Types";
import ClientRemoteSignal from "../Client/ClientRemoteSignal";
import ClientRemoteProperty from "../Client/ClientRemoteProperty";

declare interface ClientComm {
    GetFunction(name: string,
        inboundMiddleware?: ClientMiddleware,
        outboundMiddleware?: ClientMiddleware): Callback
    GetSignal: (
        name: string,
        inboundMiddleware?: ClientMiddleware,
        outboundMiddleware?: ClientMiddleware
    ) => ClientRemoteSignal;
    GetProperty: <T>(
        name: string,
        inboundMiddleware?: ClientMiddleware,
        outboundMiddleware?: ClientMiddleware
    ) => ClientRemoteProperty<T>;
    BuildObject: (inboundMiddleware?: ClientMiddleware, outboundMiddleware?: ClientMiddleware) => Map<string, Callback | ClientRemoteSignal | ClientRemoteProperty<any>>;
    Destroy: () => void;
}

interface ClientCommConstructor {
    /**
     * @return ClientComm
     * Constructs a ClientComm object.
     * 
     * If `usePromise` is set to `true`, then `GetFunction` will generate a function that returns a Promise
     * that resolves with the server response. If set to `false`, the function will act like a normal
     * call to a RemoteFunction and yield until the function responds.
     * 
     * ```lua
     * local clientComm = ClientComm.new(game:GetService("ReplicatedStorage"), true)
     * 
     * -- If using a unique namespace with ServerComm, include it as second argument:
     * local clientComm = ClientComm.new(game:GetService("ReplicatedStorage"), true, "MyNamespace")
     * ```
     */
    new(parent: Instance, usePromise: boolean, namespace?: string): ClientComm;
}

declare const ClientComm: ClientCommConstructor;

export = ClientComm;