import { generateHtml } from "./generator";
import * as fs from "fs";
import * as path from "path";

generateHtml().then(html => {
  fs.writeFileSync(path.join(__dirname, "../docs/index.html"), html);
});