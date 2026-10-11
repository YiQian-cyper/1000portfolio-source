import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("dist-single");
const htmlPath = path.join(dir, "index.html");
const outPath = path.join(dir, "Game-Design-Portfolio.html");

let html = fs.readFileSync(htmlPath, "utf8");

const jsTag = html.match(/<script[^>]*src="[^"]*"[^>]*><\/script>/);
const linkTags = html.match(/<link[^>]*>/g) ?? [];
const cssTag = linkTags.find(
  (t) => /rel="stylesheet"/.test(t) && /href="(?!https?:)/.test(t),
);
if (!jsTag || !cssTag) {
  throw new Error("could not find script/link tags in " + htmlPath);
}

const jsFile = path.join(dir, jsTag[0].match(/src="([^"]*)"/)[1].replace(/^\.\//, ""));
const cssFile = path.join(dir, cssTag.match(/href="([^"]*)"/)[1].replace(/^\.\//, ""));

const js = fs.readFileSync(jsFile, "utf8").replace(/<\/script/gi, "<\\/script");
const css = fs.readFileSync(cssFile, "utf8");

// The original tag was a deferred module script in <head>. As a classic inline
// script it would run before <div id="root"> exists, so move it to the end of
// the body where the DOM is already parsed.
html = html.replace(jsTag[0], "");
html = html.replace("</body>", () => "<script>\n" + js + "\n</script>\n</body>");
html = html.replace(cssTag, () => "<style>\n" + css + "\n</style>");

fs.writeFileSync(outPath, html, "utf8");
console.log("single file:", outPath, (html.length / 1024).toFixed(0) + " kb");