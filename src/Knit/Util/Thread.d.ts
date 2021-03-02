interface Thread {
	SpawnNow: <T extends (...args: any) => any>(func: T, ...args: Parameters<T>) => void;

	Spawn: <T extends (...args: any) => any>(func: T, ...args: Parameters<T>) => void;

	Delay: <T extends (...args: any) => any>(waitTime: number, func: T, ...args: Parameters<T>) => RBXScriptConnection;

	DelayRepeatBehavior: {
		readonly Delayed: unique symbol;
		readonly Immediate: unique symbol;
	};

	DelayRepeat: <T extends (...args: any) => any>(
		intervalTime: number,
		func: T,
		behavior: Thread["DelayRepeatBehavior"][keyof Thread["DelayRepeatBehavior"]],
		...args: Parameters<T>
	) => RBXScriptConnection;
}

declare const Thread: Thread;
export = Thread;
