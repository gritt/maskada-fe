import axios from "axios"

const axiosInstance = axios.create({
    baseURL: "http://local.maskada.com:8888/v1",
    timeout: 2000,
    withCredentials: true,
});

const Get = function (resource, handlerFn) {
    axiosInstance.get(resource)
        .then((response) => {
            handlerFn(response.data, undefined);
        })
        .catch((error) => {
            handlerFn(undefined, error);
        })
        .finally(() => {
            // always executed
        });
};

export {Get}
