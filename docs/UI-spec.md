# EnergyAI ROI Refactor — UI 規格書

| 項目 | 內容 |
| --- | --- |
| 文件版本 | v1.0 |
| 最後更新 | 2026-09-30 |
| 適用範圍 | ROI_refactor 前端專案(React 19 + MUI 9 + Vite) |
| 相關文件 | [docs/QA-test-plan.md](QA-test-plan.md) |

---

## 1. 技術框架

| 類別 | 技術 | 版本 |
| --- | --- | --- |
| UI Framework | React | 19.x |
| 元件庫 | MUI (Material UI) | 9.x |
| 表格 | MUI X DataGrid | 9.x |
| 圖表 | Highcharts (@highcharts/react) | 13.x / 5.x |
| 流程圖 | @xyflow/react (React Flow) | 12.x |
| 路由 | react-router-dom | 7.x |
| 多語系 | i18next + react-i18next + http-backend | 26.x |
| Toast | react-hot-toast(封裝於 `ToasterCustom`) | 2.x |
| 資料請求 | @tanstack/react-query + 自建 API services | 5.x |

---

## 2. 設計系統 (Design Tokens)

主題定義於 [src/settings/theme.ts](../src/settings/theme.ts),支援 **Light / Dark 雙模式**,以 `lightTheme` / `darkTheme` 匯出。

### 2.1 品牌色 / 語意色(Light / Dark 共用)

| Token | Main | Light | Dark |
| --- | --- | --- | --- |
| primary | `#0087DC` | `#53BDFF` | `#005995` |
| secondary | `#64D7D7` | `#A5E2FA` | `#4C96C7` |
| success | `#0D964D` | — | — |
| warning | `#F0C020` | — | — |
| error | `#EA6259` | — | — |
| info | `#00BEA5` | — | — |

### 2.2 灰階 (grayScale)

Light 模式:`50 #F9F9F9` → `900 #000000`;Dark 模式為反向對應(`50 #262626` → `900 #FFFFFF`)。取用方式為 `theme.palette.grey[n]`,同一個 n 值在兩種模式下自動對應合適深淺。

### 2.3 背景與文字

| Token | Light | Dark |
| --- | --- | --- |
| background.default | `#EEF2F6` | `#000000` |
| background.paper | `#FFFFFF` | `#262626` |
| text.primary | `#262626` (grey 700) | `#FFFFFF` (grey 900) |
| text.secondary | `#979797` (grey 300) | `#8F8F8F` (grey 500) |
| divider | `#EFEEEE` (grey 100) | `#4A4A4A` (grey 200) |

### 2.4 自訂語意 Token(`theme.palette.semantic`)

| Token | 用途 | Light | Dark |
| --- | --- | --- | --- |
| borderSubtle | 卡片 / 區塊細邊框 | grey 100 | grey 200 |
| surfaceSubtle | 次要底色(側邊欄、卡片) | grey 50 | grey 100 |
| headerSubtle | DataGrid 表頭底色 | `#F5F5F5` | grey 100 |
| textMuted | 弱化文字 | grey 200 | grey 300 |
| brandAdaptive | 品牌強調(隨模式變化) | `#0087DC` | `#FFFFFF` |
| errorAdaptive | 錯誤 icon 強調色 | `#EA6259` | `#FF8A80` |

> sx 中以字串取用,例:`borderColor: "semantic.borderSubtle"`、`accentColor="semantic.errorAdaptive"`。

### 2.5 互動狀態 (action / stateTokens)

| 狀態 | Light | Dark |
| --- | --- | --- |
| hover | `rgba(220,220,220,0.5)` | `rgba(102,102,102,0.5)` |
| selected | `#F0FAFE` | `#0087DC` |
| selected 文字 | `#0087DC` | `#FFFFFF` |
| disabled 文字 | grey 200 | grey 400 |
| disabled 底色 | grey 100 | grey 200 |

### 2.6 圖表色票(`theme.palette.chart`)

