interface User {
	_id: string,
	role: string,
	name: string,
	email: string,
	password: string,
	timestamp: {
		create_at: Date,
		updated_at: Date,
	}
}

export default {
	_id: (user: User): string => user._id,
	role: (user: User): String => user.role,
	name: (user: User): string => user.name,
	email: (user: User): string => user.email,
	password: (user: User): string => user.password,
	timestamp: (user: User): object => user.timestamp,
};
