export class DomainError extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

export class InvalidWeightError extends DomainError {
  constructor() {
    super('INVALID_WEIGHT', 'Weight must be positive');
  }
}
