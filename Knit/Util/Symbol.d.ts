interface Symbol<T extends string> {
	readonly ClassName: "Symbol";
	/** @hidden */
	readonly _id: T;
	/** @hidden */
	readonly _nominal_Symbol: unique symbol;
}

interface SymbolConstructor {
	new <T extends string>(id: T, scope?: Symbol<string>): Symbol<T>;
	readonly Is: (obj: unknown) => obj is Symbol<string>;
	readonly IsInScope: (obj: unknown, scope: Symbol<string>) => boolean;
}

declare const Symbol: SymbolConstructor;

export = Symbol;
