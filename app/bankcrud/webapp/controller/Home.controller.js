sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"../model/formatter"
], (Controller,
	Filter,
	FilterOperator,
	JSONModel,
	formatter) => {
    "use strict";

    return Controller.extend("bankcrud.controller.Home", {
        formatter: formatter,
        async onInit() {
            let dataAccounts = await this.onLoadAccounts();
            this.getView().setModel(new JSONModel(dataAccounts), "accountModel");
            let dataExtract = await this.onLoadExtract();
            this.getView().setModel(new JSONModel(dataExtract), "extractModel");
        },
        async onLoadAccounts(){
            var oModel = this.getOwnerComponent().getModel(); 
            let filter = new Filter("ID", FilterOperator.EQ, "3b23bb4b-4ac7-4a24-ac02-aa10cabd842c");

            return new Promise(function (resolve, reject) {
                oModel.read("/Accounts", {
                    filters: [filter],
                    urlParameters: {
                        "$expand": [
                            "customer", 
                            "customer/addresses",
                        ].join(',') // Certifique-se de que o nome da entidade está correto
                    },
                    success: function (oData) {
                        resolve(oData.results[0]);
                    },
                    error: function (oError) {
                        const errModel = {
                            Error: oError.responseText,
                            Entity: '/Accounts'
                        };
                        reject(errModel);
                    }
                });
            });
        },
        async onLoadExtract(){
            var oModel = this.getOwnerComponent().getModel(); 
            let account_ID = this.getView().getModel("accountModel").getData().ID;
            let filter = new Filter("account_ID", FilterOperator.EQ, account_ID);

            return new Promise(function (resolve, reject) {
                oModel.read("/Extract", {
                    filters: [filter],
                    // urlParameters: {
                    //     "$expand": [
                    //         "customer", 
                    //         "customer/addresses",
                    //     ].join(',') 
                    // },
                    success: function (oData) {
                        resolve(oData.results);
                    },
                    error: function (oError) {
                        const errModel = {
                            Error: oError.responseText,
                            Entity: '/Extract'
                        };
                        reject(errModel);
                    }
                });
            });
        }
    });
});