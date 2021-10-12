interface User {
    id?: string,
    username?: string;
    password?: string;
    salt?: string,
    name?: string;
    avatar?: string;
    last_login?: any,
    create_at?: any,
    fail?: number
}

export default User;
