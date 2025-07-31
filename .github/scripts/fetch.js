const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BASE_URL = 'https://www.post.japanpost.jp/zipcode/dl/utf/zip';

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const yyyymm = `${year}${month.toString().padStart(2, '0')}`;
const yymm = `${year.toString().slice(2)}${month.toString().padStart(2, '0')}`;

// 保存先パス
const latestPath = path.join(__dirname, '../../public/utf_ken_all.zip');
const diffDir = path.join(__dirname, '../../public/diff', yyyymm);

if (!fs.existsSync(diffDir)) {
    fs.mkdirSync(diffDir, { recursive: true });
}

// 対象ファイル
const files = [
    {
        name: 'utf_ken_all.zip',
        url: `${BASE_URL}/utf_ken_all.zip`,
        dest: latestPath,
    },
    {
        name: `utf_add_${yymm}.zip`,
        url: `${BASE_URL}/utf_add_${yymm}.zip`,
        dest: path.join(diffDir, `utf_add_${yymm}.zip`),
    },
    {
        name: `utf_del_${yymm}.zip`,
        url: `${BASE_URL}/utf_del_${yymm}.zip`,
        dest: path.join(diffDir, `utf_del_${yymm}.zip`),
    },
];

async function tryDownload({ name, url, dest }) {
    try {
        const res = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(dest, res.data);
        console.log(`✅ Saved: ${name}`);
    } catch (e) {
        if (e.response?.status === 404) {
            console.log(`⛔ Not found (skipped): ${name}`);
        } else {
            console.error(`❌ Error fetching ${name}: ${e.message}`);
            process.exit(1);
        }
    }
}

(async () => {
    for (const file of files) {
        await tryDownload(file);
    }
})();
