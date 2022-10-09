import axios from './axios.instance';

export async function store(data) {
	return await axios.post(`/todo-items`, { ...data, is_active: true });
}

export async function update(id, dataUpdate) {
	return await axios.patch(`/todo-items/${id}`, dataUpdate);
}

export async function destroy(id) {
	return await axios.delete(`/todo-items/${id}`);
}
