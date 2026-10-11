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

// Second, even more portable variant: inline the local clips as data URIs so the
// page opens with zero sibling files (no `videos/` folder needed at all). The
// live deploy keeps using the lean file above so the published page stays light.
const videoDir = path.join(dir, "videos");
const standalonePath = path.join(dir, "Game-Design-Portfolio-standalone.html");
let standalone = html;
let inlined = 0;
if (fs.existsSync(videoDir)) {
  for (const name of fs.readdirSync(videoDir)) {
    if (!name.toLowerCase().endsWith(".mp4")) continue;
    const ref = "videos/" + name;
    if (!standalone.includes(ref)) continue;
    const b64 = fs.readFileSync(path.join(videoDir, name)).toString("base64");
    standalone = standalone.split(ref).join("data:video/mp4;base64," + b64);
    inlined += 1;
  }
}
fs.writeFileSync(standalonePath, standalone, "utf8");
console.log(
  "standalone file:",
  standalonePath,
  (standalone.length / 1048576).toFixed(1) + " mb",
  "(" + inlined + " clip" + (inlined === 1 ? "" : "s") + " inlined)",
);
if (inlined === 0) {
  console.warn("warning: no local clips were inlined - check dist-single/videos/");
}