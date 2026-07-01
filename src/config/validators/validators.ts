/* Creamos una clase especial para hacer validadores, por ejemplo, validaciones de emails
o passwords usando regex */
export class Validators {
  // Static method para validar un email usando regex. Formato:
  // - Debe tener un @
  // - Debe tener un dominio
  // - Debe tener un TLD (Top Level Domain) de 2 a 6 caracteres
  public static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }

  // Static method para validar un password usando regex. Formato:
  // - Debe tener al menos 8 caracteres
  // - Debe tener al menos una letra mayúscula
  // - Debe tener al menos una letra minúscula
  // - Debe tener al menos un número
  // - Debe tener al menos un caracter especial
  public static get password() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  }
}
