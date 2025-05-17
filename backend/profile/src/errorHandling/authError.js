export class authError extends Error {
  constructor(message) {
    super(message);
    this.name = "authError";
  }
}