| Token | Light | Dark |
| --- | --- | --- |
| seriesColors | `#0087DC, #64D7D7, #0D964D, #F0C020, #EA6259, #00BEA5` | `#4DD0E1, #FFD54F, #53BDFF, #A5E2FA, #4CAF50, #FF8A80` |
| actualLine(實際值) | `#0087DC` | `#53BDFF` |
| predictLine(預測值) | `#64D7D7` | `#A5E2FA` |
| scatterDot | `rgba(0,135,220,0.45)` | `rgba(83,189,255,0.45)` |
| perfectFitLine(理想線) | `#EA6259` | `#FF8A80` |
| testBandFill(測試區間) | `rgba(100,215,215,0.12)` | `rgba(165,226,250,0.12)` |

### 2.7 字體排版

- 字體家族:`"Noto Sans SC", "Noto Sans TC", "Inter", "Helvetica", "Arial", sans-serif`
- h1:2rem / 700;h4:1.5rem / 600;h6:600
- DataGrid 儲存格:14px;表頭標題:13px / bold(演算法預覽表)
- 側邊欄選單文字:14px;版本文字:12px

### 2.8 圓角與間距

| 元素 | 圓角 |
| --- | --- |
| GridLayout 卡片 | 10px |
| IconButton(共用) | 10px |
| 側邊欄選單項目 | `borderRadius: 1`(8px) |
| 專案設定資訊卡 | `borderRadius: 2`(16px) |

間距使用 MUI spacing(1 = 8px);頁面容器 `SectionLayout` 統一 padding 24px。

---

## 3. 版面配置 (Layout)

### 3.1 整體結構

```
┌──────────────────────────────────────────────┐
│ Header(高度 68~70px,固定頂部)                │
├───────┬──────────┬───────────────────────────┤
│ 一級   │ 二級側邊欄 │ 主內容區                    │
│ 側邊欄 │ (220px)  │ (SectionLayout, p:24px)    │
│(72px) │ 可收合    │  bgcolor: background.paper │
└───────┴──────────┴───────────────────────────┘
```

| 常數 | 值 |
| --- | --- |
| HEADER_HEIGHT | 70px |
| 一級側邊欄收合寬 | 72px(`FIRST_COLLAPSED_WIDTH`) |
| 一級側邊欄展開寬 | 220px(hover 展開) |
| 二級側邊欄寬 | 220px(可收合為 0) |

### 3.2 側邊欄互動([Sidebar2.tsx](../src/components/layout/Sidebar2.tsx))

- **一級選單**:預設僅顯示 icon(30x30),滑鼠 hover 展開顯示文字;展開動畫 180~260ms ease。
- **二級選單**:點擊一級項目後顯示;可含第三層(Collapse 展開)。有 route 的項目點擊後導頁。
- **收合按鈕**:貼齊側邊欄右緣的圓形 toggle 按鈕,可整個收合二級側邊欄。
- **selected 狀態**:使用 `action.selected` 底色;disabled 項目使用 `action.disabled` 文字色。
- 選單資料來源:[src/mock/sidebar.tsx](../src/mock/sidebar.tsx) `getMenuItems(t)`,label 皆走 i18n key(`sidebarMenu.*`)。

### 3.3 無側邊欄版型

語言設定頁使用 [NoSidebarLayout.tsx](../src/components/layout/NoSidebarLayout.tsx):Header + 全寬內容區。

---

## 4. 路由與頁面清單

路由定義於 [src/routes/routes.tsx](../src/routes/routes.tsx),路徑常數於 [src/routes/paths.ts](../src/routes/paths.ts)。所有主要頁面掛在 `/:projectId?` 之下;projectId 無效時顯示 `ProjectNotFound` 頁。

