// META: title=Synchronous NativeIO API: Out-of-bounds errors for setLength.
// META: global=dedicatedworker
// META: script=resources/support.js

'use strict';

test(testCase => {
  const file = createFileSync(testCase, "file_length_zero");
  file.setLength(0);
  const lengthDecreased = file.getLength();
  assert_equals(lengthDecreased, 0,
                "NativeIOFileSync.setLength() should set the file length to 0.");
}, 'NativeIOFileSync.setLength() does not throw an error when descreasing ' +
     'the file length to 0.');


test(testCase => {
  const file = createFileSync(testCase, "file_length_large");
  const out_of_int64_bounds = 2**63+1;
  assert_throws_js(TypeError, () => file.setLength(out_of_int64_bounds));
}, 'NativeIOFileSync.setLength throws() when attempting to set the length ' +
     'beyond the limit of int64.');


test(testCase => {
  const file = createFileSync(testCase, "file_length_negative");
  assert_throws_js(TypeError, () => file.setLength(-1));
}, 'NativeIOFileSync.setLength() throws when setting negative lengths.');
