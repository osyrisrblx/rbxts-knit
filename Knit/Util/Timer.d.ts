import Janitor from "./Janitor";
import Signal from "./Signal";

interface Timer {
	Tick: Signal;
	Start(): void;
	StartNow(): void;
	Stop(): void;
	Destroy(): void;
}

interface TimerConstructor {
	new (interval: number, janitor?: Janitor): Timer;
	Is(obj: unknown): obj is Timer;
}

declare const Timer: TimerConstructor;

export = Timer;