| 模組 | 頁面 | 路徑 | 狀態 |
| --- | --- | --- | --- |
| 總攬 | KPI 總覽 | `overview/kpi-overview` | 停用(sidebar disabled) |
| 總攬 | 專案設定 | `overview/project-settings` | ✅ 完成(預設首頁) |
| 設備管理 | 設備列表 | `equipment-management/equipment-list` | ✅ 完成 |
| 設備管理 | 水路系統圖 | `equipment-management/mapping` | ✅ 完成 |
| 節能模擬 | 總攬 | `energy-saving-overview` | Placeholder |
| 節能模擬 | 專案CSV | `energy-saving-overview/project-csv` | 開發中 |
| 節能模擬 | 數據清洗 | `energy-saving-overview/data-cleaning` | Placeholder |
| 節能模擬 | M&V基準線 | `energy-saving-overview/m-and-v-baseline` | Placeholder |
| 節能模擬 | 模擬報告 | `energy-saving-overview/simulation-result-report` | Placeholder |
| 模型管理 | CSV列表 | `model/csv-list` | ✅ 完成 |
| 模型管理 | 模型列表 | `model/model-list` | ✅ 完成 |
| 最佳化策略 | 策略列表 | `optimization/optimization-strategies-list` | 停用 |
| 最佳化策略 | 新增策略 | `optimization/add-strategy` | Placeholder |
| 其他 | 語言設定 | `/language-settings` | ✅ 完成(無側邊欄版型) |

### 4.1 列表頁標準版型

所有列表頁遵循同一結構:

```
SectionLayout (height:100%, flex column)
├─ 標題列 (justify-content: space-between, mb: 2)
│   ├─ TitleText(頁面標題)
│   └─ 右側工具列 (gap: 1.5)
│       ├─ SearchBar(寬 280px)
│       └─ Button variant="outlined"(「+ 新增」等動作)
├─ (選用)Tabs 分類列
└─ DataGrid 容器 (flex:1, minHeight:0)
```

---

## 5. 共用元件規格

匯出入口:[src/components/index.ts](../src/components/index.ts)。

### 5.1 TitleText
頁面標題文字元件,所有頁面標題統一使用。

### 5.2 SearchBar
- 標準寬度:**280px**(`sx={{ width: 280 }}`)
- 受控元件:`value` / `onChange`,搭配 `useSearchFilter` hook 做前端即時過濾
- `placeholder` 使用 i18n key(如 `equipment-list.search-placeholder`)

### 5.3 Tabs
- 分類切換用(如設備分類、水路 CHW/CW 表)
- props:`items: {value, label}[]`、`value`、`onChange`
- 狀態:selected 文字 `#0087DC`(light)/ `#FFFFFF`(dark);hover 使用 `token.hover`;disabled 使用 `token.disabledText`

### 5.4 IconButton(SharedIconButton)
- 預設尺寸 44x44,圓角 10px,1px 邊框
- `active` 時:邊框與 icon 為 `primary.main`,底色 `action.selected`
- hover:底色 `action.hover`
- 需傳 `ariaLabel`

### 5.5 BooleanChip
- 顯示布林狀態的 Chip;`true` → `success.main`、`false` → `grey[500]`
- 底色為主色 15% 透明度(`alpha(base, 0.15)`),文字同主色、字重 600
- 預設文字 `t("common.yes")` / `t("common.no")`,可用 `trueLabel` / `falseLabel` 覆寫
- size:`small`(預設)/ `medium`

### 5.6 Dialog 家族

| 元件 | 用途 |
| --- | --- |
| ConfirmDeleteDialog | 刪除前二次確認;支援 `isDeleting` 載入中與錯誤訊息顯示 |
| ConfirmActionDialog | 一般動作確認 |
| InformationDialog | 純資訊提示 |

通用規格:
- Dialog paper:1px 邊框(`token.border`)、底色 `dialogPaper` token
- 表單 Dialog:`maxWidth="xs"~"md"` + `fullWidth`
- 送出中 (`submitting`):所有輸入與按鈕 disabled、確認鈕文字改「儲存中...」、禁止 backdrop 關閉(`onClose={submitting ? undefined : onClose}`)
- 按鈕順序:左「取消」(text)、右「確認」(`variant="contained"`);確認鈕在驗證未過時 disabled

### 5.7 Toast(ToasterCustom / showToast)

