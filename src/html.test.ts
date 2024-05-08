import { isLinkClose, isLinkOpen } from "./html.ts";
import { assert } from "@std/assert/assert";
import { assertFalse } from "@std/assert/assert-false";

Deno.test("isLinkOpen()", () => {
  assert(isLinkOpen('<a href="https://example.com/">'));
  assert(isLinkOpen("<a>"));
  assertFalse(isLinkOpen("</a>"));
  assertFalse(isLinkOpen("<b>"));
  assertFalse(isLinkOpen("</b>"));
  assertFalse(isLinkOpen("asdf"));
});

Deno.test("isLinkClose()", () => {
  assert(isLinkClose("</a>"));
  assert(isLinkClose("</a >"));
  assertFalse(isLinkClose("<a>"));
  assertFalse(isLinkClose("<b>"));
  assertFalse(isLinkClose("</b>"));
  assertFalse(isLinkClose("asdf"));
});
