# Final PA

This assignment explores the gray zone between compilers and interpreters.
Interpreters generally execute code as it is read. Compilers first process
the code to find optimizations, then output a new representation that can
be executed at a later date.

To start this assignment, finish the skeleton code provided in `step-1/interp.js`.
You should not need more than 15 new lines of code to complete this interpreter.

After testing your interpreter (see `step-1/README.md`), continue on to `step-2`.
As a first step on `step-2`, copy the edits you made to `step-1/interp.js`
into the `step-2/` folder.

Continue this process through all the `interp` puzzles. None of the implementations
should require more than 20 or so lines changed from the previous interp.

## Grading

Grading is a combination of correctness and performance (speed).
You will only need to submit a single interp.js file, which I will benchmark
for speed and test the output for accuracy. If you can beat the benchmark,
you will achieve the points corresponding to that level. Assuming you correctly
implement each step you will receive:

| Name                | Score |
| ------------------- | ----- |
| Correct             | 30%   |
| L2 - caching        | 40%   |
| L3 - opcodes        | 50%   |
| L4 - inline bracket | 60%   |
| L5 - inline ops     | 70%   |
| L6 - zero op        | 80%   |
| L7 - more ops       | 100%  |
| L8 - ???            | 110%  |

If you are significantly faster than the L7 benchmark, you will receive up to 10% additional extra credit.

## Submission

Submit only only version of interp.js

## Description of each BF implementation

- `interp1`: the basic BF interpreter.
- `interp2`: the basic BF interpreter with bracket caching.
- `interp3`: a BF interpreter with opcodes and bracket caching.
- `interp4`: a BF interpreter with opcodes and inline bracket caching.
- `interp5`: a BF interpreter with opcodes, inline bracket caching, and opcode
  optimisation.
- `interp6`: a BF compiler with opcodes, inline bracket caching,
  Add/Sub/Left/Right optimisations, and Zero optimisation.
- `interp7`: a BF optimizing compiler

## Testing

Use Node: `node test.js`, and make sure to point to the latest version of your interp.

You can also run some performance evaluations yourself by using the `bench.js` file.
Investigate as you see fit.
