/**
 * Ser is a serialization/deserialization utility module that is used
 * by Knit to automatically serialize/deserialize values passing
 * through remote functions and remote events.
 */
interface Ser {
	readonly Classes: {
		[className: string]: {
			readonly Serialize: (value: unknown) => unknown;
			readonly Deserialize: (value: unknown) => unknown;
		};
	};

	readonly SerializeArgs: (...args: Array<unknown>) => Array<unknown>;
	readonly SerializeArgsAndUnpack: (...args: Array<unknown>) => LuaTuple<Array<unknown>>;
	readonly DeserializeArgs: (...args: Array<unknown>) => Array<unknown>;
	readonly DeserializeArgsAndUnpack: (...args: Array<unknown>) => LuaTuple<Array<unknown>>;
	readonly Serialize: (value: unknown) => unknown;
	readonly Deserialize: (value: unknown) => unknown;
	readonly UnpackArgs: (...args: Array<unknown>) => Array<unknown>;
}

export = Ser;
