const { response } = require("express");

/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    this.element = element;
    this.renderAccountsList();

  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accounts = this.element.querySelectorAll(".accounts-select");
    Account.list(User.current(), (err, response) => {
      accounts.innerHTML = "";

      response.data.forEach(value => {
        accounts.innerHTML += `
        <option value="${value.id}>${value.name}</option>"`
      });
    })
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err, response) => {
      if (response && response.success) {
          this.element.reset();
          App.getModal("newIncome").close();
          App.getModal("newExpense").close();
          App.update();
      }
    })
  }
}
