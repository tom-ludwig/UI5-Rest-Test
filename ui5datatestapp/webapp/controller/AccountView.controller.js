sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("ui5datatestapp.controller.AccountView", {
      onInit: function () {},
      onUserSaved: function () {
        var oModel = this.getView().getModel("userModel");
        var oData = oModel.getData();

        // get user name input from xml view
        var sName = this.getView().byId("userNameInputField").getValue();
        oData.name = sName;

        oModel.updateBindings();
      },
    });
  },
);
