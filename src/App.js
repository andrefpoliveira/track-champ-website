import './App.css';

import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';

import AuthContext from './Logic/AppContext';

function App() {
	const { user } = React.useContext(AuthContext);

	return (
		<div className="App">
			<Header />

			{
				user
				? <div id="content">
					<Sidebar />
					<Outlet />
				</div>
				: <div id='unregistered-screen'>
					<h2>Olá! Bem-vindo!</h2>
					<h4>Em breve...</h4>
				</div>
			}
		</div>
	);
}

export default App;
