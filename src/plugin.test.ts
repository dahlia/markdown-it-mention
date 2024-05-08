import { assertEquals } from "@std/assert/assert-equals";
import MarkdownIt from "markdown-it-impl";
import { toFullHandle } from "./label.ts";
import { mention } from "./plugin.ts";

Deno.test("mention()", () => {
  const md = new MarkdownIt({
    html: true,
  });
  md.use(mention);
  // deno-lint-ignore no-explicit-any
  const env: any = {};
  const html = md.render(
    `\
**Hello**, *@hongminhee@mastodon.social*!

> @hongminhee@todon.eu

[This should be ignored: @hongminhee@wizard.casa](https://example.com/)

<a href="">This also should be ignored: @foo@bar.com</a>
`,
    env,
  );
  assertEquals(env.mentions, [
    "@hongminhee@mastodon.social",
    "@hongminhee@todon.eu",
  ]);
  assertEquals(
    html,
    `\
<p><strong>Hello</strong>, <em><a  href="acct:@hongminhee@mastodon.social"><span class="at">@</span><span class="user">hongminhee</span></a></em>!</p>
<blockquote>
<p><a  href="acct:@hongminhee@todon.eu"><span class="at">@</span><span class="user">hongminhee</span></a></p>
</blockquote>
<p><a href="https://example.com/">This should be ignored: @hongminhee@wizard.casa</a></p>
<p><a href="">This also should be ignored: @foo@bar.com</a></p>
`,
  );

  const md2 = new MarkdownIt({
    html: true,
  });
  md2.use(mention, {
    link: (handle: string) =>
      handle.endsWith("@bar.com") ? `https://example.com/${handle}` : null,
    linkAttributes: (handle: string) => ({
      class: "mention",
      "data-handle": handle,
    }),
    label: toFullHandle,
  });
  const html2 = md2.render("# @foo@bar.com\n\n> @baz@qux.com");
  assertEquals(
    html2,
    '<h1><a  class="mention" data-handle="@foo@bar.com" href="https://example.com/@foo@bar.com">' +
      '<span class="at">@</span><span class="user">foo</span><span class="at">@</span>' +
      '<span class="domain">bar.com</span></a></h1>\n' +
      "<blockquote>\n" +
      "<p>@baz@qux.com</p>\n" +
      "</blockquote>\n",
  );
});
