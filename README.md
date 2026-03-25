# ASKİ — UI/UX taslak

Statik HTML/CSS prototipi. **Resmi kurum sitesi değildir.**

## GitHub Pages ile paylaşım

1. GitHub’da yeni bir repository oluşturun (ör. `aski-taslak`), **boş** bırakın.
2. Bu klasörde:
   ```bash
   git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
   git push -u origin main
   ```
3. Repo **Settings → Pages**:
   - **Source:** Deploy from a branch  
   - **Branch:** `main` — `/ (root)`  
   - Save.
4. Birkaç dakika sonra site adresi:  
   `https://KULLANICI_ADI.github.io/REPO_ADI/`  
   Ana sayfa: `index.html` otomatik açılır.

Private repo + Pages: ücretsiz planda Pages da private olabilir; sadece davetli kullanıcılar görebilir (organizasyon ayarına bağlı).

## Yerel önizleme

```bash
python3 -m http.server 8080
```

Tarayıcı: http://localhost:8080
