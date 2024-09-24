export class OnlyOrgsCanRegisterPetError extends Error {
  constructor() {
    super('Only orgs can register a pet.')
  }
}
