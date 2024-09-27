sap.ui.define(
  ["sap/ui/model/json/JSONModel", "sap/ui/Device"],
  /**
   * provide app-view type models (as in the first "V" in MVVC)
   *
   * @param {typeof sap.ui.model.json.JSONModel} JSONModel
   * @param {typeof sap.ui.Device} Device
   *
   * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
   */
  function (JSONModel, Device) {
    "use strict";

    return {
      createDeviceModel: function () {
        var oModel = new JSONModel(Device);
        oModel.setDefaultBindingMode("OneWay");
        return oModel;
      },
      createUserModel: function () {
        var userModel = new JSONModel({
          name: "",
          email: "",
        });

        return userModel;
      },
      createShoppingItemModel: function () {
        var oModel = new JSONModel({
          items: [
            {
              id: "e3ec7ba8-5ebb-4014-80ba-46a877035f28",
              name: "Item 1",
              description: "Description 1",
              price: 1,
              quantity: 1,
              image_url: "https://via.placeholder.com/150",
            },
            {
              id: "8d3d415c-bb80-40a3-956f-037793f85200",
              name: "Item 2",
              description: "Description 1",
              price: 1,
              quantity: 1,
              image_url: "https://via.placeholder.com/150",
            },
          ],
        });
        //oModel.setDefaultBindingMode("TwoWay");
        return oModel;
      },
    };
  },
);
