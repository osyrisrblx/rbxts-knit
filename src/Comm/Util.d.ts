import Option from "../Option";

interface Util {
    readonly IsServer: boolean;
    readonly WaitForChildTimeout: boolean;
    readonly DefaultCommFolderName: string;
    readonly None: any;

    readonly GetCommSubFolder: (parent: Instance, subFolderName: string) => Option;
}

declare const Util: Util;

export = Util;