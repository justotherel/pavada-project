const DEFAULT_CHAR_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export class StringGenerator {
  public static getRandomString(length: number, charset = DEFAULT_CHAR_SET): string {
    if (isNaN(length)) {
      throw Error("expected number, but given NaN");
    }
    let random = "";
    for (let i = 0; i < length; i++) {
      random += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return random;
  }
}
