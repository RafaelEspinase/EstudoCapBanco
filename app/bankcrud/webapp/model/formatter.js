/* global moment:true */
sap.ui.define([], function () {
    "use strict";
    return {
        convertDateTime: function (value) {
            const data = new Date(value);

            // Obtendo dia, mês e ano
            const dia = String(data.getDate()).padStart(2, '0');
            const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
            const ano = data.getFullYear();

            // Obtendo horas, minutos e segundos
            const horas = String(data.getHours()).padStart(2, '0');
            const minutos = String(data.getMinutes()).padStart(2, '0');
            const segundos = String(data.getSeconds()).padStart(2, '0');

            // Formatando para dd/mm/aaaa hh:mm:ss
            const dataFormatada = `${dia}/${mes}/${ano} as ${horas}:${minutos}:${segundos}`;

            return(dataFormatada); // Saída: 11/04/2024 21:00:00
        },
        convertValueBRL: function(value){
            // Formatando para moeda brasileira (BRL)
            value = parseInt(value);
            const valueFormated = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
            });

            return(valueFormated); 
        },

        formatOperation: function (op){
            if(op == "D"){
                return "Deposito"
            }
            else if(op == "W"){
                return "Saque"
            }
            else if(op == "T"){
                return "Transferencia"
            }
        }
    };
  });