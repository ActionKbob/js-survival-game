import { sandboxConfig } from "./sandbox";
import { testGame } from "./testGame";
import { networkTestConfig } from "./networkTest";

const game_types = [
	sandboxConfig,
	testGame,
	networkTestConfig
];

export default game_types;