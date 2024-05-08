import { toBareHandle, toFullHandle } from "./label.ts";
import { assertEquals } from "@std/assert/assert-equals";

Deno.test("toBareHandle()", () => {
  assertEquals(
    toBareHandle("@hongminhee@todon.eu"),
    '<span class="at">@</span><span class="user">hongminhee</span>',
  );
  assertEquals(
    toBareHandle("@hongminhee"),
    '<span class="at">@</span><span class="user">hongminhee</span>',
  );
});

Deno.test("toFullHanhdle()", () => {
  assertEquals(
    toFullHandle("@hongminhee@todon.eu"),
    '<span class="at">@</span><span class="user">hongminhee</span>' +
      '<span class="at">@</span><span class="domain">todon.eu</span>',
  );
  assertEquals(
    toFullHandle("@hongminhee"),
    '<span class="at">@</span><span class="user">hongminhee</span>',
  );
});
