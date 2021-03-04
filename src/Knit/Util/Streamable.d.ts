import Maid from "./Maid";
import Signal from "./Signal";

interface Streamable {
	Instance: Instance | undefined;
	Observe(handler: (child: Instance, maid: Maid) => void): Signal.Connection;
	Destroy(): void;
}

interface StreamableConstructor {
	new (parent: Instance, childName: string): Streamable;
}

declare const Streamable: StreamableConstructor;

export = Streamable;
