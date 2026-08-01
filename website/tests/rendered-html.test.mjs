import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://bcr-reliability-privacy.example/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished BCR preview site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>BCR Reliability \+ Privacy/);
  assert.match(html, /Call recording that/);
  assert.match(html, /fails safer/);
  assert.match(html, /Unofficial preview/);
  assert.match(html, /Download root module/);
  assert.match(html, /Device testing pending/);
  assert.match(html, /bcr-improved-preview-module\.zip/);
  assert.match(html, /SHA256SUMS\.txt/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});
