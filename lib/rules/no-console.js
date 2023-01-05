/**
 * @fileoverview no-console
 * @author liukefu
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "no console",
            category: "Possible Errors",
            recommended: false // 配置文件中的 "extends": "eslint:recommended"属性是否启用该规则
        },
        fixable: null,  // or "code" or "whitespace"  // 是否根据规则修复
        schema: [
            {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        ]
    },
    create: function(context) {
        const logs = [
            "debug", "error", "info", "log", "warn",
            "dir", "dirxml", "table", "trace",
            "group", "groupCollapsed", "groupEnd",
            "clear", "count", "countReset", "assert",
            "profile", "profileEnd",
            "time", "timeLog", "timeEnd", "timeStamp",
            "context", "memory"
        ]

        return {
            CallExpression(node) {
                const allowLogs = context.options[0];
                const noLogs = Array.isArray(allowLogs)
                ? logs.filter(log => !allowLogs.includes(log))
                : logs;

                const callObj = node.callee.object;
                const callProp = node.callee.property;

                if(!callObj || !callProp) return;

                if(callObj.name !== 'console') return;

                if(noLogs.includes(callProp.name)) {
                    context.report({
                        node,
                        message: 'error: should remove console'
                    })
                }
            }

        };
    }
};
