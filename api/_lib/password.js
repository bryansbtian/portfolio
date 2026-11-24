import { createHash, timingSafeEqual } from "node:crypto";

// Verifies hashes from `openssl passwd -6` (SHA-512 crypt, default 5000 rounds).
const ROUNDS = 5000;
const ALPHABET = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const BYTE_ORDER = [
  [0, 21, 42], [22, 43, 1], [44, 2, 23], [3, 24, 45], [25, 46, 4], [47, 5, 26], [6, 27, 48],
  [28, 49, 7], [50, 8, 29], [9, 30, 51], [31, 52, 10], [53, 11, 32], [12, 33, 54], [34, 55, 13],
  [56, 14, 35], [15, 36, 57], [37, 58, 16], [59, 17, 38], [18, 39, 60], [40, 61, 19], [62, 20, 41],
];

const sha512 = (...parts) => {
  const hash = createHash("sha512");
  for (const part of parts) hash.update(part);
  return hash.digest();
};

const repeatTo = (block, length) =>
  Buffer.concat(Array(Math.ceil(length / block.length) || 0).fill(block)).subarray(0, length);

function encode(value, count) {
  let output = "";
  for (let i = 0; i < count; i++) {
    output += ALPHABET[value & 63];
    value >>= 6;
  }
  return output;
}

function sha512Crypt(password, saltText) {
  const key = Buffer.from(password, "utf8");
  const salt = Buffer.from(saltText, "utf8");

  const alternate = sha512(key, salt, key);
  const initial = [key, salt, repeatTo(alternate, key.length)];
  for (let bits = key.length; bits > 0; bits >>= 1) {
    initial.push(bits & 1 ? alternate : key);
  }
  let digest = sha512(...initial);

  const keySequence = repeatTo(sha512(...Array(key.length).fill(key)), key.length);
  const saltSequence = repeatTo(sha512(...Array(16 + digest[0]).fill(salt)), salt.length);

  for (let round = 0; round < ROUNDS; round++) {
    const parts = [round & 1 ? keySequence : digest];
    if (round % 3) parts.push(saltSequence);
    if (round % 7) parts.push(keySequence);
    parts.push(round & 1 ? digest : keySequence);
    digest = sha512(...parts);
  }

  let output = "";
  for (const [a, b, c] of BYTE_ORDER) {
    output += encode((digest[a] << 16) | (digest[b] << 8) | digest[c], 4);
  }
  return output + encode(digest[63], 2);
}

export function verifyPassword(password, stored) {
  const [empty, scheme, salt, expected, extra] = String(stored).split("$");
  if (empty !== "" || scheme !== "6" || !salt || salt.length > 16) return false;
  if (expected?.length !== 86 || extra !== undefined) return false;

  return timingSafeEqual(
    Buffer.from(sha512Crypt(password, salt)),
    Buffer.from(expected),
  );
}
