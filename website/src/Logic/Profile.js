class Profile {
	constructor(accountId, name, profileImage) {
		this.name = name;
		this.profileImage = profileImage;
		this.accountId = accountId;
	}

	getAccountId() {
		return this.accountId;
	}

	getName() {
		return this.name;
	}

	getProfileImage() {
		return this.profileImage;
	}
}

export default Profile;