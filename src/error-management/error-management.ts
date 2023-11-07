export class Error {
  constructor(
    readonly code: number,
    readonly message: string,
  ) {}
}

export class Result<T> {
  constructor(readonly data: T) {}
}