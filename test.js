"use strict";
import fs from "fs";


import { run } from "./interp.js";

const hello = fs.readFileSync("bf/hello.bf");
const bench = fs.readFileSync("bf/bench.bf");
const hanoi = fs.readFileSync("bf/hanoi.bf");
const brot = fs.readFileSync("bf/mandelbrot.bf");
const myTest = fs.readFileSync("bf/tester.bf");

// run(myTest);
run(hello);
run(bench);
run(hanoi);
run(brot);
