import { RuleTester } from '@angular-eslint/utils';
import rule, { RULE_NAME } from '../../../src/rules/data-test-id';
import { invalid, valid } from './cases';

const ruleTester = new RuleTester({
  parser: '@angular-eslint/template-parser',
});

// @ts-ignore
ruleTester.run(RULE_NAME, rule, {
  valid,
  invalid,
});
