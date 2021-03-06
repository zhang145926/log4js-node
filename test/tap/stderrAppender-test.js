'use strict';

const test = require('tap').test;
const layouts = require('../../lib/layouts');
const sandbox = require('sandboxed-module');

test('stderr appender', (t) => {
  const output = [];

  const appender = sandbox.require(
    '../../lib/appenders/stderr',
    {
      globals: {
        process: {
          stderr: {
            write: function (data) {
              output.push(data);
            }
          }
        }
      }
    }
  ).appender(layouts.messagePassThroughLayout);

  appender({ data: ['biscuits'] });
  t.plan(2);
  t.equal(output.length, 1, 'There should be one message.');
  t.equal(output[0], 'biscuits\n', 'The message should be biscuits.');
  t.end();
});
