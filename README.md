# 📦 japanpost mirror

> Reliable mirror of official Japan Post zip code data.  
> Always up-to-date. No CORS issues. Easy to consume.

---

## 🗾 What is this?

This repository provides a public mirror of the **Japanese postal code data** (全国一括／差分データ), originally published by [Japan Post](https://www.post.japanpost.jp/zipcode/download.html).

**Why?**

- ✅ Japan Post's official zip file is updated monthly but...
  - ❌ CORS-protected (not accessible from browsers)
  - ❌ Download links are not permanent
  - ❌ No versioning or diff tracking
- ✅ This mirror solves all of that!

---

## 📁 Folder structure

```
/
├── public/
│ ├── utf_ken_all.zip # Latest full data (overwritten monthly)
│ └── diff/
│ ├── 202507/
│ │ ├── utf_add_2507.zip # Additions for July 2025
│ │ └── utf_del_2507.zip # Deletions for July 2025
│ └── ...
```

- `utf_ken_all.zip`: Always holds the **latest** full dataset
- `diff/YYYYMM/`: Monthly difference files, if available

## 📅 Update Schedule

- 🕐 **Automatically updated on the 1st of each month**
- 📦 Powered by GitHub Actions
- 🔎 Source: [https://www.post.japanpost.jp/zipcode/download.html](https://www.post.japanpost.jp/zipcode/download.html)

---

## 📦 Usage Example

```ts
const response = await fetch(
  'https://raw.githubusercontent.com/bitboxx-inc/japanpost-mirror/main/public/utf_ken_all.zip'
);
const arrayBuffer = await response.arrayBuffer();
// unzip, parse CSV, etc...
```

For monthly diffs:
https://raw.githubusercontent.com/bitboxx-inc/japanpost-mirror/main/public/diff/202507/utf_add_2507.zip
https://raw.githubusercontent.com/bitboxx-inc/japanpost-mirror/main/public/diff/202507/utf_del_2507.zip

## ✅ License
This repository only mirrors public data originally published by Japan Post.
Refer to their terms of use for details.

## ⭐ Star this repo
If this mirror helped you avoid a CORS error, manual download, or monthly copy-paste hassle,
consider giving it a ⭐! It helps visibility and longevity.

Maintained with ❤️ by bitboxx-inc
