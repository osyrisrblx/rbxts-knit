import Maid from "./Maid";
import Streamable from "./Streamable";

interface StreamableUtil {
	readonly Compound: (
		streamables: Array<Streamable>,
		handler: (streamables: { [child: string]: Instance }, maid: Maid) => void,
	) => Maid;
}

declare const StreamableUtil: StreamableUtil;

export = StreamableUtil;
