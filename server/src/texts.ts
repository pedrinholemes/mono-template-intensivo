export const TEXTS = {
  REQUIRED: (name: string): string => `O campo ${name} é obrigatório`,
  INVALID: (name: string): string => `O campo ${name} é inválido`,
  LONG: (name: string): string => `O campo ${name} está muito longo`,
  SMALL: (name: string): string => `O campo ${name} está muito curto`
}
