export interface ComponentClass {
	Destroy(): void;
	Init?(): void;
	Deinit?(): void;
	HeartbeatUpdate?(): void;
	SteppedUpdate?(): void;
	RenderUpdate?(): void;
}

export interface ComponentClassConstructor<T extends ComponentClass> {
	Tag?: string;
	new (instance: Instance): T;
}

export interface Component<T extends ComponentClass> {
	GetAll(): Array<T>;
	GetFromInstance(instance: Instance): T | undefined;
	GetFromID(id: string): T | undefined;
	Filter(filterFunc: (v: T, i: number, t: Array<T>) => boolean): Array<T>;
	WaitFor(instance: Instance, timeout: number): Promise<T>;
	Destroy(): void;
}

export interface ComponentConstructor {
	FromTag: (tag: string) => Component<ComponentClass>;
	Auto: (folder: Folder) => void;
	new <T extends ComponentClass>(
		tag: string,
		classConstructor: ComponentClassConstructor<T>,
		renderPriority?: number,
	): Component<T>;
}
