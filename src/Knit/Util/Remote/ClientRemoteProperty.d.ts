import Signal from "../Signal";

interface ClientRemoteProperty<T> {
	Get(): T;
	Destroy(): void;
	readonly Changed: Signal<(value: T) => void>;
}

interface ClientRemotePropertyConstructor {
	new (valueObject: BinaryStringValue): ClientRemoteProperty<string>;
	new (valueObject: BoolValue): ClientRemoteProperty<boolean>;
	new (valueObject: BrickColorValue): ClientRemoteProperty<BrickColor>;
	new (valueObject: CFrameValue): ClientRemoteProperty<CFrame>;
	new (valueObject: Color3Value): ClientRemoteProperty<Color3>;
	new (valueObject: DoubleConstrainedValue): ClientRemoteProperty<number>;
	new (valueObject: IntConstrainedValue): ClientRemoteProperty<number>;
	new (valueObject: IntValue): ClientRemoteProperty<number>;
	new (valueObject: NumberValue): ClientRemoteProperty<number>;
	new (valueObject: ObjectValue): ClientRemoteProperty<Instance>;
	new (valueObject: RayValue): ClientRemoteProperty<Ray>;
	new (valueObject: StringValue): ClientRemoteProperty<string>;
	new (valueObject: Vector3Value): ClientRemoteProperty<Vector3>;

	new <T>(valueObject: RemoteEvent): ClientRemoteProperty<T>;
	new <T>(valueObject: Instance): ClientRemoteProperty<T>;
}

declare const ClientRemoteProperty: ClientRemotePropertyConstructor;

export = ClientRemoteProperty;
