class Profile{
    constructor() {
        this._clientId = 99, // TODO: @note Suanda kullandıgımız api bizden id beklemiyor
        this.clientSecret = "" // ama genelde apiler bizden bunu bekler!
    }

    async getProfile(username) {
        const profileResponse = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
        const profile = await profileResponse.json();
        this._clientId = await profile[0].id;
        return {profile}; // {profile:profile} anlamına gelir!
    }

    async getTodos() {
        const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${this._clientId}`);
        const todo = await todoResponse.json();
        return {todo};
    }

}