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
	 * A [ServiceClient](https://sleitnick.github.io/Knit/knitapi/#serviceclient) table that contains client-exposed
	 * methods and events.
	 */
	readonly Client: C;

	/**
	 * An optional method that is called during the KnitInit lifecycle stage
	 * (see [Execution Model](https://sleitnick.github.io/Knit/executionmodel/) for more info).
	 */
	KnitInit(): void;

	/**
	 * An optional method that is called during the KnitStart lifecycle stage
	 * (see [Execution Model](https://sleitnick.github.io/Knit/executionmodel/) for more info).
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
	 * (see [Execution Model](https://sleitnick.github.io/Knit/executionmodel/) for more info).
	 */
	KnitInit(): void;

	/**
	 * An optional method that is called during the KnitStart lifecycle stage
	 * (see [Execution Model](https://sleitnick.github.io/Knit/executionmodel/) for more info).
	 */
	KnitStart(): void;
};

export { default as KnitClient } from "./Knit/KnitClient";
export { default as KnitServer } from "./Knit/KnitServer";

export { default as RemoteProperty } from "./Knit/Util/Remote/RemoteProperty";
export { default as RemoteSignal } from "./Knit/Util/Remote/RemoteSignal";
export { default as ClientRemoteProperty } from "./Knit/Util/Remote/ClientRemoteProperty";
export { default as ClientRemoteSignal } from "./Knit/Util/Remote/ClientRemoteSignal";

export { default as Component } from "./Knit/Util/Component";
export { default as Loader } from "./Knit/Util/Loader";
export { default as Maid } from "./Knit/Util/Maid";
export { default as Option } from "./Knit/Util/Option";
export { default as Promise } from "./Knit/Util/Promise";
export { default as Ser } from "./Knit/Util/Ser";
export { default as Signal } from "./Knit/Util/Signal";
export { default as Streamable } from "./Knit/Util/Streamable";
export { default as StreamableUtil } from "./Knit/Util/StreamableUtil";
export { default as Symbol } from "./Knit/Util/Symbol";
export { default as TableUtil } from "./Knit/Util/TableUtil";
export { default as Thread } from "./Knit/Util/Thread";
