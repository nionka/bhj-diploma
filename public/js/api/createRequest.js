/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    let url = options.url + "?";

    xhr.responseType = options.responseType;
    xhr.withCredentials = true;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            options.callback(null, options.response);
        }
    }

    try {
        if (options.method === "GET") {
            for (let key in options.data) {
                url += key + "=" + options.data[key] + "&";
            }
            url.substring(0, url.length - 1);
            xhr.open("GET", url);
            xhr.send();
        } else {
            for (let key in options.data) {
                formData.append(key, options.data[key]);
            }
            xhr.open(options.method, options.url);
            xhr.send(formData);
        }
    } catch (err) {
        options.callback(err)
    }

    return xhr
};
