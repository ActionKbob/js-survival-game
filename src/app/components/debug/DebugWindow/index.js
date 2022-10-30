import { useRef, useState } from "react";
import { useKeyPress } from "@utilities/hooks";
import { useEffect } from "react";

import 'bootstrap';
import '@styles/components/debug/index.scss';

const DebugWindow = ( { config } ) => {

	const ref = useRef( null );

	const { panels, openByDefault, minimizedByDefault } = config;

	const [ active, setActive ] = useState( openByDefault );
	const [ minimized, setMinimized ] = useState( minimizedByDefault );
	
	const windowToggle = useKeyPress( '~' );

	useEffect( () => {
		if( windowToggle )
			setActive( a => !a );
	}, [ windowToggle ] );

	let hideOffset = active ? 0 : ref.current ? -ref.current.offsetWidth : -1000;

	return(
		<div id="debug-window" ref={ ref } className={ `${ active ? 'active' : '' }` } style={ { left : hideOffset } }>
			{
				!minimized 
				?
				<div className="window-full d-flex flex-column justify-content-between h-100">
					{/* Panel Toggles */}
					<div  className='d-flex justify-content-between align-items-center border px-3' style={ { flex : '0 1 60px' } }>
						<div className='d-flex mt-3'>
						{ panels.map( ( { name, openByDefault }, i ) => {
							return(
								<div key={i} className="form-check form-switch me-3">
									<input className="d-flex form-check-input" role="button" defaultChecked={  openByDefault } type="checkbox" id={`panelSwitch${i}`}  data-bs-toggle="collapse" data-bs-target={`#collapse${name.replace(/ /g,'')}`} aria-expanded={  i === 0 ? true : false } aria-controls={`collapse${name.replace(/ /g,'')}`} />
									<label className="d-flex form-check-label" role="button" htmlFor={`panelSwitch${i}`}>{ name }</label>
								</div>
							);
						} ) }
						</div>
						<div onClick={ () => { setMinimized( m => !m ) } }>
							<span className="border rounded p-1 material-symbols-outlined" style={ { fontSize : "0.95rem", color : 'rgba(255,255,255,0.8)' } } role="button">close_fullscreen</span>
						</div>
					</div>

					{/* Panels */}
					<div className='d-flex border' style={ { flex : '1 0 calc(100vh - 60px)', overflowY : 'hidden' } }>
						{ panels.map( ( { name, Component, openByDefault }, i ) => {
							return(
								<div key={i} id={`collapse${name.replace(/ /g,'')}`} className={`collapse ${ openByDefault ? 'show' : '' } collapse-horizontal`} >
									<div className={`panel d-flex flex-column h-100 ${ i !== 0 ? 'border-start' : '' }`}>
										<div className='p-2 mb-2 border-bottom' style={ { flex : '0 1 40px' } }>{name} Panel</div>
										<div className='p-2 pe-4' style={ { flex : '1 0 calc(100% - 40px)', overflowY : 'overlay' } }>
											<Component />
										</div>
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
				:
				<div className={ `window-minimized` }>
					<div className="d-flex p-3">
						<div>
						{ panels.map( ( { name, Component, openByDefault, minimizable }, i ) => {
							if( minimizable )
							{
								return(
									<div key={i} id={`collapse${name.replace(/ /g,'')}`} className={`collapse ${ openByDefault ? 'show' : '' } collapse-horizontal`} >
										<Component />
									</div>
								);
							}
						} ) }
						</div>
						<div onClick={ () => { setMinimized( m => !m ) } }>
							<span className="border rounded p-1 material-symbols-outlined" style={ { fontSize : "0.95rem", color : 'rgba(255,255,255,0.8)' } } role="button">open_in_full</span>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default DebugWindow;