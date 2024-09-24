export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('This Org already exists.')
  }
}
