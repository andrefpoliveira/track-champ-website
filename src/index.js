import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './Logic/AppContext';
import { ToastProvider } from './Logic/ToastContext';
import 'bootstrap/dist/css/bootstrap.min.css';


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
import TeamsList from './Pages/TeamsList/TeamsList';
import Team from './Pages/Team/Team';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ path: "/meu-perfil", element: <MyProfile /> },
			{ path: "/editar-perfil", element: <EditProfile /> },
			{ path: "/example", element: <ExamplePage /> },
			{ path: "/equipas", element: <TeamsList />},
			{ path: "/equipa/:id", element: <Team />}
		]
	},
	{ path: "/entrar", element: <LoginPage />, errorElement: <ErrorPage /> },
	{ path: "/registar", element: <RegisterPage />, errorElement: <ErrorPage /> },
]);

const AppWrapper = () => {
	return (
		<AuthProvider>
			<ToastProvider>
				<RouterProvider router={router} />
			</ToastProvider>
		</AuthProvider>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AppWrapper />
	</React.StrictMode>
);
