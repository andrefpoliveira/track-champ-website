import './App.css';

import { Outlet } from 'react-router-dom';

import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
	return (
		<div className="App">
			<Header />

			<div id="content">
				<Sidebar />
				<Outlet />
			</div>
		</div>
	);
}

export default App;
