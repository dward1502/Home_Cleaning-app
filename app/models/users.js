class Users {
	constructor(id, email, password, name, permission, hours, completedChecklist) {
		this.id = id;
		this.email = email;
		this.password = password;
    this.name = name;
    this.permission = permission;
		this.hours = hours;
		this.completedChecklist = completedChecklist;
	}
}

export default Users;