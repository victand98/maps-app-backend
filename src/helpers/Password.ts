import bcrypt from "bcrypt";

export class Password {
  static async toHash(password: string) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hash(password, salt);
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return bcrypt.compare(suppliedPassword, storedPassword);
  }
}
