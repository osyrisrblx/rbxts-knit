interface Trove {
    Extend(): Trove;
    Clone(instance: Instance): Instance;
    Construct<T>(fn: () => T): T;
    Construct<T>(clazz: new () => T): T;
    Connect(signal: RBXScriptSignal, fn: Callback): RBXScriptConnection;
    BindToRenderStep(name: string, priority: number, fn: (dt: number) => any): void;
    AddPromise<T>(promise: Promise<T>): Promise<T>;
    Add<T>(object: T, cleanupMethod?: string): T;
    Remove(object: any): boolean;
    Clean(): void;
    AttachToInstance(instance: Instance): void;
    Destroy(): void;
}

interface TroveConstructor {
    new(): Trove;
}

declare const Trove: TroveConstructor;

export = Trove;