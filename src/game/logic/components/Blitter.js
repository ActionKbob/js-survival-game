import { defineComponent, Types } from "bitecs";
import componentMap from ".";

const Blitter = defineComponent( {
	frame : Types.ui32,
	origin_x : Types.f32,
	origin_y : Types.f32,
	dirty : Types.ui8
} );

componentMap.Blitter = Blitter;

export default Blitter;