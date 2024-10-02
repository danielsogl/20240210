import { HttpClient } from '@angular/common/http';
import {
  APP_INITIALIZER,
  EnvironmentProviders,
  inject,
  InjectionToken,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { tap } from 'rxjs';
import { ConfigState, initialConfigState } from './config.model';

export const CONFIG_STATE = new InjectionToken('CONFIG_TOKEN', {
  factory: () => {
    return signal(initialConfigState);
  },
});

export function provideConfigState(configUrl: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory:
        (configState = inject(CONFIG_STATE), http = inject(HttpClient)) =>
        () =>
          http
            .get<ConfigState>(configUrl)
            .pipe(tap((config) => configState.set(config))),
    },
  ]);
}
