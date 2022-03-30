const { DataHora, Data } = require("../src/utils/DataHoraUtils.js");

describe("Data e Hora utils", () => {
  test("Deve retornar a data completa e o horário", () => {
    const dataHora = new Date();
    let strDia =
      dataHora.getDate() <= 9 ? "0" + dataHora.getDate() : dataHora.getDate();
    let strMes =
      dataHora.getMonth() + 1 <= 9
        ? "0" + (dataHora.getMonth() + 1)
        : dataHora.getMonth() + 1;
    let strAno = dataHora.getFullYear();
    let strHora = dataHora.getHours() == 0 ? "00" : dataHora.getHours();
    let strMinutes = dataHora.getMinutes();

    const strDataHora =
      [strDia, strMes, strAno].join("/") +
      " - " +
      [strHora, strMinutes].join(":");

    expect(DataHora).toBe(strDataHora);
  });

  test('Deve retornar a data completa sem horário', () => {
    const dataHora = new Date();
    let strDia =
      dataHora.getDate() <= 9 ? "0" + dataHora.getDate() : dataHora.getDate();
    let strMes =
      dataHora.getMonth() + 1 <= 9
        ? "0" + (dataHora.getMonth() + 1)
        : dataHora.getMonth() + 1;
    let strAno = dataHora.getFullYear();

    const strDataHora =
      [strDia, strMes, strAno].join("/");

    expect(Data).toBe(strDataHora);
  })
});
