# openmemory-db-swe

Bộ nhớ mẫu cho [openmemory](https://github.com/Stellarhold170NT/openmemory) — **SWEBOK Guide v4.0** (627 chunks, 627 summaries, 10,006 entities, 48,374 relationship descriptions). Đã build bằng embedding model `intfloat/multilingual-e5-large`.

File nén ~486MB > giới hạn 100MB/file của git nên được tách thành các phần `.partNof6`.

## Cài (3 bước)

```powershell
# 1. tải tất cả file swe-sample-db.tar.gz.part* + join-file.mjs về cùng 1 thư mục

# 2. ghép + giải nén
node join-file.mjs swe-sample-db.tar.gz swe-sample-db.tar.gz.part1of6
tar -xzf swe-sample-db.tar.gz    # → databases/...

# 3. đăng ký memory cho openmemory
node ~/.config/opencode/cognee/cognee-memory-add.cjs swe "E:\duong\dan\databases" "SWEBOK Guide v4.0"
```

## Files

- `swe-sample-db.tar.gz.part1of6 ... part6of6` — các phần ≤90MB
- `join-file.mjs` — ghép lại: `node join-file.mjs <output> <part-01>`
- `SHA256SUMS.txt` — kiểm tra file ghép: `node -e "..."` hoặc `Get-FileHash` so với file này
