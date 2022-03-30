const { MensagemDeBomDia } = require("../src/utils/FrasesBomDia.js");

describe("Frases de Bom dia utils", () => {
  test("Deve retornar uma mensagem de bom dia aletória", () => {
    const qntdMensagens = [MensagemDeBomDia];
    expect(MensagemDeBomDia).toBeTruthy();
    expect(typeof MensagemDeBomDia).toBe("string");
    expect(qntdMensagens.length).toBe(1);
  });
});
