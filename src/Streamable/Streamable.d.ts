import Signal from "Signal";

interface Streamable {
	readonly Instance: Instance | undefined;
	Observe(handler: (child: Instance) => void): Signal.Connection;
	Destroy(): void;
}

interface StreamableConstructor {
	new (parent: Instance, childName: string): Streamable;
}

declare const Streamable: StreamableConstructor;

export = Streamable;