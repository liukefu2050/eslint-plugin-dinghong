/**
 * @fileoverview div tags must have an id or className
 * @author liukefu
 */
'use strict';

const DESCRIPTION = 'Empty div is not allowed!';

module.exports = {
    meta: {
        docs: {
            description: DESCRIPTION,
            recommended: false
        },
        fixable: null,
        schema: []
    },

    create: function(context) {
        const
            DIV = 'div',
            JSX_ATTRIBUTE = 'JSXAttribute',
            LITERAL = 'Literal';
        const hasSomeProps = ({ type, name, value }) => {

            if (type !== JSX_ATTRIBUTE) {
                return false;
            }

            const hasValue = value && value.type === LITERAL && value.value.length;
            return name.name && hasValue;
        };
        const isNotDivTag = ({ name }) => name.name !== DIV;
        return {
            JSXOpeningElement(node) {
                if (isNotDivTag(node)) {
                    return;
                }
                const hasValidAttribute = node.attributes.some(hasSomeProps);

                if (!hasValidAttribute) {
                    context.report({
                        node,
                        message: DESCRIPTION
                    });
                }
            }
        };
    }
};
