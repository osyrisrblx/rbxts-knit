/* eslint-disable @typescript-eslint/no-explicit-any */

import ClientRemoteProperty from "./Knit/Util/Remote/ClientRemoteProperty";
import ClientRemoteSignal from "./Knit/Util/Remote/ClientRemoteSignal";
import RemoteProperty from "./Knit/Util/Remote/RemoteProperty";
import RemoteSignal from "./Knit/Util/Remote/RemoteSignal";

export type Service<S, C> = S & {
	Name: string;
	Client: C;
	KnitInit(): void;
	KnitStart(): void;
};

export type Controller<T> = T & {
	Name: string;
	KnitInit(): void;
	KnitStart(): void;
};

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

export type ServiceMirror<T> = T extends Service<{}, infer C> ? MapServiceToClient<C> & PromisifyService<C> : never;

export interface Knit {
	Util: Folder;
	Start: () => Promise<void>;
	OnStart: () => Promise<void>;
}

export interface KnitServer extends Knit {
	Services: KnitServices;
	CreateService: <
		T extends {
			Name: string;
			KnitStart?(): void;
			KnitInit?(): void;
			Client?: U;
		},
		U
	>(
		service: T,
	) => Service<T, U>;
	AddServices: (folder: Instance) => void;
	AddServicesDeep: (folder: Instance) => void;
}

export interface KnitClient extends Knit {
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
