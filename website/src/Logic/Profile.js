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
		return this.profileImage || 'https://i.pinimg.com/736x/dc/9c/61/dc9c614e3007080a5aff36aebb949474.jpg';
	}
}

export default Profile;