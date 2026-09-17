/* ======================================================================
   RENDERING & INTERACTIONS — you shouldn't need to edit this file.
   Personalize content in js/config.js instead.
====================================================================== */

// ----- photo placeholder builder -----
function photoEl(src, caption, ar){
  const wrap = document.createElement('div');
  wrap.className = 'photo';
  if(ar) wrap.style.setProperty('--ar', ar);
  if(src){
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = caption || '';
    img.onerror = () => { wrap.innerHTML = placeholderHTML(caption); };
    wrap.appendChild(img);
  } else {
    wrap.innerHTML = placeholderHTML(caption);
  }
  if(caption){
    const cap = document.createElement('div');
    cap.className = 'photo-caption';
    cap.textContent = caption;
    wrap.appendChild(cap);
  }
  return wrap;
}
function placeholderHTML(caption){
  return `<div class="photo-placeholder">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="1.3"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 15l-4.5-4.5a2 2 0 00-2.8 0L7 17"/></svg>
    <span>Add a photo here${caption ? ' — ' + caption : ''}</span>
  </div>`;
}

// ----- 2. timeline -----
const timelineEl = document.getElementById('timeline');
CONFIG.timeline.forEach((item) => {
  const el = document.createElement('div');
  el.className = 'tl-item reveal';
  el.innerHTML = `
    <div class="tl-dot"></div>
    <div class="tl-card">
      <h3 class="tl-title">${item.title}</h3>
      <p class="tl-desc">${item.desc}</p>
      <div class="tl-photo"></div>
    </div>`;
  el.querySelector('.tl-photo').appendChild(photoEl(item.photo, '', '16/10'));
  timelineEl.appendChild(el);
});

// ----- 3. gallery -----
const galleryGrid = document.getElementById('galleryGrid');
const viewer = document.getElementById('viewer');
const viewerPhoto = document.getElementById('viewerPhoto');
const viewerCaption = document.getElementById('viewerCaption');
CONFIG.gallery.forEach((item) => {
  const cell = document.createElement('div');
  cell.className = 'gallery-cell';
  cell.appendChild(photoEl(item.src, '', '1/1.1'));
  cell.addEventListener('click', () => {
    viewerPhoto.innerHTML = '';
    viewerPhoto.appendChild(photoEl(item.src, '', '4/3'));
    viewerCaption.textContent = item.caption || '';
    viewer.classList.add('open');
  });
  galleryGrid.appendChild(cell);
});
document.getElementById('viewerClose').addEventListener('click', () => viewer.classList.remove('open'));
viewer.addEventListener('click', (e) => { if(e.target === viewer) viewer.classList.remove('open'); });

// ----- 4. little things -----
const thingsList = document.getElementById('thingsList');
CONFIG.littleThings.forEach((t, i) => {
  const el = document.createElement('div');
  el.className = 'thing reveal';
  el.innerHTML = `
    <div class="thing-row">
      <span class="thing-num">${String(i+1).padStart(2,'0')}</span>
      <h3 class="thing-title">${t.title}</h3>
      <div class="thing-plus"></div>
    </div>
    <p class="thing-body">${t.body}</p>`;
  el.addEventListener('click', () => el.classList.toggle('open'));
  thingsList.appendChild(el);
});

// ----- 5. quiz -----
let quizIndex = 0, quizScore = 0;
const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizReaction = document.getElementById('quizReaction');
const quizProgress = document.getElementById('quizProgress');
const quizActive = document.getElementById('quizActive');
const quizFinal = document.getElementById('quizFinal');

function buildQuizProgress(){
  quizProgress.innerHTML = '';
  CONFIG.quiz.forEach((_, i) => {
    const s = document.createElement('span');
    if(i < quizIndex) s.classList.add('done');
    quizProgress.appendChild(s);
  });
}
function renderQuiz(){
  buildQuizProgress();
  const item = CONFIG.quiz[quizIndex];
  quizQuestion.textContent = item.q;
  quizReaction.classList.remove('show');
  quizReaction.textContent = '';
  quizOptions.innerHTML = '';
  item.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => answerQuiz(i));
    quizOptions.appendChild(btn);
  });
}
function answerQuiz(i){
  const item = CONFIG.quiz[quizIndex];
  const buttons = quizOptions.querySelectorAll('.quiz-opt');
  buttons.forEach((b, idx) => {
    b.disabled = true;
    if(idx === item.correct) b.classList.add('correct');
    else if(idx === i) b.classList.add('wrong');
  });
  if(i === item.correct) quizScore++;
  quizReaction.textContent = item.reaction;
  quizReaction.classList.add('show');
  setTimeout(() => {
    quizIndex++;
    if(quizIndex < CONFIG.quiz.length) renderQuiz();
    else finishQuiz();
  }, 1300);
}
function finishQuiz(){
  buildQuizProgress();
  quizActive.style.display = 'none';
  quizFinal.classList.add('show');
  document.getElementById('quizScore').textContent = `${quizScore} / ${CONFIG.quiz.length}`;
  document.getElementById('quizScoreLine').textContent =
    quizScore === CONFIG.quiz.length ? "Okay... you know us pretty well." :
    quizScore >= Math.ceil(CONFIG.quiz.length/2) ? "Pretty solid. We've built a few good memories." :
    "We clearly need to make more memories together.";
}
document.getElementById('quizRestart').addEventListener('click', () => {
  quizIndex = 0; quizScore = 0;
  quizActive.style.display = '';
  quizFinal.classList.remove('show');
  renderQuiz();
});
renderQuiz();

