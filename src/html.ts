const LINK_OPEN_PATTERN = /^<a[>\s]/i;
const LINK_CLOSE_PATTERN = /^<\/a\s*>/i;

/**
 * Tests if the given string is an opening link tag.
 * @function
 * @param html The string to test.
 * @returns `true` if the given string is an opening link tag,
 *          or `false` otherwise.
 */
export const isLinkOpen = LINK_OPEN_PATTERN.test.bind(LINK_OPEN_PATTERN);

/**
 * Tests if the given string is a closing link tag.
 * @function
 * @param html The string to test.
 * @returns `true` if the given string is a closing link tag,
 *          or `false` otherwise.
 */
export const isLinkClose = LINK_CLOSE_PATTERN.test.bind(LINK_CLOSE_PATTERN);
