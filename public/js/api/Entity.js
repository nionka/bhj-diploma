/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = "";

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = f => f ) {
    return createRequest({
            data: data,
            method: "GET",
            url: this.URL,
            responseType: "json",
            callback: callback
            })
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = f => f ) {
    let newData = Object.assign({_method: "PUT"}, data);

    return createRequest({
                  data: newData,
                  method: "POST",
                  url: this.URL,
                  responseType: "json",
                  callback: callback
                  })
  }
  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = f => f ) {
    return createRequest({
                data: data,
                url: `${this.URL}/${id}`,
                method: "GET",
                responseType: "json",
                callback: callback
              })
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = f => f ) {
    let newData = Object.assign({_method: "DELETE"}, {id: id}, data);
    return createRequest({
                data: newData,
                method: "POST",
                url: this.URL + "/",
                responseType: "json",
                callback: callback
                })

  }
}

