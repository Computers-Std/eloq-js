const { topScope, specialForms, run, evaluate } = require("../eval.js");

specialForms.set = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }

  const varName = args[0].name;
  let currentScope = scope;

  // Traverse up the scope chain to find where the variable is defined
  while (currentScope !== null && !Object.hasOwn(currentScope, varName)) {
    currentScope = Object.getPrototypeOf(currentScope);
  }

  if (currentScope === null) {
    throw new ReferenceError(`Cannot set undefined variable: ${varName}`);
  }

  const value = evaluate(args[1], scope);
  currentScope[varName] = value;
  return value;
};

run(`
do(define (x, 4),
   set(x, 5),
   print(x))`);

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
