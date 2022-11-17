import { Outlet } from "react-router-dom";
import DebugWindow from "@app_components/debug";
import EntityEditorPanel from "@app_components/debug/panels/entityEditor";
import NetworkingPanel from "@app_components/debug/panels/networking";
import ChatPanel from "@app_components/ChatPanel";
import { useSelector } from "react-redux";
import { LOBBY_STATES } from "@networking/enums";

const Layout = () => {

	const { status } = useSelector( state => state.lobby );

	return(
		<>
			{
				status === LOBBY_STATES[1] &&
				<ChatPanel />
			}
			<Outlet />
			<DebugWindow config={
				{
					enabled : true,
					openByDefault : true,
					minimizeByDefault : false,
					panels : [
						{
							name : "Entity Editor",
							openByDefault : false,
							Component : EntityEditorPanel
						},
						{
							name : "Networking",
							openByDefault : true,
							Component : NetworkingPanel
						}
					]
				}
			} />
		</>
	);
}

export default Layout;