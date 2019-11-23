import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://maskada.local.com:8888/v1",
    timeout: 2000,
    withCredentials: true,
});

const Get = function (resource, handlerFn) {
    axiosInstance.get(resource)
        .then(function (response) {
            handlerFn(response.data, undefined);
        })
        .catch(function (error) {
            handlerFn(undefined, error);
        })
        .finally(function () {
            // always executed
        });
};

export {Get}