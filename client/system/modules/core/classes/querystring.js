define('querystring', ['underscore'],
/**
 * The QueryString module adds support for serializing JavaScript objects into
 * query strings and parsing JavaScript objects from query strings format.
 *
 * @requires module:underscore
 * @exports querystring
 * @see https://github.com/yui/yui3/blob/master/src/querystring/js/querystring-parse.js
 */
function(_) {
/**
 * The QueryString module adds support for serializing JavaScript objects into
 * query strings and parsing JavaScript objects from query strings format.
 * @class QueryString
 * @static
 */
var QueryString = {};

// Parse a key=val string.
// These can get pretty hairy
// example flow:
// parse(foo[bar][][bla]=baz)
// return parse(foo[bar][][bla],"baz")
// return parse(foo[bar][], {bla : "baz"})
// return parse(foo[bar], [{bla:"baz"}])
// return parse(foo, {bar:[{bla:"baz"}]})
// return {foo:{bar:[{bla:"baz"}]}}
var pieceParser = function (eq) {
    return function parsePiece (key, val) {

        var sliced, numVal, head, tail, ret;

        if (arguments.length !== 2) {
            // key=val, called from the map/reduce
            key = key.split(eq);
            return parsePiece(
                QueryString.unescape(key.shift()),
                QueryString.unescape(key.join(eq))
            );
        }
        key = key.replace(/^\s+|\s+$/g, '');
        if (typeof (val) === 'string') {
            val = val.replace(/^\s+|\s+$/g, '');
            // convert numerals to numbers
            if (!isNaN(val)) {
                numVal = +val;
                if (val === numVal.toString(10)) {
                    val = numVal;
                }
            }
        }
        sliced = /(.*)\[([^\]]*)\]$/.exec(key);
        if (!sliced) {
            ret = {};
            if (key) {
                ret[key] = val;
            }
            return ret;
        }
        // ["foo[][bar][][baz]", "foo[][bar][]", "baz"]
        tail = sliced[2];
        head = sliced[1];

        // array: key[]=val
        if (!tail) {
            return parsePiece(head, [val]);
        }

        // obj: key[subkey]=val
        ret = {};
        ret[tail] = val;
        return parsePiece(head, ret);
    };
};

// the reducer function that merges each query piece together into one set of params
var mergeParams = function(params, addition) {
    return (
        // if it's uncontested, then just return the addition.
        (!params) ? addition
        // if the existing value is an array, then concat it.
        : (_.isArray(params)) ? params.concat(addition)
        // if the existing value is not an array, and either are not objects, arrayify it.
        : (!_.isObject(params) || !_.isObject(addition)) ? [params].concat(addition)
        // else merge them as objects, which is a little more complex
        : mergeObjects(params, addition)
    );
};

// Merge two *objects* together. If this is called, we've already ruled
// out the simple cases, and need to do the for-in business.
var mergeObjects = function(params, addition) {
    for (var i in addition) {
        if (i && addition.hasOwnProperty(i)) {
            params[i] = mergeParams(params[i], addition[i]);
        }
    }
    return params;
};

/**
 * Provides QueryString.parse method to accept Query Strings and return native
 * JavaScript objects.
 *
 * @param qs {String} Querystring to be parsed into an object.
 * @param sep {String} (optional) Character that should join param k=v pairs together. Default: "&"
 * @param eq  {String} (optional) Character that should join keys to their values. Default: "="
 * @public
 * @static
 */
QueryString.parse = function (qs, sep, eq) {
    // wouldn't Array(qs.split()).map(pieceParser(eq)).reduce(mergeParams) be prettier?
    return _.reduce(
        _.map(
            qs.split(sep || "&"),
            pieceParser(eq || "=")
        ),
        mergeParams,
        {}
    );
};

/**
 * Provides QueryString.unescape method to be able to override default decoding
 * method.  This is important in cases where non-standard delimiters are used, if
 * the delimiters would not normally be handled properly by the builtin
 * (en|de)codeURIComponent functions.
 * Default: replace "+" with " ", and then decodeURIComponent behavior.
 * @param s {String} String to be decoded.
 * @public
 * @static
 **/
QueryString.unescape = function (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
};

return QueryString;
});
