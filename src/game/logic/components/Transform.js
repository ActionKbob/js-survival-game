import { defineComponent, Types } from "bitecs";
import { Vectorf32 } from "@game/structs";
import componentMap from ".";

export const Transform = defineComponent( {
	x : Types.f32,
	y : Types.f32
} );

componentMap.Transform = Transform;

export default Transform;