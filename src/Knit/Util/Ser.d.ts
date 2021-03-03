/**
 * Ser is a serialization/deserialization utility module that is used
 * by Knit to automatically serialize/deserialize values passing
 * through remote functions and remote events.
 */
interface Ser {
	Classes: {
		[className: string]: {
			Serialize: (value: unknown) => unknown;
			Deserialize: (value: unknown) => unknown;
		};
	};

	SerializeArgs: (...args: Array<unknown>) => Array<unknown>;
	SerializeArgsAndUnpack: (...args: Array<unknown>) => LuaTuple<Array<unknown>>;
	DeserializeArgs: (...args: Array<unknown>) => Array<unknown>;
	DeserializeArgsAndUnpack: (...args: Array<unknown>) => LuaTuple<Array<unknown>>;
	Serialize: (value: unknown) => unknown;
	Deserialize: (value: unknown) => unknown;
	UnpackArgs: (...args: Array<unknown>) => Array<unknown>;
}

export = Ser;
