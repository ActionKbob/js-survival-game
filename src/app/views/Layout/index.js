import { Outlet } from "react-router-dom";
import DebugWindow from "@app_components/debug";
import NetworkingPanel from "@app_components/debug/panels/networking";

const Layout = () => {
	return(
		<>
			<Outlet />
			<DebugWindow config={
				{
					enabled : true,
					openByDefault : true,
					minimizeByDefault : false,
					panels : [
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