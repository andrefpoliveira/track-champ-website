class Profile {
	constructor(accountId, username, name, birthday, gender, profileImage) {
		this.accountId = accountId;
		this.username = username;
		this.name = name;
		this.birthday = birthday;
		this.gender = gender;
		this.profileImage = profileImage;
	}

	getAccountId() {
		return this.accountId;
	}

	getUsername() {
		return this.username;
	}

	getName() {
		return this.name;
	}

	getBirthday() {
		return this.birthday;
	}

	getGender() {
		return this.gender;
	}

	getProfileImage() {
		return this.profileImage || 'https://i.pinimg.com/736x/dc/9c/61/dc9c614e3007080a5aff36aebb949474.jpg';
	}
}

export default Profile;