import './Sidebar.css';
import React from "react";

import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { BsChevronBarLeft } from "react-icons/bs";
import { BsChevronBarRight } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
	const [open, setOpen] = React.useState(true);
	const navigate = useNavigate();

	return (
		<div id="sidebar" className={open ? 'opened' : 'closed'}>
			<div
				className="sidebar-item toggle-button"
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
				className="sidebar-item"
				onClick={() => navigate('/meu-perfil')}
			>
				<FaUser />
				<span>Perfil</span>
			</div>

			<div className="sidebar-item">
				<FaUsers />
				<span>Equipas</span>
			</div>

			<div className="sidebar-item">
				<FaChartLine />
				<span>Resultados</span>
			</div>

			<div className="sidebar-item">
				<FaSignOutAlt />
				<span>Sair</span>
			</div>
		</div>
	);
}