// ----- 6. secret message -----
document.getElementById('secretPrompt').textContent = CONFIG.secret.prompt;
document.getElementById('secretMessageText').textContent = CONFIG.secret.message;
const secretStarsEl = document.getElementById('secretStars');
const totalStars = 4;
let starsActive = new Set();
for(let i=0;i<totalStars;i++){
  const b = document.createElement('button');
  b.className = 'secret-star';
  b.setAttribute('aria-label','Star ' + (i+1));
  b.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.9L22 10l-5.5 4.7L18 22l-6-3.8L6 22l1.5-7.3L2 10l7.1-1.1z"/></svg>`;
  b.addEventListener('click', () => {
    b.classList.add('active');
    starsActive.add(i);
    checkSecretUnlock();
  });
  secretStarsEl.appendChild(b);
}
const secretOrb = document.getElementById('secretOrb');
const secretOrbWrap = document.getElementById('secretOrbWrap');
const secretMessageBox = document.getElementById('secretMessage');
let orbAllowed = false;
function checkSecretUnlock(){ orbAllowed = starsActive.size === totalStars; }
secretOrb.addEventListener('click', () => {
  if(!orbAllowed || secretMessageBox.classList.contains('show')) return;
  secretOrbWrap.classList.add('unlocked');
  secretMessageBox.classList.add('show');
});

// ----- 7. letter -----
document.getElementById('letterGreeting').textContent = CONFIG.letter.greeting;
document.getElementById('letterSign').textContent = CONFIG.letter.sign;
const letterBody = document.getElementById('letterBody');
CONFIG.letter.paragraphs.forEach(p => {
  const el = document.createElement('p');
  el.textContent = p;
  letterBody.appendChild(el);
});

// ----- 8. finale / invitation -----
document.getElementById('inviteEyebrow').textContent = CONFIG.invitation.eyebrow;
document.getElementById('inviteTitle').textContent = CONFIG.invitation.title;
document.getElementById('inviteNote').textContent = CONFIG.invitation.note;
const inviteRows = document.getElementById('inviteRows');
[
  ['Time', CONFIG.invitation.time],
  ['Location', CONFIG.invitation.location],
  ['Activity', CONFIG.invitation.activity],
  ['Dress code', CONFIG.invitation.dressCode]
].forEach(([label, value]) => {
  const row = document.createElement('div');
  row.className = 'invite-row';
  row.innerHTML = `<span class="invite-label">${label}</span><span class="invite-value">${value}</span>`;
  inviteRows.appendChild(row);
});
document.getElementById('finaleBtn').addEventListener('click', function(){
  document.getElementById('invitation').classList.add('show');
  this.style.display = 'none';
});

// ----- landing kicker with name -----
document.getElementById('kickerName').textContent = `Hey ${CONFIG.herName !== "Her Name" ? CONFIG.herName : "you"}...`;

// ----- start journey -----
document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
  startMusic();
});

// ----- scroll reveal -----
const revealEls = document.querySelectorAll('.reveal, .tl-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
revealEls.forEach(el => io.observe(el));

// letter paragraphs reveal individually
const letterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); letterIO.unobserve(e.target); } });
}, { threshold: 0.3 });
letterBody.querySelectorAll('p').forEach(p => letterIO.observe(p));

// ----- progress rail -----
const progressFill = document.getElementById('progressFill');
function updateProgress(){
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progressFill.style.width = (scrolled * 100) + '%';
}
document.addEventListener('scroll', updateProgress, { passive:true });
updateProgress();

// ----- music control -----
const audio = document.getElementById('bgAudio');
audio.src = CONFIG.song.src;
const musicToggle = document.getElementById('musicToggle');
let musicOn = false;
function startMusic(){
  if(musicOn) return;
  musicOn = true;
  audio.play().catch(() => { /* file missing/blocked — fail silently */ });
  musicToggle.classList.remove('paused');
  musicToggle.setAttribute('aria-pressed','true');
}
function stopMusic(){
  musicOn = false;
  audio.pause();
  musicToggle.classList.add('paused');
  musicToggle.setAttribute('aria-pressed','false');
}
musicToggle.addEventListener('click', () => { musicOn ? stopMusic() : startMusic(); });

// ----- starfield canvas (hero + finale) -----
function initStars(canvas){
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, stars = [];
  function resize(){
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    const count = Math.min(120, Math.floor((w*h) / 18000));
    stars = Array.from({length: count}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      r: Math.random()*1.3 + 0.2,
      a: Math.random()*0.6 + 0.15,
      s: Math.random()*0.4 + 0.05
    }));
  }
  function draw(t){
    ctx.clearRect(0,0,w,h);
    stars.forEach(st => {
      const tw = reduceMotion ? st.a : st.a * (0.6 + 0.4*Math.sin(t/1000 * st.s + st.x));
      ctx.beginPath();
      ctx.fillStyle = `rgba(242,236,224,${tw})`;
      ctx.arc(st.x, st.y, st.r * devicePixelRatio, 0, Math.PI*2);
      ctx.fill();
    });
    if(!reduceMotion) requestAnimationFrame(draw);
  }
  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}
initStars(document.getElementById('starsHero'));
initStars(document.getElementById('starsFinale'));
