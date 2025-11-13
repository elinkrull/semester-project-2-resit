import { headers } from "./headers.mjs";

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
}
