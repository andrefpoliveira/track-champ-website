async function makeRequest(
	url,
	method = 'GET',
	data = null,
) {
	const headers = data === null ? {} : { 'Content-Type': 'application/json' };

	const options = {
		method,
		credentials: 'include',
		headers,
	};
	
	if (data) {
		options.body = JSON.stringify(data);
	}

	const response = await fetch(url, options);
	const responseData = await response.json();
	responseData.statusCode = response.status;

	return responseData;
}

export async function register(payload) {
	let url = process.env.REACT_APP_SERVER_URL + '/auth/register';
	const response = await makeRequest(url, 'POST', payload);
	return response;
}

export async function login(payload) {
	let url = process.env.REACT_APP_SERVER_URL + '/auth/login';
	const response = await makeRequest(url, 'POST', payload);
	return response;
}

export async function logout() {
	let url = process.env.REACT_APP_SERVER_URL + '/auth/logout';
	const response = await makeRequest(url, 'POST');
	return response;
}

export async function update(payload) {
	let url = process.env.REACT_APP_SERVER_URL + '/profile/update';
	const response = await makeRequest(url, 'POST', payload);
	return response;
}

export async function getTeams() {
	let url = process.env.REACT_APP_SERVER_URL + '/team/get-teams';
	const response = await makeRequest(url);
	return response;
}

export async function createTeam(payload) {
	let url = process.env.REACT_APP_SERVER_URL + '/team/create';
	const response = await makeRequest(url, 'POST', payload);
	return response;
}

export async function getTeam(id) {
	let url = process.env.REACT_APP_SERVER_URL + `/team/get/${id}`;
	const response = await makeRequest(url);
	return response;
}

export async function enterTeam(id) {
	let url = process.env.REACT_APP_SERVER_URL + `/team/enter/${id}`;
	const response = await makeRequest(url, 'POST');
	return response;
}

export async function exitTeam(id) {
	let url = process.env.REACT_APP_SERVER_URL + `/team/exit/${id}`;
	const response = await makeRequest(url, 'POST');
	return response;
}

export async function deleteTeam(id) {
	let url = process.env.REACT_APP_SERVER_URL + `/team/delete/${id}`;
	const response = await makeRequest(url, 'DELETE');
	return response;
}

export async function inviteToTeam(payload) {
	let url = process.env.REACT_APP_SERVER_URL + `/team/invite`;
	const response = await makeRequest(url, 'POST', payload);
	return response;
}