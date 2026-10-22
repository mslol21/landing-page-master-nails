import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const distDir = resolve("dist");
const templatePath = resolve(distDir, "index.html");
const serverBundle = resolve("dist-ssr/entry-server.js");
const template = await readFile(templatePath, "utf8");
const { render } = await import(pathToFileURL(serverBundle).href);
const markup = render();

if (
  !markup.includes("Pare de tentar acertar.") ||
  !markup.includes("O que você")
) {
  throw new Error(
    "A pré-renderização não incluiu o conteúdo esperado da landing page.",
  );
}

const result = template.replace(
  '<div id="root"></div>',
  `<div id="root">${markup}</div>`,
);
if (result === template) {
  throw new Error(
    "Não foi possível encontrar a raiz React vazia no HTML de produção.",
  );
}

await writeFile(templatePath, result);
await rm(resolve("dist-ssr"), { recursive: true, force: true });
console.log("HTML da landing page pré-renderizado em dist/index.html");
