import React from 'react';
import Profile from './Profile';

const AuthContext = React.createContext(null);

// AuthProvider component
export const AuthProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);

	// On component mount, check if user info exists in localStorage
	React.useEffect(() => {
		const savedProfile = localStorage.getItem('userProfile');
		if (savedProfile) {
			// Parse the saved user profile and set it as the current user
			const parsedProfile = JSON.parse(savedProfile);
			setUser(new Profile(parsedProfile));
		}
	}, []);

	// Function to handle user login
	const storeProfile = (profileData) => {
		const userProfile = new Profile(profileData);
		setUser(userProfile);

		// Save user profile to localStorage
		localStorage.setItem('userProfile', JSON.stringify(profileData));
	};

	// Function to handle user logout
	const deleteProfile = () => {
		setUser(null);
		// Remove user profile from localStorage
		localStorage.removeItem('userProfile');
	};

	return (
		<AuthContext.Provider value={{ user, storeProfile, deleteProfile }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;