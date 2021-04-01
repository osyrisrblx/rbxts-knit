interface Option<T = unknown> {
	Serialize(): { ClassName: string; Value: T };
	Match<U>(matches: { Some: (value: T) => U; None: () => U }): U;
	IsSome(): boolean;
	IsNone(): boolean;
	Expect(msg?: string): T;
	ExpectNone(msg?: string): void;
	Unwrap(): T;
	UnwrapOr(defaultValue: T): T;
	UnwrapOrElse(defaultFunc: () => T): T;
	And(optB: Option<T>): Option<T>;
	AndThen(andThenFunc: () => Option<T>): Option<T>;
	Or(optB: Option<T>): Option<T>;
	OrElse(orElseFunc: () => Option<T>): Option<T>;
	XOr(optB: Option<T>): Option<T>;
	Filter(predicate: (value: T) => boolean): Option<T>;
	Contains(value: T): boolean;
}

interface OptionConstructor {
	readonly Some: <T>(value: T) => Option<T>;
	readonly Wrap: <T>(value: T) => Option<T>;
	readonly Is: (obj: unknown) => obj is Option;
	readonly Assert: (obj: unknown) => asserts obj is Option;
	readonly Deserialize: (data: unknown) => Option;
	readonly None: Option;
}

declare const Option: OptionConstructor;
export = Option;
