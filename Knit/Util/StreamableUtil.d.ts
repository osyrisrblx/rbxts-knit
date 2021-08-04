import Janitor from "./Janitor";
import Streamable from "./Streamable";

interface StreamableUtil {
	readonly Compound: (
		streamables: Array<Streamable>,
		handler: (streamables: { [child: string]: Instance }, janitor: Janitor) => void,
	) => Janitor;
}

declare const StreamableUtil: StreamableUtil;

export = StreamableUtil;
