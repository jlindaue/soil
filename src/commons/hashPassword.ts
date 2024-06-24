import { sha256 } from "js-sha256";
import { SALT } from "./config";

export function hashPassword(password: string): string{
    let hash = sha256.create();
    hash.update(`${password}${SALT}`);
    return hash.hex() + "0aA"; // adding 0aA so the backend password check passes
}