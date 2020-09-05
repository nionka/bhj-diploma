/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {

  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));

  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user

  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    return createRequest({
      data: data,
      url: this.URL + "/current",
      method: "GET",
      responseType: "json",
      callback: (err, response) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      } else {
        User.unsetCurrent();
      }
       callback(err,response) 
      }
    })
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f => f ) {
    return createRequest ({
      data: data,
      url: this.URL + "/login",
      method: "POST",
      responseType: "json",
      callback: (err, response) => {
        if(response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response)  
      }
    })

  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f ) {
    return createRequest ({
      data: data,
      url: this.URL + "/register",
      method: "POST",
      responseType: "json",
      callback: (err, response) => {
        if(response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response)
      }
    })
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = f => f ) {
    return createRequest({
      data: data,
      url: this.URL + "/logout",
      method: "POST",
      responseType: "json",
      callback: (err, response) => {
        if(response && response.user) {
          User.unsetCurrent();
        }
        callback(err, response)  
      }
    })
  }
}
