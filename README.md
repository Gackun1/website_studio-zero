# 実験空間 Studio Zero

作家・東條麗子が主宰するアートスペース「実験空間 Studio Zero」の公式サイトです。

公開URL（GitHub Pages）: https://gackun1.github.io/website_studio-zero/

## ページ構成

| パス | 内容 |
| --- | --- |
| `index.html` | トップ（ヒーロー、About、企画展、作品、活動記録、Journal） |
| `about.html` | スタジオと作家・東條麗子について |
| `exhibition.html` | 企画展『-MASUKU-』の作品一覧 |
| `product/maskXX/index.html` | 『-MASUKU-』各作品の詳細（01〜09） |
| `gallery.html` | 作品アーカイブ（カテゴリ絞り込み・拡大表示） |
| `activities.html` | 活動記録（年表） |
| `contact.html` | お問い合わせ（Instagram / Facebook、DM 文面作成） |
| `404.html` | Not Found |

## 更新のしかた

HTML は `scripts/build.mjs` が生成します。ページの HTML を直接編集せず、次の手順で更新してください。

1. 内容を変える: `scripts/data.mjs` を編集する
   - `masuku` … 企画展の作品（素材・サイズ・価格・解説）
   - `works` … ギャラリー掲載作品（`id` は Instagram 投稿の通し番号）
   - `activities` … 活動記録
2. レイアウトを変える: `scripts/build.mjs` のテンプレート、`css/style.css`、`js/main.js`
3. 生成する: `npm run build`（Node.js 18 以上、追加パッケージは不要）
4. 確認する: `npm run serve` → http://localhost:8080

`scripts/posts.json` には、Instagram 投稿の投稿コード・投稿日・作家自身の投稿文が通し番号ごとに入っています。ギャラリーと活動記録の日付・キャプション・リンクはここから自動で引かれます。

### 画像を追加する

- ギャラリー: `images/works/w{id}.webp`（幅1080px）と `w{id}-sm.webp`（幅540px）、縦横比 4:5
- 企画展: `images/masuku/{no}.webp`（1000px 四方）と `{no}-sm.webp`（560px）

## 出典

- 作品写真・投稿文: 東條麗子 Instagram [@reiko.0t](https://www.instagram.com/reiko.0t/)（作家本人の許可のもと掲載）
- SNOWART 2022 の情報: [十日町市 報道資料（2021年12月20日）](https://www.city.tokamachi.lg.jp/material/files/group/3/kaiken20211220-3.pdf)
- 企画展『-MASUKU-』の作品データ: 旧サイト掲載内容

All artworks © Reiko Tojo.
