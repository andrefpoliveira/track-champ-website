class Profile {
	constructor(info) {
		this.id = info.id;
		this.username = info.username;
		this.firstName = info.first_name;
		this.lastName = info.last_name;
		this.email = info.email;
		this.birthday = info.birthday;
		this.gender = info.gender;
		this.profileImage = info.profile_image;
		this.activated = info.activated;
		this.createdIn = info.created_in;
		this.lastLogIn = info.last_logIn;
	}

	getId() { return this.id; }
	getUsername() { return this.username; }
	getFirstName() { return this.firstName; }
	getLastName() { return this.lastName; }
	getName() { return this.firstName + ' ' + this.lastName; }
	getEmail() { return this.email; }
	getBirthday() { return this.birthday; }
	getGender() { return this.gender; }
	getProfileImage() { return this.profileImage || '/images/defaultProfile.jpg'; }
	getActivatedStatus() { return this.activated; }
	getCreatedTime() { return this.createdIn; }
	getLastLogin() { return this.lastLogIn; }
}

export default Profile;