import { Controller } from 'egg';
import { promises as fs } from 'fs';
import { createContext, runInContext } from 'vm';

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
      id: 'a',
      name: 'A',
      code: 'return $input + 1',
      next: ['b'],
    },
    {
      id: 'b',
      name: 'B',
      code:
        'return new Promise((s) => setTimeout(() => {s($input * 2);}, 1000));',
      next: ['c'],
      prev: ['a'],
    },
    {
      id: 'c',
      name: 'C',
      code: 'return $input * $input',
      next: [],
      prev: ['b'],
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

export default class FileController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = 'File manipulation APIs';
  }
  public async create() {
    const { ctx } = this;
    const { name, content } = ctx.request.body as {
      name: string;
      content: string;
    };

    try {
      await fs.writeFile(name, content);
      ctx.body = { success: true };
    } catch (error) {
      console.log(error);
      ctx.body = { success: false, message: error.toString() };
    }
  }

  public async eval() {
    const { ctx } = this;
    const runFlow = init();
    const result = await runFlow('a', 1);
    ctx.body = { result };
  }

  public async get() {
    const {
      ctx,
      config: { userDir },
    } = this;

    const fileName = `${userDir}/${ctx.params.fileName}`;

    try {
      const content = await fs.readFile(fileName);
      ctx.body = content;
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  }
}
