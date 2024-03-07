interface Symbol<T extends string> {
	readonly ClassName: "Symbol";
	/** @hidden */
	readonly _id: T;
	/** @hidden */
	readonly _nominal_Symbol: unique symbol;
}

interface SymbolConstructor {
	new <T extends string>(id: string, scope?: Symbol<T>): Symbol<T>;
	readonly Is: <T extends string>(obj: unknown) => obj is Symbol<T>;
	readonly IsInScope: <T extends string>(obj: unknown, scope: Symbol<T>) => boolean;
}

declare const Symbol: SymbolConstructor;

export = Symbol;