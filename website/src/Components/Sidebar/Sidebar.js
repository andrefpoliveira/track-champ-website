import './Sidebar.css';
import React from "react";

import { FaUsers } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

export default function Sidebar() {
	return (
		<div id="sidebar">
			<div id="resize-button">
				<FaChevronLeft />
			</div>

			<div class="sidebar-item">
				<FaUsers />
				<span>Equipas</span>
			</div>

			<div class="sidebar-item">
				<FaChartLine />
				<span>Resultados</span>
			</div>
		</div>
	);
}