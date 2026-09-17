/* ======================================================================
   ⚙️  CONFIGURATION — this is the ONLY file you should need to edit.
   Change names, photos, and text here. css/style.css and js/app.js
   shouldn't need to change.

   PHOTOS: drop your image files into the /photos folder using the
   filenames already referenced below (story-1.jpg, memory-1.jpg, etc.),
   or change the `src` paths to whatever filenames you actually use.
   Leave a `src` empty ("") to keep an elegant placeholder until you
   add a real photo. JPG, PNG, or WEBP all work.

   MUSIC: drop your song into /audio and name it song.mp3 (or update
   `song.src` below to match your filename).
====================================================================== */
const CONFIG = {
  // ---- names & basics ----
  yourName: "Me",              // EDIT ME
  herName: "Her Name",         // EDIT ME — used in the landing greeting

  // ---- 2. Our story timeline ----
  // Add or remove entries freely — the timeline renders however many you list.
  timeline: [
    { title: "The first message",   desc: "Neither of us expected the conversation to last that long.", photo: "photos/story-1.JPG" },
    { title: "First date",          desc: "I was more nervous than I let on. You noticed anyway.", photo: "photos/story-2.JPG" },
    { title: "The trip",            desc: "10 days, one map, and the first time I knew.", photo: "photos/story-3.JPG" },
    { title: "Moving in",           desc: "Photos everywhere, and somehow it already felt like home.", photo: "photos/story-4.JPG" },
    { title: "Right now",           desc: "Still choosing you, on purpose, every day.", photo: "photos/story-5.JPG" }
  ],

  // ---- 3. Memories gallery ----
  gallery: [
    { src: "photos/memory-1.JPG", caption: "That weekend by the coast" },
    { src: "photos/memory-2.JPG", caption: "Your terrible/wonderful pancakes" },
    { src: "photos/memory-3.JPG", caption: "The concert we almost missed" },
    { src: "photos/memory-4.JPG", caption: "Rainy Sunday, no plans" },
    { src: "photos/memory-5.JPG", caption: "The hike you said would be 'easy'" },
    { src: "photos/memory-6.JPG", caption: "Just an ordinary, perfect evening" }
  ],

  // ---- 4. Little things ----
  littleThings: [
    { title: "Your smile", body: "The real one, not the photo one — it shows up before you even mean it to." },
    { title: "The way you laugh", body: "Too loud for the room, every single time, and I never want you to quiet it." },
    { title: "How you make ordinary days feel special", body: "A random Tuesday can turn into a memory because you were there." },
    { title: "The little things you probably don't even notice", body: "The way you hum when you cook, or steal the blanket, or narrate the movie." },
    { title: "How you remember what I forget", body: "Small stuff I mentioned once, months ago — you kept it anyway." },
    { title: "That you're still you around me", body: "No performance, no editing — and somehow that's the thing I love most." }
  ],

  // ---- 5. Quiz ----
  quiz: [
    { q: "Where was our first date?", options: ["K40", "Greek", "Chicken Wings", "Something else"], correct: 0, reaction: "You remembered." },
    { q: "What's the most repeated word in our chat?", options: ["I love you", "Good morning", "Have a good night"], correct: 0, reaction: "Every single day." },
    { q: "What's our most repeated flavor?", options: ["Mango", "Berry", "Banana", "Something else"], correct: 1, reaction: "You know my taste." },
    { q: "What's our favorite place?", options: ["The park", "The mall", "Assiut", "Something else"], correct: 0, reaction: "Always the park." }
  ],

  // ---- 6. Secret message ----
  secret: {
    prompt: "Tap each star, then the light in the middle.",
    message: "If you're reading this — it means you made it all the way here, and that alone makes today better."
  },

  // ---- 7. The letter ----
  letter: {
    greeting: "Hey Darling,",
    paragraphs: [
      "I hope everything becomes so good again. I honestly know how you're feeling right now, and I want to tell you that I will never let you go through anything alone. You're my other half, and I will never let the world let you down.",
      "You are the smile I'm looking for every day, the one photo that always makes me smile, and the only girl I love and want to move through life with.",
      "I want you to know that you are the only one I care about, and you will always be the person I want — no matter what happens, or what will happen, you'll always be the same to me.",
      "I love you, Marnona, to the end of the universe."
    ],
    sign: "— George"
  },

  // ---- 8. Invitation ----
  invitation: {
    eyebrow: "You're invited",
    title: "One more evening, just us",
    time: "when you are in Assiut",
    location: "The 10 days journey + food",
    activity: "See you",
    dressCode: "University close",
    note: "Let's give our gallery more photos"
  },

  // ---- music ----
  song: {
    src: "audio/song.mp3",   // EDIT ME — filename in /audio
    title: "Our song",
    artist: "[artist]"
  }
};
