import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContext from './Logic/AppContext';

import './CSS/forms.css';

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import ErrorPage from './Pages/Error/Error';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
		]
	},
	{ path: "/login", element: <LoginPage />, errorElement: <ErrorPage /> },
	{ path: "/register", element: <RegisterPage />, errorElement: <ErrorPage /> },
]);

const AppWrapper = () => {
	const [profile, setProfile] = React.useState(null);

	return (
		<AuthContext.Provider value={{ profile, setProfile }}>
			<RouterProvider router={router} />
		</AuthContext.Provider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AppWrapper />
	</React.StrictMode>
);
