


export type ServicesOutput<T> = {
  data: T;
  hasError: false;
} | {
  hasError: true;
  errorMessage: string;
}
