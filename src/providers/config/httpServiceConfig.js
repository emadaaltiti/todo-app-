export class HttpServiceConfig {
    get(apiUrl, headers) {
        return new Promise(function (resolve, reject) {
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'

                },
            }).then(response => response.json())
                .then(result => {
                    resolve(result);
                }).catch(err => {
                reject(err);
            });
        });
    }

    put(apiUrl, body, headers) {
        return new Promise(function (resolve, reject) {
            fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then(response => response.json())
                .then(result => {
                    resolve(result);
                }).catch(err => {
                reject(err);
            });
        });
    }


    post(apiUrl, body, headers) {
        return new Promise(function (resolve, reject) {
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(body)

            }).then(response => response.json())
                .then(result => {
                    resolve(result);
                }).catch(err => {
                console.log(err.toString());
                reject(err);
            });
        });
    }

    delete(apiUrl) {

        return new Promise(function (resolve, reject) {
            fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response => response.json())
                .then(result => {
                    resolve(result);
                }).catch(err => {
                reject(err);
            })
        })
    }
}


export default HttpServiceConfig;
