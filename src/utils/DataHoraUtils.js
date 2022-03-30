class DataUtil {
  #diaHoje;
  #mesHoje;
  #anoHoje;
  #minutosAgora;
  #horasAgora;

  Setup() {
    let dia = new Date().getDate();
    let minAgora = new Date().getMinutes();

    this.#diaHoje = dia <= 9 ? `0${dia}` : dia;
    this.#mesHoje =
      new Date().getMonth() + 1 <= 9
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1;
    this.#anoHoje = `${new Date().getFullYear()}`;
    this.#minutosAgora = minAgora <= 9 ? `0${minAgora}` : minAgora;
    this.#horasAgora = new Date().getHours() == 0 ? "00" : new Date().getHours();
  }

  get DataHora() {
    this.Setup();
    return `${this.#diaHoje}/${this.#mesHoje}/${this.#anoHoje} - ${
      this.#horasAgora
    }:${this.#minutosAgora}`;
  }

  get Data() {
    this.Setup();
    return `${this.#diaHoje}/${this.#mesHoje}/${this.#anoHoje}`;
  }
}

module.exports = new DataUtil();