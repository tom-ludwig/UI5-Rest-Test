sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("ui5datatestapp.controller.MainView", {
      onInit: function () {},

      onAfterRendering: function () {
        var oModel = this.getView().getModel("shoppingItemsModel");
        var oData = oModel.getData();

        jQuery.ajax({
          // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url
          url: "http://0.0.0.0:8080/shopping_items/items",
          method: "GET",
          success: function (data) {
            console.log(data);
            oData.items = data;
            oModel.updateBindings();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error loading data from API.");
          },
        });
      },

      onAddItem: function () {
        const sNewItemTitle = this.getView().byId("name").getValue();
        const sNewItemDescription = this.getView()
          .byId("description")
          .getValue();
        const sNewItemPrice = parseFloat(
          this.getView().byId("price").getValue(),
        );
        const sNewItemQuantity = parseInt(
          this.getView().byId("quantity").getValue(),
        );
        const sNewItemImageUrl = this.getView().byId("image").getValue();

        const object = {
          title: sNewItemTitle,
          description: sNewItemDescription,
          price: sNewItemPrice,
          quantity: sNewItemQuantity,
          image_url: sNewItemImageUrl,
        };

        console.log(object);

        // Add item to the API
        jQuery.ajax({
          // eslint-disable-next-line fiori-custom/sap-no-hardcoded-url
          url: "http://0.0.0.0:8080/shopping_items/items",
          method: "POST",
          contentType: "application/json",
          data: JSON.stringify(object),
          success: function () {
            console.log("Item added");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("Failed to add item. Error details:");
            console.error("Status: " + textStatus); // Logs the status (e.g., "error", "timeout")
            console.error("Error Thrown: " + errorThrown); // Logs any exception object thrown
            console.error("Response Text: " + jqXHR.responseText); // Logs the full response from the server
          },
        });
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
