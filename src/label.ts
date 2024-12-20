import { escape } from "@std/html";

/**
 * Converts a full handle to a bare handle.
 * @param handle The full handle.
 * @param env The environment.
 * @returns The bare handle without the domain in HTML.
 */
// deno-lint-ignore no-explicit-any
export function toBareHandle(handle: string, _env: any): string {
  const idx = handle.indexOf("@", 1);
  if (idx < 0) {
    return `<span class="at">@</span><span class="user">${
      escape(handle.startsWith("@") ? handle.substring(1) : handle)
    }</span>`;
  }
  let user = handle.substring(0, idx);
  if (user.startsWith("@")) user = user.substring(1);
  return `<span class="at">@</span><span class="user">${escape(user)}</span>`;
}

/**
 * Does nothing, but just returns the full handle in HTML.
 * @param handle The full handle.
 * @param env The environment.
 * @returns The full handle.
 */
// deno-lint-ignore no-explicit-any
export function toFullHandle(handle: string, _env: any): string {
  const idx = handle.indexOf("@", 1);
  if (idx < 0) {
    return `<span class="at">@</span><span class="user">${
      escape(handle.startsWith("@") ? handle.substring(1) : handle)
    }</span>`;
  }
  let user = handle.substring(0, idx);
  if (user.startsWith("@")) user = user.substring(1);
  const domain = handle.substring(idx + 1);
  return `<span class="at">@</span><span class="user">${
    escape(user)
  }</span><span class="at">@</span><span class="domain">${
    escape(domain)
  }</span>`;
}
