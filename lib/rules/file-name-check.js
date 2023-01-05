/**
 * @fileoverview Ensure file name compliance
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

            //console.log(filename);
            //console.log(absoluteFilename);
            //console.log(parsed);

            if(parsed.dir.indexOf('components')!=-1){
                var pascalcase = /^[A-Z]([A-Z0-9]*[a-z]+)+[A-Z0-9]*(?:\..*)?$/;

                if (!pascalcase.test(parsed.name) && (parsed.ext=='.ts' || parsed.ext=='.tsx' ) && parsed.name!='index' ){
                    context.report(node, "components  file name must be capitalized.");
                }
            }else{
                var camelcase= /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?(?:\..*)?$/;

                if (!camelcase.test(parsed.name) && (parsed.ext=='.ts' || parsed.ext=='.tsx' )  ){
                    context.report(node, "The file name must be camelcase.");
                }
            }

        }
    };

};
