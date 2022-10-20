export const userAPI = {
    getUsers() {
        return fetch('https://dummyjson.com/users?limit=100')
            .then(res => res.json())
            .then(json => json.users)
    }
}