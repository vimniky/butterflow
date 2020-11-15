// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportDemo from '../../../app/middleware/demo';

declare module 'egg' {
  interface IMiddleware {
    demo: typeof ExportDemo;
  }
}
