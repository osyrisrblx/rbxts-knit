interface RemoteSignal<T extends Callback = Callback> {
	Fire(player: Player, ...args: Parameters<T>): void;
	FireAll(...args: Parameters<T>): void;
	FireExcept(player: Player, ...args: Parameters<T>): void;
	Wait(): LuaTuple<[Player, ...Parameters<T>]>;
	Connect(handler: (player: Player, ...args: Parameters<T>) => void): RBXScriptConnection;
	Destroy(): void;
}

interface RemoteSignalConstructor {
	new <T extends Callback = Callback>(): RemoteSignal<T>;
}

declare const RemoteSignal: RemoteSignalConstructor;

export = RemoteSignal;
