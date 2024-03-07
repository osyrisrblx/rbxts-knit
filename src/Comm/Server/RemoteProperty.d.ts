import { ServerMiddleware } from "../Types";
import Signal from "../../Signal";

type ValueObjectClassNames = {
	[K in keyof Instances]: K extends `${infer U}Value` ? K : never;
}[keyof Instances];

interface RemoteProperty<T> {
	Replicate(): void;
	Set(value: T): void;
	SetTop(Value: T): void;
	SetFilter(predicate: (player: Player, value: T) => boolean, value: T): void;
	SetFor(player: Player, value: T): void;
	SetForList(players: Player[], value: T): void;
	ClearFor(player: Player): void;
	ClearForList(players: Player[]): void;
	ClearFilter(predicate: (player: Player) => boolean): void;
	Get(): T;
	GetFor(player: Player): T;
	Destroy(): void;
	readonly Changed: Signal<(value: T) => void>;
}

interface RemotePropertyConstructor {
	new <T>(parent: Instance,
		name: string,
		initialValue: any,
		inboundMiddleware?: ServerMiddleware,
		outboundMiddleware?: ServerMiddleware): RemoteProperty<T>;
	readonly Is: (object: unknown) => object is RemoteProperty<unknown>;
}

declare const RemoteProperty: RemotePropertyConstructor;

export = RemoteProperty;
