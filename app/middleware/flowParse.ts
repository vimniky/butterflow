// https://eggjs.org/zh-cn/basics/middleware.html
// module.exports = (options) => {
//   return async function parse(ctx, next) {
//     await next();
//     // 后续中间件执行完成后将响应体转换成 gzip
//     let body = ctx.body;
//     if (!body) return;
//     // 支持 options.threshold
//     if (options.threshold && ctx.length < options.threshold) return;
//     if (isJSON(body)) body = JSON.stringify(body);
//     // 设置 gzip body，修正响应头
//     const stream = zlib.createGzip();
//     stream.end(body);
//     ctx.body = stream;
//     ctx.set('Content-Encoding', 'gzip');
//   };
// };

interface Func {
  id: string;
  name: string;
  code: string;
  env?: any;
  input?: any | any[];
  output?: any | any[];
  prev?: string | string[];
  next?: string | string[];
  conditions?: any[];
}

function init() {
  const funcs: Func[] = [
    {
      id: "a",
      name: "A",
      code: "return $input + 1",
      next: ["b"],
    },
    {
      id: "b",
      name: "B",
      code:
        "return new Promise((s) => setTimeout(() => {s($input * 2);}, 1000));",
      next: ["c"],
      prev: ["a"],
    },
    {
      id: "c",
      name: "C",
      code: "return $input * $input",
      next: [],
      prev: ["b"],
    },
  ];
  const funcMap = funcs.reduce((acc, f) => {
    acc[f.id] = f;
    return acc;
  }, {});

  const runFlow = async (id: string, message: any) => {
    const f = funcMap[id];
    f.input = message;
    f.env = { setTimeout, $input: message };

    const result = await new Promise((resolve, reject) => {
      f.env.resolve = resolve;
      f.env.reject = reject;
      createContext(f.env);
      const code = `function f() {
        ${f.code};
      };
      resolve(f());
      `;
      runInContext(code, f.env);
    });

    f.output = result;
    if (!f.next.length) return;

    const promises: Promise<unknown>[] = [];
    for (let i = 0; i < f.next.length; i++) {
      const nf = funcMap[f.next[i]];
      const p = runFlow(nf.id, result);
      promises.push(p);
    }

    await Promise.all(promises);
    return funcs.map((f) => ({ id: f.id, output: f.output }));
  };

  return runFlow;
}

module.exports = (options) => {
  return async function parse(ctx, next) {};
};
