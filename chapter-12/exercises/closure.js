const { run } = require("../eval.js");

run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`);

/* This is called Currying,

   Each nested function returns a new function that partially applies
one argument, gradually filling the parameters of the original
function.
 */
