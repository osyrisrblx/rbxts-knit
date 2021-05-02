import Symbol from "./Symbol";

interface Thread {
	readonly SpawnNow: <T extends (...args: any) => any>(func: T, ...args: Parameters<T>) => void;

	readonly Spawn: <T extends (...args: any) => any>(func: T, ...args: Parameters<T>) => void;

	readonly Delay: <T extends (...args: any) => any>(
		waitTime: number,
		func: T,
		...args: Parameters<T>
	) => RBXScriptConnection;

	readonly DelayRepeatBehavior: {
		readonly Delayed: Thread.DelayRepeatBehavior.Delayed;
		readonly Immediate: Thread.DelayRepeatBehavior.Immediate;
	};

	readonly DelayRepeat: <T extends (...args: any) => any>(
		intervalTime: number,
		func: T,
		behavior?: Thread.DelayRepeatBehavior,
		...args: Parameters<T>
	) => RBXScriptConnection;
}

declare namespace Thread {
	export namespace DelayRepeatBehavior {
		type Delayed = Symbol<"Delayed">;
		type Immediate = Symbol<"Immediate">;
	}
	type DelayRepeatBehavior = DelayRepeatBehavior.Delayed | DelayRepeatBehavior.Immediate;
}

declare const Thread: Thread;
export = Thread;
