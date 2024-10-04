class Profile {
	constructor(name, profileImage, username, accountId) {
		this.name = name;
		this.profileImage = profileImage;
		this.username = username;
		this.accountId = accountId;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
		return this;
	}

	getProfileImage() {
		return this.profileImage;
	}

	getUsername() {
		return this.username;
	}

	getAccountId() {
		return this.accountId;
	}
}

export default Profile;