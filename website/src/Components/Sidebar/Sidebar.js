import './Sidebar.css';
import React from "react";

import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { BsChevronBarLeft } from "react-icons/bs";
import { BsChevronBarRight } from "react-icons/bs";

import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
	const [open, setOpen] = React.useState(true);
	const navigate = useNavigate();

	return (
		<div id="sidebar" className={open ? 'opened' : 'closed'}>
			<div
				class="sidebar-item toggle-button"
				onClick={() => setOpen(!open)}
			>
				{
					open
					? <BsChevronBarLeft/>
					: <BsChevronBarRight />
				}
				
			</div>

			<hr />

			<div
				class="sidebar-item"
				onClick={() => navigate('/meu-perfil')}
			>
				<FaUser />
				<span>Perfil</span>
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