import { defineComponent } from "bitecs";
import { Vectorf32 } from "@game/structs";
import componentMap from ".";

export const Transform = defineComponent( Vectorf32 );

componentMap.Transform = Transform;

export default Transform;