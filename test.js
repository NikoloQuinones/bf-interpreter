"use strict";
import fs from "fs";


import { run } from "./interp.js";

const hello = fs.readFileSync("hello.bf");
const bench = fs.readFileSync("bench.bf");
const hanoi = fs.readFileSync("hanoi.bf");
const brot = fs.readFileSync("mandelbrot.bf");
const myTest = fs.readFileSync("tester.bf");

// run(myTest);
run(hello);
run(bench);
run(hanoi);
run(brot);
