/**
 * @fileoverview Rule to ensure that there exist no index files
 * @author liukefu
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var path = require('path');

module.exports = function(context) {
    function parseFilename(filename) {
        var ext = path.extname(filename);

        return {
            dir: path.dirname(filename),
            base: path.basename(filename),
            ext: ext,
            name: path.basename(filename, ext)
        }
    };
    return {
        "Program": function(node) {
            var filename = context.getFilename(),
                absoluteFilename = path.resolve(filename),
                parsed = parseFilename(absoluteFilename);
                //shouldIgnore = isIgnoredFilename(filename),
                //isIndex = isIndexFile(parsed);

            console.log(filename);
            console.log(absoluteFilename);
            console.log(parsed);
            if (parsed=='js') {
                context.report(node, "'index.js' files are not allowed.");
            }
        }
    };

};
