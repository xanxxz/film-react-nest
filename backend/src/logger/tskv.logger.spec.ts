import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;

  const fixedDate = '2024-01-01T00:00:00.000Z';

  beforeAll(() => {
    // искусственный контроль над временем
    jest.useFakeTimers();
    jest.setSystemTime(new Date(fixedDate));
  });

  beforeEach(() => {
    logger = new TskvLogger();

    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('форматирует строку корректно', () => {
    const value = (logger as any).format('info', 'hello', 'a', 123);

    expect(value).toBe(
      `level=info\tmessage=hello\ttimestamp=${fixedDate}\tparams=a,123`
    );
  });

  it('отправляет log в console.log', () => {
    logger.log('test', 'param1');

    expect(logSpy).toHaveBeenCalledWith(
      `level=log\tmessage=test\ttimestamp=${fixedDate}\tparams=param1`
    );
  });

  it('отправляет error в console.error', () => {
    logger.error('oops', 'X');

    expect(errorSpy).toHaveBeenCalledWith(
      `level=error\tmessage=oops\ttimestamp=${fixedDate}\tparams=X`
    );
  });

  it('отправляет warn в console.warn', () => {
    logger.warn('warn msg');

    expect(warnSpy).toHaveBeenCalledWith(
      `level=warn\tmessage=warn msg\ttimestamp=${fixedDate}\tparams=`
    );
  });

  it('отправляет debug в console.debug', () => {
    logger.debug('dbg', 777);

    expect(debugSpy).toHaveBeenCalledWith(
      `level=debug\tmessage=dbg\ttimestamp=${fixedDate}\tparams=777`
    );
  });

  it('verbose использует console.debug', () => {
    logger.verbose('v', 'p');

    expect(debugSpy).toHaveBeenCalledWith(
      `level=verbose\tmessage=v\ttimestamp=${fixedDate}\tparams=p`
    );
  });
});
