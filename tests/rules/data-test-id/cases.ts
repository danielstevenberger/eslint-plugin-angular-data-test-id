import { convertAnnotatedSourceToFailureCase } from '@angular-eslint/utils';
import type { MessageIds } from '../../../src/rules/data-test-id';

const messageId: MessageIds = 'dataTestID';

export const valid = [
  '<button data-test-id="test-btn"></button>',
  '<a data-test-id="test-a"></a>',
  '<input data-test-id="test-input">',
  '<p></p>',
];

export const invalid = [
  convertAnnotatedSourceToFailureCase({
    messageId,
    description: 'should fail when input element does not have data-test-id',
    annotatedSource: `
        <input>
        ~~~~~~~
      `,
    data: { element: 'input' },
  }),
  convertAnnotatedSourceToFailureCase({
    messageId,
    description: 'should fail when input element does not have data-test-id',
    annotatedSource: `
        <button></button>
        ~~~~~~~~~~~~~~~~~
      `,
    data: { element: 'button' },
  }),
  convertAnnotatedSourceToFailureCase({
    messageId,
    description: 'should fail when input element does not have data-test-id',
    annotatedSource: `
        <a></a>
        ~~~~~~~
      `,
    data: { element: 'a' },
  }),
];
