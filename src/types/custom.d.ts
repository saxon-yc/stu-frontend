type Iobject = {
  readonly [index: string]: any;
};

type Ifunction<T = void> = (...params: any[]) => T;

type IBasicDataTypes = string | number | boolean;
