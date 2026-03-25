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

## Vercel ile paylaşım (`*.vercel.app`)

[Çorum HDF taslağındaki](https://hdf-2vz1.vercel.app/) gibi kısa bir **`.vercel.app`** adresi için:

### A) GitHub’dan (önerilen)

1. Projeyi GitHub’a push edin (yukarıdaki gibi).
2. [vercel.com](https://vercel.com) → **Add New… → Project** → GitHub reponuzu seçin.
3. **Framework Preset:** Other (veya boş). **Build Command:** boş. **Output Directory:** boş / `.` (kökte `index.html` olduğu için ek ayar gerekmez).
4. **Deploy** — birkaç dakika içinde `https://proje-adi-xxx.vercel.app` benzeri link üretilir.
5. İsterseniz **Settings → Domains** ile özel alan adı da bağlayabilirsiniz.

### B) CLI ile (repo olmadan deneme)

```bash
cd /path/to/aski
npx vercel
```

İlk seferde hesap bağlayıp onaylarsınız; sonunda da aynı şekilde `*.vercel.app` linki verilir. `npx vercel --prod` ile “production” URL’i sabitlenir.

---

## Yerel önizleme

```bash
python3 -m http.server 8080
```

Tarayıcı: http://localhost:8080
