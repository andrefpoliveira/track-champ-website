import './App.css';

import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';

import AuthContext from './Logic/AppContext';

function App() {
	return (
		<div className="App">
			<Header />

			<AuthContext.Consumer>
				
				{({ profile, setProfile }) => (
					<>
						{
							profile
								? <div id="content">
									<Sidebar />
									<Outlet />
								</div>
								: <div>Some Information Here</div>
						}
					</>
				)}
			</AuthContext.Consumer>
		</div>
	);
}

export default App;
