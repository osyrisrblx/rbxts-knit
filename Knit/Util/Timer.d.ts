import Janitor from "./Janitor";
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
	new (interval: number, janitor?: Janitor): Timer;
	Is(obj: unknown): obj is Timer;
	Simple: (interval: number, callback: () => void, updateSignal?: Signal, timeFunc?: () => number) => Connection
}

declare const Timer: TimerConstructor;

export = Timer;
