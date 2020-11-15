// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportButterflow from '../../../app/controller/butterflow';
import ExportHome from '../../../app/controller/home';

declare module 'egg' {
  interface IController {
    butterflow: ExportButterflow;
    home: ExportHome;
  }
}
