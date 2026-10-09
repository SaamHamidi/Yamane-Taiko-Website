/* Yamane Taiko site content.
   Edit the lists below to change videos, photos, members, slideshow images and links. */
/* =====================================================================
   EDIT YOUR CONTENT HERE
   ===================================================================== */
const SITE = {
  email: "jeff.yamanetaiko@gmail.com",       // public contact email (shown on the Contact page)
  city: "San Diego, CA",
  formEndpoint: "",                          // e.g. a Formspree URL; leave empty until you set one up
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/yamane_taiko/" },
    { label: "YouTube",   url: "https://www.youtube.com/@YamaneTaiko" },
  ],
};

// Rotating images at the top of the home page. Use wide photos (about 2400px across). Leave src empty to show a placeholder.
// The banner is about 2:1 on desktop and gets taller on phones. focus (optional) picks which part stays in view when the top/bottom is trimmed: "0%" = top, "100%" = bottom. Default "80%".
// fit: "whole" shows the entire photo (for tall photos) with a soft blur filling the sides.
const HERO_IMAGES = [
  { src: "assets/hero-1.jpg?v=3", alt: "Yamane Taiko members in purple happi coats with their drums, flutes and cymbals" },
  { src: "assets/hero-2.jpg", alt: "A Yamane Taiko drummer facing a large ō-daiko on stage", fit: "whole" },
  { src: "assets/hero-3.jpg", alt: "Yamane Taiko members standing and seated among their drums", focus: "70%" },
];
const SLIDE_SECONDS = 6;

// photo: path or URL to a portrait (3:4 works best). Members show in the order listed.
const MEMBERS = [ // name and photo for each member, in display order
  { name: "Amanda Inouye", photo: "assets/members/member-1.jpg" },
  { name: "Devin Tani", photo: "assets/members/member-2.jpg" },
  { name: "Jeff Onuma", photo: "assets/members/member-3.jpg" },
  { name: "Kenny Utrapiromsuk", photo: "assets/members/member-4.jpg" },
  { name: "Megumi Leung", photo: "assets/members/member-5.jpg" },
  { name: "Reika Shimizu Onuma", photo: "assets/members/member-6.jpg" },
  { name: "Saam Hamidi", photo: "assets/members/member-7.jpg?v=2" },
  { name: "Kade Kaneshiro", photo: "assets/members/member-8.jpg" },
];

const VIDEOS = [ // url: YouTube link. Thumbnails come from YouTube automatically.
  { title: "Rush! - Yamane Taiko", url: "https://youtu.be/vXS7dnTPYlk" },
  { title: "Yamane Taiko Omiyage", url: "https://youtu.be/NKtyMwarn3A" },
  { title: "Omiyage at Taikopalooza 2024", url: "https://youtu.be/KO6QIGrR9g4" },
  { title: "Break at Taikopalooza 2024", url: "https://youtu.be/Rj6c6IdKt9U" },
];

const PHOTOS = [ // thumb: small grid image; src: full-size image shown when clicked; alt: short description
  { thumb: "assets/gallery/thumb-01.jpg", src: "assets/gallery/photo-01.jpg", alt: "Yamane Taiko members smiling with their drums" },
  { thumb: "assets/gallery/thumb-02.jpg", src: "assets/gallery/photo-02.jpg", alt: "Yamane Taiko members posed with their drums" },
  { thumb: "assets/gallery/thumb-03.jpg", src: "assets/gallery/photo-03.jpg", alt: "Five members playing slung drums with a cymbal player jumping" },
  { thumb: "assets/gallery/thumb-04.jpg", src: "assets/gallery/photo-04.jpg", alt: "Members jumping and laughing with drums, flutes and cymbals" },
  { thumb: "assets/gallery/thumb-05.jpg", src: "assets/gallery/photo-05.jpg", alt: "Members with drums in front of purple mountain-line artwork" },
  { thumb: "assets/gallery/thumb-06.jpg", src: "assets/gallery/photo-06.jpg", alt: "A member striking a large drum on stage" },
  { thumb: "assets/gallery/thumb-07.jpg?v=2", src: "assets/gallery/photo-07.jpg?v=2", alt: "Members striking playful poses in front of the Yamane Taiko banner" },
  { thumb: "assets/gallery/thumb-08.jpg", src: "assets/gallery/photo-08.jpg", alt: "A member playing a painted drum at a performance" },
  { thumb: "assets/gallery/thumb-09.jpg", src: "assets/gallery/photo-09.jpg", alt: "Members performing with slung drums and cymbals" },
  { thumb: "assets/gallery/thumb-10.jpg", src: "assets/gallery/photo-10.jpg", alt: "Flute players performing with drummers behind them" },
  { thumb: "assets/gallery/thumb-11.jpg", src: "assets/gallery/photo-11.jpg", alt: "Members raising their sticks above a row of drums" },
];
/* ===================================================================== */
