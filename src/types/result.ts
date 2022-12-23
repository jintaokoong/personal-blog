abstract class BaseResult<TValue, TError> {
  abstract map<TNewValue>(
    fn: (value: TValue) => TNewValue
  ): BaseResult<TNewValue, TError>;
  abstract catch(fn: (error: TError) => TValue): TValue;
  static from<TValue, TError = Error>(
    fn: () => TValue
  ): BaseResult<TValue, TError> {
    try {
      return new Ok(fn());
    } catch (error) {
      return new Err(error as any);
    }
  }
  abstract flatMap<TNewValue>(
    fn: (value: TValue) => BaseResult<TNewValue, TError>
  ): BaseResult<TNewValue, TError>;
  abstract unwrap(): TValue;
  abstract unwrapOr(defaultValue: TValue): TValue;
}

export class Err<TValue, TError = Error> extends BaseResult<TValue, TError> {
  ok: false;
  error: TError;
  constructor(error: TError) {
    super();
    this.ok = false;
    this.error = error;
  }

  map<TNewValue>(
    fn: (value: TValue) => TNewValue
  ): BaseResult<TNewValue, TError> {
    return new Err(this.error);
  }

  catch(fn: (error: TError) => TValue): TValue {
    return fn(this.error);
  }

  unwrap(): TValue {
    throw this.error;
  }

  unwrapOr(defaultValue: TValue): TValue {
    return defaultValue;
  }

  flatMap<TNewValue>(
    fn: (value: TValue) => BaseResult<TNewValue, TError>
  ): BaseResult<TNewValue, TError> {
    return new Err(this.error);
  }
}

export class Ok<TValue, TError = Error> extends BaseResult<TValue, TError> {
  ok: true;
  value: TValue;

  constructor(value: TValue) {
    super();
    this.ok = true;
    this.value = value;
  }

  map<TNewValue>(
    fn: (value: TValue) => TNewValue
  ): BaseResult<TNewValue, TError> {
    return new Ok(fn(this.value));
  }

  catch(fn: (error: TError) => TValue): TValue {
    return this.value;
  }

  unwrap(): TValue {
    return this.value;
  }

  unwrapOr(defaultValue: TValue): TValue {
    return this.value;
  }

  flatMap<TNewValue>(
    fn: (value: TValue) => BaseResult<TNewValue, TError>
  ): BaseResult<TNewValue, TError> {
    return fn(this.value);
  }
}

export type Result<TValue, TError> = Ok<TValue, TError> | Err<TValue, TError>;
