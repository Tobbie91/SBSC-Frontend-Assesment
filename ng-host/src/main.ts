// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import '@sbsc-assessment/react';
// import App from 'next/app';


// bootstrapApplication(App, appConfig).catch((err: any) => console.error(err));
import '@sbsc-assessment/react';  // <-- defines <react-collab-widget>

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent);
