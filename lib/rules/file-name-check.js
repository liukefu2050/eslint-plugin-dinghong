/**
 * @fileoverview Ensure file name compliance
 * @author liukefu
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var path = require('path');

module.exports = function (context) {
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
        "Program": function (node) {
            var filename = context.getFilename(),
                absoluteFilename = path.resolve(filename),
                parsed = parseFilename(absoluteFilename);
            //shouldIgnore = isIgnoredFilename(filename),
            //isIndex = isIndexFile(parsed);

            //console.log(filename);
            //console.log(absoluteFilename);
            //console.log(parsed);
            var pascalcase = /^[A-Z]([A-Z0-9]*[a-z]+)+[A-Z0-9]*(?:\..*)?$/;
            var camelcase = /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?(?:\..*)?$/;
            var kebabcase = /^([a-z]+-)*[a-z]+(?:\..*)?$/;

            if (parsed.dir.indexOf('components') != -1) {
                if (!pascalcase.test(parsed.name) && (parsed.ext == '.ts' || parsed.ext == '.tsx') && parsed.name != 'index') {
                    context.report(node, "components  file name must be uppercase.");
                }
            }else if(parsed.dir.indexOf('types') != -1){
                if (!pascalcase.test(parsed.name) && (parsed.ext == '.ts' || parsed.ext == '.tsx') && parsed.name != 'index') {
                    context.report(node, "types file name must be uppercase.");
                }
            } else {

                if (!camelcase.test(parsed.name) && (parsed.ext == '.ts' || parsed.ext == '.tsx')) {
                    context.report(node, "The file name must be camelcase.");
                }

                var srcIndex = parsed.dir.indexOf('\\src');
                if (srcIndex != -1) {

                    var filePath = parsed.dir.substring(srcIndex+5,parsed.dir.length);

                    var pathArr = filePath.split("\\");
                    var hasMatched = false;

                    for (var i = 0; i < pathArr.length; i++) {
                        var currPath = pathArr[i];
                        if(currPath && !kebabcase.test(currPath)){
                            hasMatched = true;
                        }
                    }

                    if(hasMatched){
                        context.report(node, "Folder must be lowercase, underlined.");
                    }
                }

            }

        }
    };

};
