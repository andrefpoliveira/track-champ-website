import './App.css';

import { Outlet } from 'react-router-dom';

import Header from './Components/Header/Header';

function App() {
	return (
		<div className="App">
			<Header />

			<div id="content">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
