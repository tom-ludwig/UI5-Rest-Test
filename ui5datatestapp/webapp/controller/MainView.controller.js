sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("ui5datatestapp.controller.MainView", {
      onInit: function () {},
      onUserSaved: function () {
        var oModel = this.getView().getModel("userModel");
        var oData = oModel.getData();

        // get user name input from xml view
        var sName = this.getView().byId("userNameInputField").getValue();
        oData.name = sName;

        oModel.updateBindings();
      },
      onNavigateToAccount: function () {
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("account");
      },
      onNavigateToDetailShoppingView: function (oEvent) {
        var oItem = oEvent.getSource();
        var path = oItem.getBindingContext("shoppingItemsModel").getPath();

        var oRouter = this.getOwnerComponent().getRouter();
        // get last item after / in path
        var itemID = path.substr(path.lastIndexOf("/") + 1);
        // Check that the itemID is valid
        if (itemID !== "") {
          oRouter.navTo("shoppingDetail", {
            itemID: itemID,
          });
        }
      },
    });
  },
);
