sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("ui5datatestapp.controller.ShoppingDetail", {
      onInit: function () {
        //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        console.log("Attaching event");
        var oRouter = this.getOwnerComponent().getRouter();
        oRouter
          .getRoute("shoppingDetail")
          .attachMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function (oEvent) {
        console.log("Object matched");
        var sItemID = oEvent.getParameter("arguments").itemID;
        console.log(sItemID);

        this.getView().bindElement({
          path: sItemID,
          model: "shoppingItemsModel",
        });

        //var oModel = this.getView().getModel();
        //var oItemData = oModel
        //  .getProperty("/items")
        //  .find((item) => item.id === parseInt(sItemId));
        //this.getView().setBindingContext(
        //  new sap.ui.model.json.JSONModel(oItemData),
        //);
      },
    });
  },
);
