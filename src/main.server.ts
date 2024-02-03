import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';
import { ApplicationRef } from '@angular/core';
import { AppModule } from './app/app.module';

const bootstrap = (): Promise<ApplicationRef> =>
  bootstrapApplication(AppModule, config);

export default bootstrap;
