import Maid from "./Maid";

declare namespace Signal {
	export interface Connection {
		Disconnect(): void;
		IsConnected(): boolean;
	}
}

interface Signal<T extends Callback = Callback> {
	Fire(...args: Parameters<T>): void;
	Wait(): LuaTuple<Parameters<T>>;
	WaitPromise(): Promise<Parameters<T>[0]>;
	Connect(handler: T): Signal.Connection;
	DisconnectAll(): void;
	Destroy(): void;
}

interface SignalConstructor {
	new <T extends Callback = Callback>(maid?: Maid): Signal<T>;
	readonly Is: (obj: unknown) => obj is Signal<Callback>;
	readonly Proxy: <T extends Callback>(rbxScriptSignal: RBXScriptSignal<T>, maid?: Maid) => Signal<T>;
}

declare const Signal: SignalConstructor;
export = Signal;
