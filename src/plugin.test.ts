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

> @hongminhee@todon.eu 테스트

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
<p><a  href="acct:@hongminhee@todon.eu"><span class="at">@</span><span class="user">hongminhee</span></a> 테스트</p>
</blockquote>
<p><a href="https://example.com/">This should be ignored: @hongminhee@wizard.casa</a></p>
<p><a href="">This also should be ignored: @foo@bar.com</a></p>
`,
  );

  const md2 = new MarkdownIt({
    html: true,
  });
  md2.use(mention, {
    // deno-lint-ignore no-explicit-any
    link: (handle: string, env: any) =>
      handle.endsWith(`@${env.domain}`)
        ? `https://example.com/${handle}`
        : null,
    // deno-lint-ignore no-explicit-any
    linkAttributes: (handle: string, env: any) => ({
      ...env.attrs,
      "data-handle": handle,
    }),
    label: toFullHandle,
  });
  const html2 = md2.render("# @foo@bar.com\n\n> @baz@qux.com", {
    domain: "bar.com",
    attrs: { class: "mention" },
  });
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
