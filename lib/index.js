/**
 * @fileoverview 自定义规则集
 * @author liukefu
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports = {
    rules: requireIndex(__dirname + "/rules"),
    configs: {
        recommended: {
            plugins: ['dinghong'],
            rules: {
                'dinghong/no-var': ['error'],
                'dinghong/no-date-parse': ['error'],
                'dinghong/no-todo-comment': ['error'],
                'dinghong/no-new-date-single': ['error'],
                'dinghong/no-clear-timer': ['error'],
                'dinghong/no-inner-style': ['error'],

            }
        }
    }
}



