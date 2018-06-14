export class ServerAPI {
    static baseUrl = 'http://localhost:4000';

    static async getUsers() {
        return this.get('/users');
    }

    static getSingleUser(name: string, pass?: string) {
        const user = {
            name: name,
            pass: pass
        };
        return this.post('/users/login', user);
    }

    /*static createUser(user) {
        return this.post('/users', user);
    }*/

    static get(url) {
        return fetch(this.baseUrl + url)
            .then(res => res.json());
    }

    static post(url, body) {
        return fetch(this.baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json());
    }
}

