interface Symbol<T extends string> {
	readonly ClassName: "Symbol";
	/** @hidden */
	readonly _id: T;
	/** @hidden */
	readonly _nominal_Symbol: unique symbol;
}

interface SymbolConstructor {
	new (id: string, scope?: Symbol): Symbol;
	readonly Is: (obj: unknown) => obj is Symbol;
	readonly IsInScope: (obj: unknown, scope: Symbol) => boolean;
}

declare const Symbol: SymbolConstructor;

export = Symbol;
