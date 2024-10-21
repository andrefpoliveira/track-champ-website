import './Sidebar.css';
import React from "react";

import { FaUsers } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { BsChevronBarLeft } from "react-icons/bs";
import { BsChevronBarRight } from "react-icons/bs";

export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: true
		};
	}

	toggleOpen() {
		this.setState({ sidebarOpen: !this.state.sidebarOpen })
	}

	render() {
		return (
			<div id="sidebar" className={this.state.sidebarOpen ? 'opened' : 'closed'}>
				<div
					class="sidebar-item toggle-button"
					onClick={() => this.toggleOpen()}
				>
					{
						this.state.sidebarOpen
						? <BsChevronBarLeft/>
						: <BsChevronBarRight />
					}
					
				</div>

				<hr />
	
				<div class="sidebar-item">
					<FaUsers />
					<span>Equipas</span>
				</div>
	
				<div class="sidebar-item">
					<FaChartLine />
					<span>Resultados</span>
				</div>
			</div>
		)
	}
}