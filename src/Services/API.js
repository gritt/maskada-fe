import axios from "axios"

const BaseURL = 'http://local.maskada.com:8888/v1'

const Get = function (resource, callback) {
    const url = `${BaseURL}/${resource}`

    axios.get(url)
        .then((response) => {
            callback(response.data, undefined)
        })
        .catch((error) => {
            callback(undefined, error)
        })
}

export {BaseURL, Get}
