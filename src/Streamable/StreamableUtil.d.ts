import Streamable from "Streamable/Streamable";
import Trove from "Trove";

type Streamables = Streamable[];
type CompoundHandler = (streamables: Streamables, args: any) => void;

interface StreamableUtil {
	readonly Compound: (streamables: Array<Streamable>, handler: CompoundHandler) => Trove;
}

declare const StreamableUtil: StreamableUtil;

export = StreamableUtil;