declare module "bcryptjs" {
  export function hash(
    s: string,
    salt: number | string,
    callback?: (err: Error, hash: string) => void,
  ): Promise<string>;

  export function compare(
    s: string,
    hash: string,
    callback?: (err: Error, isMatch: boolean) => void,
  ): Promise<boolean>;

  export function genSalt(
    rounds: number,
    callback?: (err: Error, salt: string) => void,
  ): Promise<string>;
}
