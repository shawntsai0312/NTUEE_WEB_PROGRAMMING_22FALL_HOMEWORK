# Better Linktree
### 在localhost安裝與測試之步驟
* 安裝
  * cd frontend && yarn
  * cd backend && yarn
  * 將.env放進backend
* 測試
  * cd frontend && yarn start
  * cd backend && yarn server
  * 在 `process.env.NODE_ENV !== "production"` 時，只要後端重啟，資料庫就會初始化以便測試
  * 預設有十組帳密為`testXemail`、`testXpassword`，X為0~9之任意整數，例如`test0email`、`test0password`
  * 預設的帳密帶有測資，可以直接進行測試
  * 若不想使用預設預設帳密，也可以自行sign up，而sign up後將會是個全新不帶有任何資料的帳號
### 每位組員負責之項目
* B10901176 蔡弘祥
  * 後端、前後端溝通、前端基礎架構、架上Railway
* B10901169 黃元湛
  * 前端大部分頁面設計、前端邏輯
* B10705001 孫浩恩
  * 前端部分頁面設計、簡報製作