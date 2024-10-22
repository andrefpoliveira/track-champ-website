async function makeRequest(
	url,
	method = 'GET',
	data = null,
) {
	const headers = {
		'Content-Type': 'application/json',
	};

	const options = {
		method,
		headers,
	};

	if (data) {
		options.body = JSON.stringify(data);
	}

	const response = await fetch(url, options);
	const responseData = await response.json();

	return responseData;
}

async function register(payload) {
	let url = process.env.REACT_APP_SERVER_URL + '/auth/register';
	const response = await makeRequest(url, 'POST', payload);
	return response;
}

async function login(payload) {
	let url = process.env.REACT_APP_SERVER_URL + '/auth/login';
	const response = await makeRequest(url, 'POST', payload);
	return response;
}

async function update(payload) {
	let url = process.env.REACT_APP_SERVER_URL + '/profile/update';
	const response = await makeRequest(url, 'POST', payload);
	return response;
}

export {
	register,
	login,
	update
}