- API:`showToast(message, severity)`;severity:`success` / `error` / `info` / `warning`
- 文案一律走 i18n key,集中於 [src/settings/toasterWording.ts](../src/settings/toasterWording.ts)(`toaster_wording.success.*` / `toaster_wording.error.*`),呼叫端以 `t()` 包裝
- 錯誤訊息格式:`` `${t(key)}: ${error}` ``

### 5.8 Icons

- 自產 SVG icon 元件庫:[src/components/icons/generated](../src/components/icons/generated),命名規則 `N{尺寸}{分類}{名稱}`(如 `N30x30OptionsDelete`)
- 支援 `accentColor` prop 套用主題色(如 `accentColor="semantic.errorAdaptive"`)
- 尺寸慣例:一級選單 30x30、二級選單 20x20、表格操作 icon 30x30

---

## 6. DataGrid(表格)規格

全域樣式覆寫在 theme(`MuiDataGrid` styleOverrides),各頁表格遵循以下慣例:

### 6.1 外觀
- 無外框(`border: none`)、無陰影;表頭底色 `semantic.headerSubtle`
- 儲存格字級 14px;row hover 底色 `token.hover`;selected row hover 再加 `brightness(0.96)`
- cell / header focus 時不顯示 outline
- 開啟 `showCellVerticalBorder` 與 `showColumnVerticalBorder`

### 6.2 行為
- `autoPageSize`(依容器高自動分頁)+ 受控 `paginationModel`(預設 pageSize 10)
- `disableRowSelectionOnClick`
- 容器:`Box sx={{ width:"100%", height:"100%", minHeight:0, display:"flex" }}`

### 6.3 標準欄位

| 欄位 | 規格 |
| --- | --- |
| 序號 (no) | 寬 50~90,不可排序 / 過濾;跨頁連續編號:`page * pageSize + rowIndex + 1` |
| 一般文字欄 | `minWidth` + `flex: 1` |
| 長文字(備註) | ellipsis 截斷:`whiteSpace: nowrap; overflow: hidden; textOverflow: ellipsis` |
| 空值 | 顯示 `-` |
| 狀態欄 | 以 mapping 轉為文字(如 `1→啟用`、`2→停用`) |
| 操作欄 (action) | 寬 140~190;`IconButton size="small" sx={{p:0.5}}`,間距 `gap: 0.5`;檢視(Eyesopen)→ 編輯(Edit, `primary.main`)→ 刪除(Delete, `semantic.errorAdaptive`) |

### 6.4 可編輯儲存格(語言設定頁)
- `editable: true` + 雙擊進入編輯;表頭附 Tooltip(「可滑鼠雙擊編輯此語言的翻譯」)+ Information icon
- `processRowUpdate` 內比對變更、呼叫 API、成功後 refresh

---

## 7. 圖表 (Highcharts) 規格

- 主題橋接:`getHighchartsThemeOptions(theme)`(位於 [src/pages/Models/components/charts/helpers](../src/pages/Models/components/charts/helpers)),圖表顏色一律取自 `theme.palette.chart.*`,自動支援深淺色
- 共通:`credits: false`、`title: undefined`(標題由頁面提供)、`animation: false`
- **Y_XTimeChart**(時序折線):X 軸為時間,實際 vs 預測雙線;tickPositioner 限制約 5 個刻度;訓練/測試區間帶 (plotBand) 以 350ms ease 淡入淡出(Switch 切換)
- **YChart**(散佈圖):Predict(X)vs Actual(Y),含理想線(perfect fit);點半徑 2px、圓形;legend 置頂置中;tooltip 顯示 `Predict / Actual`
- 需先 side-effect import [highchartsSetup.ts](../src/settings/highchartsSetup.ts) 註冊 Column / Line / Scatter 模組

---

## 8. 水路系統圖 (React Flow)

