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

export { default as KnitClient } from "./KnitClient";
export { default as KnitServer } from "./KnitServer";

export { default as RemoteProperty } from "./Util/Remote/RemoteProperty";
export { default as RemoteSignal } from "./Util/Remote/RemoteSignal";
export { default as ClientRemoteProperty } from "./Util/Remote/ClientRemoteProperty";
export { default as ClientRemoteSignal } from "./Util/Remote/ClientRemoteSignal";

export { default as Component } from "./Util/Component";
export { default as Janitor } from "./Util/Janitor";
export { default as Loader } from "./Util/Loader";
export { default as Option } from "./Util/Option";
export { default as Promise } from "./Util/Promise";
export { default as Ser } from "./Util/Ser";
export { default as Signal } from "./Util/Signal";
export { default as Streamable } from "./Util/Streamable";
export { default as StreamableUtil } from "./Util/StreamableUtil";
export { default as Symbol } from "./Util/Symbol";
export { default as TableUtil } from "./Util/TableUtil";
export { default as Timer } from "./Util/Timer";
