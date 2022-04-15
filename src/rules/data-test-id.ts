import type { TmplAstElement } from '@angular-eslint/bundled-angular-compiler';
import {
  createESLintRule,
  getTemplateParserServices,
} from '../utils/create-eslint-rule';

type Options = [];
export type MessageIds = 'dataTestID';
export const RULE_NAME = 'data-test-id';

export default createESLintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforces elements to have data-test-id attribute for e2e.',
      recommended: false,
    },
    schema: [],
    messages: {
      dataTestID: '<{{element}}/> element must have data-test-id attribute.',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = getTemplateParserServices(context);

    return {
      'Element$1[name=/^(a|button|input)$/]'(node: TmplAstElement) {
        const isValid = isValidNode(node);

        if (!isValid) {
          const loc = parserServices.convertElementSourceSpanToLoc(
            context,
            node
          );

          context.report({
            loc,
            messageId: 'dataTestID',
            data: {
              element: node.name,
            },
          });
        }
      },
    };
  },
});

function isValidNode(node: TmplAstElement): boolean {
  return hasDataTestIdAttr(node);
}

function hasDataTestIdAttr(node: TmplAstElement): boolean {
  return node.attributes.some(({ name }) => {
    return isDataTestId(name);
  });
}

function isDataTestId(name: string): name is 'data-test-id' {
  return name === 'data-test-id';
}