- 元件:[ReactFlowInit.tsx](../src/components/ReactFlowInit.tsx) + [renderNodes.ts](../src/utils/renderNodes.ts)
- 分 CHW(冰水)/ CW(冷卻水)兩個 Tab;切換 Tab 時以 `key={selectedCategory}` 重建畫布
- 「新增負載 / 刪除負載」即時改表並顯示 info toast;修改後顯示提示文案 `MappingDiagram.info`,需按「儲存」才呼叫 API

---

## 9. 多語系 (i18n)

- 設定:[src/settings/i18n.ts](../src/settings/i18n.ts);語言檔:`public/locales/{lng}.json`
- 目前啟用語言:**en-US(預設 / fallback)、zh-TW**;zh-CN / th-TH / ja-JP / vi-VN 已備檔但註解停用([src/settings/languages.ts](../src/settings/languages.ts))
- 語言選擇儲存於 `localStorage.language`;Header 語言選單呼叫 `i18n.changeLanguage()`
- Key 命名慣例:`{頁面/模組}.{區塊}.{項目}`,例:`equipment-list.title`、`sidebarMenu.overview.label`、`toaster_wording.success.equipment_copy`、`common.yes`
- 動態分類名稱使用 `defaultValue` fallback:`t(key, { defaultValue: category.name })`
- 語言設定頁支援:匯出模板(下載檔案)、匯入翻譯、選取顯示語言、雙擊即時編輯翻譯

---

## 10. 表單與驗證規格

- 必填驗證:送出時檢查 `value.trim()`,失敗時 `error` + `helperText`(如 `t("project-settings.name-required")`);helperText 平時保留空白 `" "` 避免版面跳動
- 數字欄位:`type="number"`,以 `Number.isFinite()` 驗證;空字串送出時轉 `null`
- 編輯模式:檢視/編輯雙態(如專案設定頁),「取消」還原為原始值並離開編輯
- 送出流程:`submitting` state → disable 全表單 → 成功 toast + 關閉/刷新;失敗 toast(含 error 訊息)並停留原畫面
- 日期時間顯示:`new Date(value).toLocaleString()`,空值顯示 `-`

---

## 11. 狀態畫面規範

| 狀態 | 表現 |
| --- | --- |
| Loading | DataGrid 用內建 `loading` prop;一般區塊顯示 Loading 文字/指示 |
| Empty | DataGrid 內建 noRowsOverlay(底色同表格) |
| Error(頁面級) | 錯誤文字 + toast;列表 fallback 為空陣列或 mock 資料 |
| Error(Dialog 級) | Dialog 內顯示 errorMessage 文字(如「刪除失敗:{訊息}」) |
| 專案不存在 | [ProjectNotFound.tsx](../src/pages/ProjectNotFound.tsx):置中標題 + 說明 + 「回到首頁」contained 按鈕 |

---

## 12. 無障礙與其他約定

- IconButton 應提供 `aria-label`
- 深淺色模式切換由 `useThemeMode` hook 管理;所有顏色一律取 theme token,**禁止硬編 hex 於元件內**(圖表除外需經 `theme.palette.chart`)
- 動畫時長慣例:側邊欄 180~260ms、圖表區間帶 350ms、Dialog 面板滑動 300ms(`transform 0.3s ease`)
- 專案 ID 存於 sessionStorage(`projectId`),URL 以 `/:projectId` 為前綴

---

## 附錄 A:待補事項(規格缺口)

以下為目前程式碼中尚未統一、建議後續補齊的規格:

1. **硬編中文字串**:部分頁面(模型列表、語言設定、專案CSV、Optimization 設備列表)標題與按鈕文案仍為硬編中文,未走 i18n key。
2. **RWD 斷點**:目前未定義響應式斷點行為,版面以桌面(側邊欄 + 主內容)為準。
3. **Placeholder 頁面**:節能模擬多數子頁與最佳化策略頁尚未有設計稿與規格。
4. **KPI 總覽 / GridLayout**:`GridLayout` 元件(3x2 grid、row 高 220px、gap 12px)已就緒但頁面停用中。
5. **確認離開機制**:表單編輯中離開頁面尚無 unsaved-changes 提示。
