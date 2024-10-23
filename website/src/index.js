import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Logic/AppContext';

import './CSS/forms.css';

import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";

import ErrorPage from './Pages/Error/Error';
import LoginPage from './Pages/Login/Login';
import RegisterPage from './Pages/Register/Register';
import MyProfile from './Pages/MyProfile/MyProfile';
import EditProfile from './Pages/EditProfile/EditProfile';

import ExamplePage from './Pages/ExamplePage/ExamplePage';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/meu-perfil", element: <MyProfile /> },
			{ path: "/editar-perfil", element: <EditProfile /> },
			{ path: "/example", element: <ExamplePage /> }
		]
	},
	{ path: "/entrar", element: <LoginPage />, errorElement: <ErrorPage /> },
	{ path: "/registar", element: <RegisterPage />, errorElement: <ErrorPage /> },
]);

const AppWrapper = () => {
	// const [profile, setProfile] = React.useState(null);

	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AppWrapper />
	</React.StrictMode>
);
