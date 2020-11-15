// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportButterflowEvent from '../../../app/controller/butterflow/event';
import ExportButterflowHttp from '../../../app/controller/butterflow/http';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    butterflow: {
      event: ExportButterflowEvent;
      http: ExportButterflowHttp;
    }
  }
}
