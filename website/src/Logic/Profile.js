class Profile {
	constructor(info) {
		this.id = info.id;
		this.username = info.username;
		this.firstName = info.firstName;
		this.lastName = info.lastName;
		this.email = info.email;
		this.birthday = info.birthday;
		this.gender = info.gender;
		this.profileImage = info.profileImage;
		this.activated = info.activated;
		this.createdIn = info.createdIn;
		this.lastLogIn = info.lastLogIn;
	}

	getId() { return this.id; }
	getUsername() { return this.username; }
	getFirstName() { return this.firstName; }
	getLastName() { return this.lastName; }
	getName() { return this.firstName + ' ' + this.lastName; }
	getBirthday() { return this.birthday; }
	getGender() { return this.gender; }
	getProfileImage() { return this.profileImage || '/images/defaultProfile.jpg'; }
	getActivatedStatus() { return this.activated; }
	getCreatedTime() { return this.createdIn; }
	getLastLogin() { return this.lastLogIn; }
}

export default Profile;