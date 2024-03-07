import Signal, { Connection } from "./Signal";

interface Timer {
	Tick: Signal;
	Interval: number;
	UpdateSignal: Signal;
	TimeFunction: () => number;
	AllowDrift: boolean;

	Start(): void;
	StartNow(): void;
	Stop(): void;
	Destroy(): void;
}

interface TimerConstructor {
	new (interval: number): Timer;
	Is(obj: unknown): obj is Timer;
	Simple: (interval: number, callback: Callback, startNow?: boolean, updateSignal?: RBXScriptSignal, timeFn?: () => number) => Connection
}

declare const Timer: TimerConstructor;

export = Timer;
