import { Service } from "..";

interface KnitServer {
	Util: Folder;
	Start: () => Promise<void>;
	OnStart: () => Promise<void>;
	Services: KnitServices;
	CreateService: <T extends Partial<Service<{}, U>>, U>(service: T) => Service<T, U>;
	AddServices: (folder: Instance) => void;
	AddServicesDeep: (folder: Instance) => void;
}

declare const KnitServer: KnitServer;
export = KnitServer;
