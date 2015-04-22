var theModule = angular.module('unicorn');

// quick hack to add a shortcut method for building uiObject factories
theModule.uiObject = function (factoryId, definition) {

  theModule.factory(factoryId, [
  '$injector',
  '$rootScope',
  function ($injector, $rootScope){


    /**
     * uiObject
     *
     * @class        {angular.factory}
     * @type         {Object}
     * @description  An app-global singleton object that represents known data
     *               about some object.
     *               Mainly it acts just like a normal object, but worth noting
     *               are a few of its other exciting methods, including:
     *                 • extend()
     *                 • replace()
     *                 • fetch()
     */

     var soonToBePrototype = {};


    /**
    * Replace all enumerable keys of this object with
     * the keys from the provided `data`.
     */
    soonToBePrototype.replace = function (newObject) {
      var self = this;
      newObject = newObject || {};
      _.each(self, function (value,key) {
        delete self[key];
      });
      _.each(newObject, function (value, key) {
        self[key] = newObject[key];
      });
      return;
    };


    /**
     * Merge in new data.
     */
    soonToBePrototype.extend = function (data){
      var self = this;
      data = data || {};
      angular.extend(self, data);

      return self;
    };

    /**
     * @constructor
     */
    var TheConstructor = new Function();

    angular.extend(TheConstructor.prototype, soonToBePrototype);

    // Use $injector to get dependencies for the `definition` and get the object full of extra methods
    // then merge those methods into the prototype
    var moreMethods = $injector.invoke(definition);
    angular.extend(TheConstructor.prototype, moreMethods);


    /**
     * Instantiate singleton
     */
    var singleton = new TheConstructor();

    // Expose on root scope.
    $rootScope[factoryId] = singleton;

    // Finally, return for direct use via DI
    return singleton;
  }]);
};
