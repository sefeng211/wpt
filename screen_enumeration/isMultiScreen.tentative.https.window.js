// META: global=window
// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
'use strict';

promise_test(async testCase => {
  assert_equals(typeof self.isMultiScreen, 'function');
}, 'isMultiScreen() is present');

promise_test(async testCase => {
  await test_driver.set_permission({name: 'window-placement'}, 'granted');
  assert_equals(typeof await self.isMultiScreen(), 'boolean');
}, 'isMultiScreen() returns a boolean value with permission granted');

promise_test(async testCase => {
  await test_driver.set_permission({name: 'window-placement'}, 'denied');
  assert_equals(typeof await self.isMultiScreen(), 'boolean');
}, 'isMultiScreen() returns a boolean value with permission denied');

promise_test(async testCase => {
  let iframe = document.body.appendChild(document.createElement('iframe'));
  let iwindow = iframe.contentWindow;
  assert_equals(typeof await iwindow.isMultiScreen(), 'boolean');
  document.body.removeChild(iframe);
  assert_equals(await iwindow.isMultiScreen(), undefined);
}, 'iframe window supports isMultiScreen() while attached');
