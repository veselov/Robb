(function() {

  // Will speed up references
  var slice = Array.prototype.slice,
      unshift = Array.prototype.unshift,
      toString = Object.prototype.toString,
      hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * Robb
   */
  var Robb = function() {

    // Version
    this.version = [0, 2, 0].join('.');

  };

  /**
   * Types
   *
   * List of type detection functions.
   */
  var types = {
    isFunction: function(item) {
      return typeof item === 'function';
    },
    isString: function(item) {
      return typeof item === 'string';    
    },
    isNumber: function(item) {
      return typeof item === 'number';
    },
    isUndefined: function(item) {
      return typeof item === 'undefined';
    },
    isEmail: function(item) {
      return /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/.test(item);
    },
    isUrl: function(item) {
      return /^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|cat|coop|int|pro|tel|xxx|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2})?)|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/.test(item);
    },
    isAlpha: function(item) {
      return types.isString(item) && /^[a-zA-Z]+$/.test(item);
    },
    isAlphanumeric: function(item) {
      return (types.isString(item) && /^[a-zA-Z0-9]+$/.test(item)) || types.isNumber(item);
    },
    isIpv4: function(item) {
      return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(item);
    },
    isIpv6: function(item) {
      return /(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(?:(?:[a-f\d]{1,4}:)*[a-f\d]{1,4})?::(?:(?:[a-f\d]{1,4}:)*(?:[a-f\d]{1,4}|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))?)/.test(item);
    },
    isIp: function(item) {
      return types.isIpv4 || types.isIpv6;
    },
    isLowercase: function(item) {
      return types.isString(item) && /^[a-z0-9]+$/.test(item);
    },
    isUppercase: function(item) {
      return types.isString(item) && /^[A-Z0-9]+$/.test(item);
    },
    isDecimal: function(item) {
      return /^[0-9]+(\.[0-9]{1,2})?$/.test(item);
    },
    isUnsignedInt: function(item) {
      return /^[0-9]+$/.test(item);
    },
    isInt: function(item) {
      return /^-?[0-9]+$/.test(item);
    },
    isPercentage: function(item) {
      return /^-?[0-9]{0,2}(\.[0-9]{1,2})?$|^-?(100)(\.[0]{1,2})?$/.test(item);
    },
    isPositive: function(item) {
      return types.isNumber(item) && /^\d+$/.test(item);
    },
    isPort: function(item) {
      return /\:\d+/.test(item);    
    },
    isArray: function(item) {
      return toString.call(item) === '[object Array]';
    },
    isDefined: function(item) {
      return typeof item !== 'undefined';
    },
    isNull: function(item) {
      return item === null;
    },
    isDate: function(item) {
      return toString.call(item) === '[object Date]';
    },
    isElement: function(item) {
      return item && item.tagName && item.nodeType;
    },
    isObject: function(item) {
      return !types.isElement(item) && toString.call(item) === '[object Object]';
    },
    isBoolean: function(item) {
      return item === true || item === false;
    },
    isRegExp: function(item) {
      return item && item.test && item.exec;  
    },
    isArguments: function(item) {
      return item && hasOwnProperty.call(item, 'callee');
    },
    isEmpty: function(item) {

      // Arrays and strings
      if (types.isArray(item) || types.isString(item)) {
        return item.length === 0;
      }

      // Elements
      if (types.isElement(item)) {
        return !item.firstChild;
      }

      // Objects
      if (types.isObject(item)) {
        for (var key in item) {
          if (hasOwnProperty.call(item, key)) {
            return false;
          }
        }
      }

      return true;

    },
    isEven: function(item) {
      return types.isNumber(item) && (item & 1) === 0;
    },
    isOdd: function(item) {
      return !types.isEven(item);
    },
    isPrime: function(item) {
      
      // If passed argument isn't a number, returns false
      if (!types.isNumber(item)) {
        return false;       
      }

      // If passed argument is a decimal number (let's say 12.45), returns false
      if (!types.isUnsignedInt(item)) {
        return false;
      }

      // If passed argument is less than or equals 1, returns false
      if (item <= 1) {
        return false;
      }

      // If passed argument equals two, returns true
      if (item === 2) {
        return true;
      }

      // If passed argument is even, returns false
      if (types.isEven(item)) {
        return false;
      }

      // Goes through
      for (var x = 3, max = Math.sqrt(item); x <= max; x += 2) {
        if ((item % x) === 0) {
          return false;
        }
      }

      return true;

    },
    isNegative: function(item) {
      return types.isNumber(item) && !/^\d+$/.test(item);
    },
    isWindow: function(item) {
      return toString.call(item) === '[object global]' && 'setInterval' in item && 'setTimeout' in item;
    },
    isNaN: function(item) {
      return window.isNAN(item);
    },
    isFinite: function(item) {
      return window.isFinite(item);
    }
  };

  /**
   * GenerateMethod
   *
   * @param {string} method
   * @param {functio} fn
   */
  var generateMethod = function(method, fn) {

    Robb.prototype[method] = function() {

      // Make sure that at least one argument was provided
      if (arguments.length === 0) {
        return false;
      }

      // Converts arguments to regular array
      var list = slice.call(arguments);

      // Goes through the list of arguments
      return list.every(fn);

    };

  };

  // Goes through all available type detection functions
  for (var type in types) {
    if (hasOwnProperty.call(types, type)) {
      generateMethod(type, types[type]);
    }
  }

  // Exports
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = new Robb();
  } else {
    this.Robb = new Robb();
  }

}());