// Use this script to trigger revalidation of specific tags from cache
// Usage: `node src/scripts/revalidate.mjs <tag>`
// Example: `node src/scripts/revalidate.mjs menu`
import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(process.cwd(), ".env.local") });

import fetch from "node-fetch";

const TAG = process.argv[2];
const TOKEN = process.env.REVALIDATE_TOKEN;
const SITE = "http://localhost:3000";

console.log("🔄 Revalidating tag:", TAG);
console.log("🔐 Token present?", TOKEN ? "yes" : "no");

if (!TAG) {
    console.error("❌ Provide a tag, e.g. `node src/scripts/revalidate.js menu`");
    process.exit(1);
}
if (!TOKEN) {
    console.error("❌ Missing REVALIDATE_TOKEN in .env.local");
    process.exit(1);
}

(async () => {
    try {
        const res = await fetch(`${SITE}/api/revalidate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tag: TAG, token: TOKEN }),
        });
        const contentType = res.headers.get("content-type");
        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await res.json();
        } else {
            data = await res.text();
            console.warn("⚠️ Response is not JSON. Raw response:", data);
        }
        console.log("✅ Response:", data);
    } catch (err) {
        console.error("❌ Error:", err);
    }
})();
