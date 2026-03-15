const http = require("http");
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const presentationRoot = path.join(root, "apps", "presentation");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function resolvePath(urlPath) {
  const safePath = urlPath === "/" ? "/index.html" : urlPath;
  const normalized = path.normalize(safePath).replace(/^(\.\.[/\\])+/, "");
  return path.join(presentationRoot, normalized);
}

const server = http.createServer((request, response) => {
  const filePath = resolvePath(request.url.split("?")[0]);

  if (!filePath.startsWith(presentationRoot)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    response.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream"
    });
    response.end(data);
  });
});

server.listen(port, () => {
  console.log(`Presentation preview available at http://localhost:${port}`);
});
