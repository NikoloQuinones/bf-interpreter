// Interpreter for Brainfuck

"use strict";

// each op is a command in BF, or a special op representing more than one command
const Ops = {
  Left: "<",
  Right: ">",
  Add: "+",
  Sub: "-",
  Forward: "[",
  Back: "]",
  Output: ".",
  Input: ",",
  Zero: "0",
}; 

// Opcodes stores an opcode and an operand
class Opcode {
  constructor(op, operand = null) {
    this.op = op;
    this.operand = operand;
  }
}


// takes a string of BF commands and interprets them into Opcodes
const create_program = (bytes) => {
  const prog = []; // array of Opcods
  let i = 0; // index of current byte
  
  // loop through the bytes and add opcodes
  while (i < bytes.length) {
    switch (bytes[i]) {
      
      case 60: // <
        prog.push(new Opcode(Ops.Left, 0));
        i = optimize_consec(bytes, prog, i, 60);
        break;
      case 62: // >
        prog.push(new Opcode(Ops.Right, 0));
        i = optimize_consec(bytes, prog, i, 62);
        break;
      case 43: // +
        prog.push(new Opcode(Ops.Add, 0));
        i = optimize_consec(bytes, prog, i, 43);
        break;
      case 45: // -
        prog.push(new Opcode(Ops.Sub, 0));
        i = optimize_consec(bytes, prog, i, 45);
        break;
      case 91: // [
        prog.push(new Opcode(Ops.Forward));
        break;
      case 93: // ]
        prog.push(new Opcode(Ops.Back));
        break;
      case 46: // .
        prog.push(new Opcode(Ops.Output));
        break;
      case 44: // ,
        prog.push(new Opcode(Ops.Input));
        break;
      default:
        break;
    }
    i += 1;
  }

  return prog;
};

// compresses repeated BF commands into a single opcode
const optimize_consec = (bytes, prog, i, op) => {
  let count = 1; // number of consecutive commands
  i += 1; 
  // iterate through bytes until a different command is found
  while (bytes[i] === op) { 
    count += 1;
    i += 1;
  }
  prog[prog.length - 1].operand = count; // add the count to the new opcode
  return i - 1; // return new index to continue the loop through the bytes
}

// compresses [-] into a single opcode which zeroes the cell 
const optimize_zero = (prog) => {
  let i = 0;
  // iterate through the program looking for [-]
  while (i < prog.length-2) {;
    if (prog[i].op === Ops.Forward && prog[i+1].op === Ops.Sub && prog[i+2].op === Ops.Back) {
      // replace the [-] with a single opcode
      prog.splice(i, 3, new Opcode(Ops.Zero));
    }
    i += 1;
  }

};

// sets jump locations for [ and ] commands
const align_brackets = (prog) => {
  let i = 0;
  let stack = []; // for keeping track of the last [ command
  // iterate through the program looking for [ and ] commands
  while (i < prog.length) {
    let token = prog[i].op;
    if (token === Ops.Forward) { 
      stack.push(i);
    } else if (token === Ops.Back) {
      // set the jump locations for both the ] command and the matching the [ command
      let X = stack.pop();
      prog[X].operand = i;
      prog[i].operand = X;
    }
    i += 1;
  }
};

// runs the program and outputs the result
const bf_eval = (prog) => {
  const cells = new Uint8Array(10000);
  let cc = 0;
  let pc = 0;
  // iterate through the program and execute each command
  while (pc < prog.length) {
    switch (prog[pc].op) {
      case Ops.Left:
        cc = cc - prog[pc].operand; 
        break;
      case Ops.Right:
        cc = cc + prog[pc].operand; 
        break;
      case Ops.Add:
        cells[cc] = cells[cc] + prog[pc].operand;
        break;
      case Ops.Sub:
        cells[cc] = cells[cc] - prog[pc].operand;
        break;
      case Ops.Forward:
        if (cells[cc] === 0) {
          pc = prog[pc].operand;
        }
        break;
      case Ops.Back:
        if (cells [cc] !== 0) {
          pc = prog[pc].operand;
        }
        break;
      case Ops.Zero:
        cells[cc] = 0;
        break;
      case Ops.Output:
        process.stdout.write(String.fromCharCode(cells[cc]));
        break;
      case Ops.Input:
        cells[cc] = fs.readSync(
          process.stdin.fd,
          Buffer.alloc(1),
          0,
          1,
          null,
        )[0];
        break;
      default:
        break;
    }
    pc += 1;
  }
};

export const run = (bytes) => {
  const prog = create_program(bytes);
  optimize_zero(prog);
  align_brackets(prog);
  bf_eval(prog);
};
