import { ClientMiddleware } from "../Types";
import Signal from "../../Signal";

interface ClientRemoteProperty<T> {
	Get(): T;
	OnReady(): Promise<T>;
	IsReady(): boolean;
	Destroy(): void;
	Observe(observer: (value: T) => void): void; 
	readonly Changed: Signal<(value: T) => void>;
}

interface ClientRemotePropertyConstructor {
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

	new <T>(valueObject: RemoteEvent, inboundMiddleware?: ClientMiddleware, outboudMiddleware?: ClientMiddleware): ClientRemoteProperty<T>;
	new <T>(valueObject: Instance, inboundMiddleware?: ClientMiddleware, outboudMiddleware?: ClientMiddleware): ClientRemoteProperty<T>;
}

declare const ClientRemoteProperty: ClientRemotePropertyConstructor;

export = ClientRemoteProperty;
