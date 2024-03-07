import { ServerMiddleware } from "../Types";

interface RemoteSignal<T extends Callback = Callback> {
	Fire(player: Player, ...args: Parameters<T>): void;
	FireAll(...args: Parameters<T>): void;
	FireExcept(player: Player, ...args: Parameters<T>): void;
	Wait(): LuaTuple<[Player, ...Parameters<T>]>;
	IsUnreliable(): boolean;
	Connect(handler: (player: Player, ...args: Parameters<T>) => void): RBXScriptConnection;
	Destroy(): void;
}

interface RemoteSignalConstructor {
	new <T extends Callback = Callback>(parent: Instance,
		name: string,
		unreliable?: boolean,
		inboundMiddleware?: ServerMiddleware,
		outboundMiddleware?: ServerMiddleware
		): RemoteSignal<T>;
}

declare const RemoteSignal: RemoteSignalConstructor;

export = RemoteSignal;
