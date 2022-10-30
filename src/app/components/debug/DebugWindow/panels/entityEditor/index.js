import { useState } from "react";
import { useDispatch } from "react-redux";
import AddOrUpdate from "./AddOrUpdate";

import 'bootstrap';
import { addEntity, removeEntity } from "@store/slices/entities";
import Delete from "./Delete";

const EntityEditorPanel = () => {
	return(
		<div id="entity-panel" className="ps-3">
			<nav>
				<div className="nav nav-tabs justify-content-between" id="nav-tab">
					<button className="nav-link w-50 active" id="nav-add-tab" data-bs-toggle="tab" data-bs-target="#nav-add" type="button" role="tab" aria-controls="nav-add" aria-selected="true">Add / Update</button>
					<button className="nav-link w-50" id="nav-delete-tab" data-bs-toggle="tab" data-bs-target="#nav-delete" type="button" role="tab" aria-controls="nav-delete" aria-selected="true">Delete</button>
				</div>
			</nav>
			<div id="nav-tabContent" className="tab-content p-2 pt-3 mb-3">
				<div className="tab-pane fade show active" id="nav-add" role="tabpanel" aria-labelledby="nav-add-tab">
					<div>TODO : Archetype</div>
					<AddOrUpdate />
				</div>
				<div className="tab-pane fade" id="nav-delete" role="tabpanel" aria-labelledby="nav-delete-tab">
					<Delete />
				</div>
			</div>
		</div>
	);
}

export default EntityEditorPanel