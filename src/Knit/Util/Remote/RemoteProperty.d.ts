type ValueObjectClassNames = {
	[K in keyof Instances]: K extends `${infer U}Value` ? K : never;
}[keyof Instances];

interface RemoteProperty<T> {
	Replicate(): void;
	Set(value: T): void;
	Get(): T;
	Destroy(): void;
}

interface RemotePropertyConstructor {
	new <T>(value: T, overrideClass?: ValueObjectClassNames): RemoteProperty<T>;
	Is: (object: unknown) => object is RemoteProperty<unknown>;
}

declare const RemoteProperty: RemotePropertyConstructor;

export = RemoteProperty;
