export type Args = {
	n: number,
	p: Map<any, any>,
}

export type FnBind = (instance: Instance, ...args: any[]) => any[]

export type ServerMiddlewareFn = (instance: Instance, args: Args) => LuaTuple<[boolean, any[]]>
export type ServerMiddleware = ServerMiddlewareFn[]

export type ClientMiddlewareFn = (args: Args) => LuaTuple<[boolean, any[]]>
export type ClientMiddleware = ClientMiddlewareFn[]