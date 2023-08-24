type Iobject = {
  readonly [index: string]: any;
};

type Ifunction<T = void> = (...params: any[]) => T;

type IBasicDataTypes = string | number | boolean;

interface QueryParams {
  search_word: string;
  limit: number;
  offset: number;
  start_time: string;
  end_time: string;
}
declare global {
  interface Window {
    AMap;
  }
}
