interface Thread {
	readonly SpawnNow: <T extends (...args: any) => any>(func: T, ...args: Parameters<T>) => void;

	readonly Spawn: <T extends (...args: any) => any>(func: T, ...args: Parameters<T>) => void;

	readonly Delay: <T extends (...args: any) => any>(
		waitTime: number,
		func: T,
		...args: Parameters<T>
	) => RBXScriptConnection;

	readonly DelayRepeatBehavior: {
		readonly Delayed: unique symbol;
		readonly Immediate: unique symbol;
	};

	readonly DelayRepeat: <T extends (...args: any) => any>(
		intervalTime: number,
		func: T,
		behavior: Thread["DelayRepeatBehavior"][keyof Thread["DelayRepeatBehavior"]],
		...args: Parameters<T>
	) => RBXScriptConnection;
}

declare const Thread: Thread;
export = Thread;
