# For You

A personal, interactive surprise website — built as plain HTML/CSS/JS
so it runs anywhere and deploys easily to GitHub Pages.

## Project structure

```
for-you/
├── index.html          ← page structure (rarely needs editing)
├── css/
│   └── style.css        ← all visual styling
├── js/
│   ├── config.js         ← ✏️ EDIT THIS — names, text, photo/song paths
│   └── app.js            ← rendering + interaction logic
├── photos/               ← put your photos here (see photos/README.txt)
└── audio/                ← put your song here (see audio/README.txt)
```

**You only need to touch `js/config.js`** to personalize everything —
names, the story timeline, gallery captions, the "little things" list,
the quiz questions, the secret message, the letter, and the invitation
details. Drop images into `/photos` and a song into `/audio` using the
filenames already referenced in `config.js` (or update the paths to
match your own filenames).

## Run it locally

You just need any local web server (opening `index.html` directly by
double-clicking can block some browsers from loading the JS/CSS files
due to browser security rules around `file://` paths).

**Option A — Python (already installed on most Macs/Linux):**
```bash
cd for-you
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

**Option B — VS Code:**
Install the "Live Server" extension, right-click `index.html`, and
choose "Open with Live Server."

**Option C — Node:**
```bash
npx serve .
```

## Deploy with GitHub Pages

1. Create a new **private** repository on GitHub (keep it private if
   you'd rather she doesn't stumble onto it beforehand).
2. From inside the `for-you` folder:
   ```bash
   git init
   git add .
   git commit -m "our website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub: go to your repo → **Settings → Pages**.
4. Under "Build and deployment," set **Source** to "Deploy from a
   branch," pick the **main** branch and the **/ (root)** folder, then
   save.
5. GitHub will publish it at:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO/
   ```
   (takes 1–2 minutes the first time.)

**A note on privacy:** GitHub Pages sites are publicly reachable by
anyone with the link, even from a private repo (Pages itself is a
public URL unless you're on GitHub Enterprise/Pro with Pages
visibility controls). If you want it to stay just between the two of
you, don't share the link or index it anywhere, and consider a
non-obvious repo/site name.

## Before you send it

- [ ] Fill in `herName` / `yourName` in `js/config.js`
- [ ] Add your photos to `/photos`
- [ ] Add your song to `/audio` (optional)
- [ ] Rewrite the timeline entries with your real story
- [ ] Rewrite the "little things" list
- [ ] Rewrite the quiz questions
- [ ] Rewrite the secret message
- [ ] Rewrite the letter (this is the placeholder text people notice
      most if left unedited)
- [ ] Fill in the invitation details
- [ ] Test on your own phone first, on mobile data (not just wifi),
      to check load time and layout
