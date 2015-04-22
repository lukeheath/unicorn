/**
 * Module dependencies
 */

var dependencies = [
  'ui.router',
	'ui.bootstrap',
	'ngTouch',
	'ngAnimate',
  'cloudsdk'
];



/**
 * Unicorn
 *
 * @class        {angular.module}
 * @module       Unicorn
 * @type         {Function}
 * @description  An angular module for a web UI.
 */

angular.module('unicorn', dependencies);




















////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
var theModule = angular.module('unicorn');
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


// Adds a shortcut method for building uiArray factories
theModule.uiArray = function (factoryId, definition) {

  theModule.factory(factoryId, [
  '$injector',
  '$timeout',
  '$rootScope',
  function ($injector, $timeout, $rootScope){


    /**
     * uiArray
     *
     * @class        {angular.factory}
     * @type         {Array}
     * @description  An app-global singleton array that represents known data
     *               about some homogenous collection of objects.
     *               Mainly it acts just like a normal array, but worth noting
     *               are a few of its other exciting methods, including:
     *                 • extend()
     *                 • replace()
     *                 • fetch()
     */




    // Define the name of the primary key attribute
    // (used for distinguishing individual items from one another)
    var pk = 'id';


    var soonToBePrototype = {};

    /**
     * Replace all items in this array of data objects with the
     * new provided array of data objects.
     */
    soonToBePrototype.replace = function (newItems) {

      var self = this;

      var idsOfItemsToRemoveFromArray = [];

      // Loop through each of the current items
      _.each(self, function eachExistingItem (existingItem){

        // Look and see if this existing item matches any of the new items
        var matchingNewItem = _.find(newItems, function (newItem){
          return newItem[pk] === existingItem[pk];
        });

        // If so, just delete its keys and replace them with the keys of the new item
        // (this allows the item to maintain its index within the array)
        if (matchingNewItem) {
          _.each(_.keys(existingItem), function (key) {
            delete existingItem[key];
          });
          _.each(matchingNewItem, function (value, key) {
            existingItem[key] = matchingNewItem[key];
          });
          return;
        }

        // Otherwise track it as an item to remove from the array
        idsOfItemsToRemoveFromArray.push(existingItem[pk]);
      });


      // Next, go through and remove those existing items which no longer
      // exist in `newItems`.
      _.each(idsOfItemsToRemoveFromArray, function (id) {
        _.remove(self, function whetherToRemoveItem (existingItem){
          return existingItem[pk] === id;
        });
      });


      // Finally, examine the provided items-- locate any new ones,
      // (determined using primary key) and push each new item onto `self`.
      _.each(newItems, function (newItem) {
        if (!_.find(self, function (potentialMatchingExistingItem) {
          return potentialMatchingExistingItem[pk] === newItem[pk];
        })) {
          self.push(newItem);
        }
      });

    };


    /**
     * Merge in new/updated items.
     * (NOTE: this does not delete any items in the current array)
     */
    soonToBePrototype.extend = function (items){
      var self = this;

      if (!_.isArray(items)) {
        throw new Error('uiArray.extend() expects an array, but got: '+items);
      }

      // Merge provided `items` into self
      _.each(self, function (existingItem){
        // If this existing item corresponds with a provided item,
        // merge the properties of the provided item into the existing item.
        var matchingNewItem = _.find(items, function (potentialMatchingItem){
          return potentialMatchingItem[pk] === existingItem[pk];
        });

        if (!matchingNewItem) return;

        angular.extend(existingItem, potentialMatchingItem);
      });

      // Examine provided items- for any new ones, push them onto self
      _.each(items, function (item) {
        if (!_.find(self, function (potentialMatchingExistingItem) {
          return potentialMatchingExistingItem[pk] === item[pk];
        })) {
          self.push(item);
        }
      });

      return self;
    };


    /**
     * @constructor
     */
    var TheConstructor = new Function();

    // "Sub-class" a JavaScript Array or whatever
    // so this thing looks and works like an array.
    TheConstructor.prototype = [];
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
