// .github/scripts/fetch.js

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = 'https://www.post.japanpost.jp/zipcode/dl/utf/zip';
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // 1-based
const ym = `${year}${month.toString().padStart(2, '0')}`;
const yymm = `${year.toString().slice(2)}${month.toString().padStart(2, '0')}`;

const saveDir = path.join(__dirname, '../../public', ym);
if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
}

const files = [
    { name: 'utf_ken_all.zip', url: `${BASE_URL}/utf_ken_all.zip` },
    { name: `utf_add_${yymm}.zip`, url: `${BASE_URL}/utf_add_${yymm}.zip` },
    { name: `utf_del_${yymm}.zip`, url: `${BASE_URL}/utf_del_${yymm}.zip` },
];

async function tryDownload({ name, url }) {
    const outPath = path.join(saveDir, name);
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(outPath, response.data);
        console.log(`✅ Saved: ${name}`);
    } catch (e) {
        if (e.response?.status === 404) {
            console.log(`⛔ Not found (skipped): ${name}`);
        } else {
            console.error(`❌ Error fetching ${name}:`, e.message);
            process.exit(1);
        }
    }
}

(async () => {
    for (const file of files) {
        await tryDownload(file);
    }
})();
