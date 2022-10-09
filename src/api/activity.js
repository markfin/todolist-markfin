import axios from './axios.instance';
import { config } from './config';

export async function getAll() {
	return await axios.get(`/activity-groups?email=${config.email}`);
}

export async function getDetail(id) {
	return await axios.get(`/activity-groups/${id}`);
}

export async function store(title = 'New Activity') {
	return await axios.post(`/activity-groups`, { title, email: config.email });
}

export async function update(id, title) {
	return await axios.patch(`/activity-groups/${id}`, { title });
}

export async function destroy(id) {
	return await axios.delete(`/activity-groups/${id}`);
}
