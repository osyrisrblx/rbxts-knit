declare global {
	interface KnitServices {}
	interface KnitControllers {}
}

/**
 * A service is a singleton object that serves a specific purpose on the server.
 */
export type Service<S, C> = S & {
	/**
	 * The name of the service.
	 */
	readonly Name: string;

	/**
	 * A [ServiceClient](https://atollstudios.github.io/Knit/knitapi/#serviceclient) table that contains client-exposed
	 * methods and events.
	 */
	readonly Client: C;

	/**
	 * An optional method that is called during the KnitInit lifecycle stage
	 * (see [Execution Model](https://atollstudios.github.io/Knit/executionmodel/) for more info).
	 */
	KnitInit(): void;

	/**
	 * An optional method that is called during the KnitStart lifecycle stage
	 * (see [Execution Model](https://atollstudios.github.io/Knit/executionmodel/) for more info).
	 */
	KnitStart(): void;
};

export type Controller<T> = T & {
	/**
	 * The name of the controller.
	 */
	readonly Name: string;

	/**
	 * An optional method that is called during the KnitInit lifecycle stage
	 * (see [Execution Model](https://atollstudios.github.io/Knit/executionmodel/) for more info).
	 */
	KnitInit(): void;

	/**
	 * An optional method that is called during the KnitStart lifecycle stage
	 * (see [Execution Model](https://atollstudios.github.io/Knit/executionmodel/) for more info).
	 */
	KnitStart(): void;
};

export { default as KnitClient } from "../Knit/KnitClient";
export { default as KnitServer } from "../Knit/KnitServer";

export { default as RemoteProperty } from "../Comm/Server/RemoteProperty";
export { default as RemoteSignal } from "../Comm/Server/RemoteSignal";
export { default as ClientRemoteProperty } from "../Comm/Client/ClientRemoteProperty";
export { default as ClientRemoteSignal } from "../Comm/Client/ClientRemoteSignal";

export { default as Component } from "../Component";
export { default as Option } from "../Option";
export { default as Promise } from "../Promise";
export { default as Signal } from "../Signal";
export { default as Streamable } from "../Streamable/Streamable";
export { default as StreamableUtil } from "../Streamable/StreamableUtil";
export { default as TableUtil } from "../TableUtil";
export { default as Timer } from "../Timer";
