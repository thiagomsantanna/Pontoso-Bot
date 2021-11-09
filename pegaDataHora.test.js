const dataHoras = require('./pegaDataHora');


const dataMock = new Date();
const spy = jest
    .spyOn(global, 'Date')
    .mockImplementation(() => dataMock);

const dia = dataMock.getDate() <= 9 ? '0' + dataMock.getDate() : dataMock.getDate();
const mes = dataMock.getMonth() + 1;
const ano = dataMock.getFullYear();
const hora = dataMock.getHours() <= 9 ? '0' + dataMock.getHours() : dataMock.getHours();
const minutos = dataMock.getMinutes() <= 9 ? '0' + dataMock.getMinutes() : dataMock.getMinutes();

describe('Teste da função pegaDataHora', () => {

    test('Deve retornar a Data de hoje e as Horas de agora.', () => {

        expect(dataHoras.pegaDataHora()).toBe(`${dia}/${mes}/${ano} - ${hora}:${minutos}`);
    });
    
    test('Deve retornar somente a Data de hoje', () => {
    
        expect(dataHoras.pegaData()).toBe(`${dia}/${mes}/${ano}`);
    });

});
