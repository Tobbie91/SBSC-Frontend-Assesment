import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import '@sbsc-assessment/react';


bootstrapApplication(App, appConfig).catch((err: any) => console.error(err));
