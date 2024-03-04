/* eslint-disable @typescript-eslint/no-explicit-any */
import Bugsnag from '@bugsnag/js';
import { LogLevelDesc, LogLevelNumbers, getLogger } from 'loglevel';

import { IS_DEVELOPMENT } from '../configuration/constants';

export const logger = getLogger('default');

logger.setLevel((process.env.REACT_APP_LOG_LEVEL || 'error') as LogLevelDesc);

const listeners: any[] = [];
if (logger.getLevel() === logger.levels.DEBUG || logger.getLevel() === logger.levels.TRACE) {
  const originalFactory = logger.methodFactory;

  logger.methodFactory = function (methodName: any, logLevel: LogLevelNumbers, loggerName: any) {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);

    return function (...message: any[]) {
      try {
        const finalMessage = message
          .map((item) => (typeof item === 'object' || Array.isArray(item) ? JSON.stringify(item) : item))
          .join(' ');
        let bugsnagSeverity: 'error' | 'info' | 'warning';

        switch (methodName) {
          case 'error':
            bugsnagSeverity = 'error';
            break;
          case 'info':
            bugsnagSeverity = 'info';
            break;
          case 'warn':
            bugsnagSeverity = 'warning';
            break;

          default:
            bugsnagSeverity = 'warning';
            break;
        }
        if (IS_DEVELOPMENT || methodName === 'error') {
          Bugsnag.notify({ name: `Logs-${loggerName}`, message: finalMessage }, (report) => {
            report.severity = bugsnagSeverity;
            report.addMetadata('logger', {
              methodName,
              loggerName,
            });
          });
        } else if (methodName === 'info') {
          Bugsnag.notify({ name: `Logs-${loggerName}`, message: finalMessage }, (report) => {
            report.severity = bugsnagSeverity;
            report.addMetadata('logger', {
              methodName,
              loggerName,
            });
          });
        }
        listeners.forEach((listener) => listener(message));
        // eslint-disable-next-line no-empty
      } catch {}
      rawMethod(message);
    };
  };
}
logger.setLevel(logger.getLevel());

export const streamLogs = (listener: any) => {
  listeners.push(listener);
};
