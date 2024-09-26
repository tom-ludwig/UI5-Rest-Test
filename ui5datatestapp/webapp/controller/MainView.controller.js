sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("ui5datatestapp.controller.MainView", {
      onInit: function () {
        var oModel = new sap.ui.model.json.JSONModel({
          items: [
            {
              id: "e3ec7ba8-5ebb-4014-80ba-46a877035f28",
              name: "Item 1",
              description: "Description 1",
            },
            {
              id: "8d3d415c-bb80-40a3-956f-037793f85200",
              name: "Item 2",
              description: "Description 2",
            },
          ],
        });

        this.getView().setModel(oModel, "shoppingItemsModel");
      },
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
