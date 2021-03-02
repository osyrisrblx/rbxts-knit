interface Symbol {
	/** @hidden */
	readonly _nominal_Symbol: unique symbol;
}

interface SymbolConstructor {
	new (id: string, scope?: Symbol): Symbol;
	Is: (obj: unknown) => obj is Symbol;
	IsInScope: (obj: unknown, scope: Symbol) => boolean;
}

declare const Symbol: SymbolConstructor;

export = Symbol;
