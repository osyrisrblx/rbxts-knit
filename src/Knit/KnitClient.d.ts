import { ClientRemoteProperty, ClientRemoteSignal, Controller, RemoteProperty, RemoteSignal, Service } from "..";

type GetThisType<T> = T extends (this: infer U, ...args: Array<any>) => any ? U : never;

type Method = (this: defined, ...args: Array<any>) => any;

type OmitFirstArg<T> = T extends (firstArg: any, ...args: infer P) => infer R
	? (this: GetThisType<T>, ...args: P) => R
	: never;

type PromisifyFunction<T> = T extends Method
	? OmitFirstArg<(this: GetThisType<T>, ...args: Parameters<T>) => Promise<ReturnType<T>>>
	: T;

type PromisifyService<T> = {
	[K in ExtractKeys<T, Method> & string as `${K}Promise`]: PromisifyFunction<T[K]>;
};

type MapValueToClient<T> = T extends Method
	? OmitFirstArg<T>
	: T extends RemoteProperty<infer U>
	? ClientRemoteProperty<U>
	: T extends RemoteSignal<infer U>
	? ClientRemoteSignal<U>
	: never;

type MapServiceToClient<T> = { [K in keyof T]: MapValueToClient<T[K]> };

type ServiceMirror<T> = T extends Service<{}, infer C> ? MapServiceToClient<C> & PromisifyService<C> : never;

interface KnitClient {
	Util: Folder;
	Start: () => Promise<void>;
	OnStart: () => Promise<void>;
	Controllers: KnitControllers;
	GetService: <T extends keyof KnitServices>(serviceName: T) => ServiceMirror<KnitServices[T]>;
	CreateController: <
		T extends {
			Name: string;
		}
	>(
		controller: T,
	) => Controller<T>;
	AddControllers: (folder: Instance) => void;
	AddControllersDeep: (folder: Instance) => void;
}

declare const KnitClient: KnitClient;
export = KnitClient;
