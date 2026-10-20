import { ASPECT } from "./dims.js";

export const sceneTypes = ["text", "media", "video", "flight", "art", "rapid"];

const ACT1 = "Act I · Toronto";
const ACT2 = "Act II · Italy";
const ACT3 = "Act III · Long distance";
const ACT4 = "Act IV · Korea and Japan";
const ACT5 = "Act V · Again long distance 😢";
const ACT6 = "Act VI · Italy again";
const ACT7 = "Act VII · Paris and now";
const ACT8 = "Act VIII · Our future";

const pad = (n) => String(n).padStart(3, "0");
const photo = (folder, n, o = {}) => ({
  kind: "image",
  src: `../media/${folder}/${folder}_${pad(n)}.jpg`,
  ar: ASPECT[`${folder}_${pad(n)}`] || 0.75,
  ...o,
});
const video = (folder, n, o = {}) => ({
  kind: "video",
  src: `../media/${folder}/${folder}_${pad(n)}.m4v`,
  ar: ASPECT[`${folder}_${pad(n)}`] || 0.5625,
  ...o,
});

let counter = 0;
const scene = (act, type, fields) => ({ id: `s${String(++counter).padStart(2, "0")}-${fields.slug || type}`, act, type, ...fields });

// helpers per act
const make = (act) => ({
  text: (fields) => scene(act, "text", fields),
  media: (media, fields = {}) => scene(act, "media", { media, ...fields }),
  video: (media, fields = {}) => scene(act, "video", { media: [media], ...fields }),
  flight: (fields) => scene(act, "flight", fields),
  art: (art, fields = {}) => scene(act, "art", { art, ...fields }),
  rapid: (items, fields = {}) => scene(act, "rapid", { items, ...fields }),
});

const a1 = make(ACT1);
const a2 = make(ACT2);
const a3 = make(ACT3);
const a4 = make(ACT4);
const a5 = make(ACT5);
const a6 = make(ACT6);
const a7 = make(ACT7);
const a8 = make(ACT8);
const extra = make("Extra moments");

export const story = [
  // ───────────────────────── ACT I ─────────────────────────
  a1.text({ slug: "one-year", title: "One year ❤️", tone: "big" }),
  a1.text({ slug: "date", lines: ["September 26, 2025"] }),
  a1.media([photo("A", 36)], {
    slug: "toronto", layout: "chapter", kicker: "Chapter one", title: "Toronto",
    lines: ["Where it started"],
  }),

  // TORONTO (A)
  a1.media([photo("A", 2), photo("A", 7), photo("A", 9), photo("A", 26)], {
    slug: "how-we-flirted", lines: ["How we flirted with each other 😏🥰❤️"], effect: "love-pop",
  }),
  a1.media([photo("A", 1), photo("A", 17)], { lines: ["My beautiful Korean queen 👑🇰🇷💕"] }),
  a1.media([photo("A", 3), photo("A", 4)], { lines: ["Carinissima princess on the first date 👸💕✨"] }),
  a1.media([video("A", 10), video("A", 11)], { slug: "not-bambino", layout: "side-two", lines: ["You thought I’m not bambino...", "I made a perfect lie... 😏💪🤥"], effect: "laugh-pop" }),
  a1.video(video("A", 16), { lines: ["Having fun together 🥰✨"] }),
  a1.media([photo("A", 5)], { lines: ["My beautiful queen was so cute when she gave me taiyaki 🥹🐟", "that I sent this picture to all my friends 😂"] }),
  a1.media([photo("A", 6)], { lines: ["So cool bambina with beer... 🍺😎", "I was already fallen in love 😍"] }),
  a1.media([photo("A", 21), photo("A", 18)], { slug: "niagara-train", lines: ["Korean queen at Niagara Falls 👑", "Beautiful angel with a rainbow 🌈🥹"] }),
  a1.media([photo("A", 20)], { slug: "beautiful-smile", copyPosition: "raised", lines: ["Beautiful smile 😍✨"] }),

  a1.media([photo("A", 13), photo("A", 14)], { slug: "living-together", lines: ["I love living with you 🏡❤️"] }),
  a1.media([video("A", 59), photo("A", 12)], { slug: "cooking-together", lines: ["And cooking with you 👩‍🍳❤️"] }),
  a1.video(video("A", 23), { lines: ["I fell in love with your food 😋🍜❤️"] }),
  a1.text({ slug: "food-happiness", lines: ["My bellissima is happiest when she tries new food... 😋❤️"] }),
  a1.media([photo("A", 15)], { slug: "shake-shack", lines: ["My stellina loves burgers 🍔🥰"] , effect: "food-pop"}),
  a1.media([photo("A", 60)], { slug: "grande-sandwich", tone: "warm", lines: ["But even more, grande sandwich 🥪😍", "Moooolto carina, mia regina 👑💕"] , effect: "food-pop"}),
  a1.media([photo("A", 42)], { slug: "beaver-tails", tone: "food-rise", effect: "food-rise", lines: ["But even more, she loves BeaverTails 🦦🍩💖"] }),
  a1.media([photo("A", 43)], { slug: "cinnaholic", tone: "food-peak", effect: "food-peak", lines: ["And then... Cinnaholic 🤯🍥💖", "My bellissima has never been happier ✨"] }),
  a1.media([photo("A", 55)], { slug: "wine-bambina", lines: ["But sometimes she becomes drunk bambina 🍷🥴"] , effect: "love-pop"}),
  a1.media([photo("A", 50)], { slug: "drunk-bambina", lines: ["Compleeeetely drunk bambina after a big beer... 🍺🥴"] }),
  a1.video(video("A", 52)),
  a1.video(video("A", 40), { lines: ["My master... 👑", "I’m completely your slave 🥵❤️😂"] }),
  a1.media([photo("A", 46), photo("A", 53), photo("A", 54)], { slug: "flower-queen", lines: ["But also my queen 👑💐"] }),
  a1.video(video("A", 47), { lines: ["Cutest girl on the planet 🌎", "my beautiful flower 🌸💖"] }),
  a1.media([photo("A", 35), photo("A", 19)], { slug: "cool-bambina", lines: ["Also moooolto cool bambina 😎✨"], effect: "love-pop" }),
  a1.media([photo("A", 8), video("A", 22), photo("A", 49), photo("A", 45)], {
    slug: "beautiful-angel", lines: ["And the most beautiful angel I’ve ever seen in my life 🥹✨", "My motivation ❤️"],
  }),

  a1.media([photo("A", 27), video("A", 24)], { slug: "hard-days", layout: "side-two", lines: ["It was such a difficult time for me...", "and you became my motivation ❤️"] }),
  a1.media([photo("A", 48), photo("A", 25)], { slug: "safe-heaven", lines: ["My safe heaven 🥹🐧🤍", "Can we marry and live like this forever? 💍🥹❤️"], effect: "love-pop" }),
  a1.media([photo("A", 37), photo("A", 38)], { lines: ["Beautiful pictures by Giovanni 📸🍁", "💕❤️💕"] }),
  a1.video(video("A", 39)),
  a1.media([photo("A", 30), photo("A", 31)], { slug: "chicago-one", lines: ["Chicago with my bella 🏙️🥰❤️"], effect: "love-pop" }),
  a1.media([photo("A", 32), photo("A", 34)], { slug: "chicago-two", layout: "stacked-wide", lines: ["Exploring Chicago together 🥹🏙️❤️"] }),
  a1.media([photo("A", 33)], { slug: "chicago-squirrel", lines: ["So funny my squirrel 🐿️😂🥰❤️"], effect: "squirrel-pop" }),
  a1.media([photo("A", 28), photo("A", 57), photo("A", 63), photo("A", 64)], {
    slug: "dormissimo-photos", lines: ["Dormissimo bambino 😴💤🥰"],
  }),
  a1.video(video("A", 56), { lines: ["...Again dormissimo... 😴💤"] }),
  a1.video(video("A", 58), { lines: ["Scusa amore, tuo bambino molto dormissimo 😂🙄😴❤️"] }),
  a1.video(video("A", 44), { slug: "stole-carrot", lines: ["Scusa bella, I stole your carrot 🥕😂🐰❤️"], effect: "carrot-pop" }),
  a1.media([video("A", 62), photo("A", 65)], { lines: ["Look amore, I’m better than you at cooking 👨‍🍳😏❤️"] }),
  a1.video(video("A", 61), { slug: "cooking-laughs", lines: ["😂🤣😂🤣🤭"], effect: "laugh-pop" }),
  a1.media([photo("A", 66)], { slug: "santa-min", lines: ["My Santa bambina gave me soooo many kisses 🎅🏻💋❤️😂"] }),
  a1.media([photo("A", 29), photo("A", 67)], { slug: "travel-furba", lines: ["Time to travel with my furba bambina 😏🤭🧳✈️❤️"] }),

  // ITALY I (B)
  a2.flight({ slug: "italy-one", from: "Toronto", to: "Italy", layout: "destination-chapter", kicker: "Chapter two", title: "Italy", landmarks: true }),
  a2.media([photo("B", 1)], { slug: "bella-with-family", lines: ["Finally my bella with my family (mooooolto bella) 🥹❤️"] }),
  a2.media([photo("B", 2)], { slug: "mia-regina-church", lines: ["Mia Regina 😍"] }),
  a2.media([photo("B", 3)], { slug: "min-in-verona", lines: ["Min in Verona ❤️"] }),
  a2.media([photo("B", 21)], { slug: "mia-regina-bergamo", lines: ["Mia Regina in Bergamo 🥰"] }),
  a2.media([video("B", 5), video("B", 4)], { slug: "stupid-bambini-milano", layout: "diag-two", effect: "laugh-pop", lines: ["Stupid bambini in Milano 😂❤️", "I know you love"] }),
  a2.media([photo("B", 8)], { slug: "min-papera", lines: ["My favourite Min papera 🦆😂🥰"] }),
  a2.video(video("B", 10), { slug: "my-comedian-ducks", lines: ["I love my comedian 😂🤣❤️"] }),
  a2.video(video("B", 9), { slug: "duck-laughter", effect: "duck-chaos", lines: ["😂🤣😂🤣😂🤣😂", "promise no the other girls around me 😂🤣💕❤️"] }),
  a2.video(video("B", 12), { slug: "rome-comedian-vespa", lines: ["Even in Rome, my favourite comedian 🛵😂🤣❤️"] }),
  a2.video(video("B", 7), { slug: "presepe-look", lines: ["Amore, why are you looking at the presepe", "if there is the whole church to look at?! ⛪😂🤣"], effect: "church-pop" }),
  a2.video(video("B", 15), { slug: "ice-skating-uffa", lines: ["Amore, you were molto uffa before this video 😤", "but thankfully I managed to change you 🥰⛸️❤️"], effect: "uffa-pop" }),
  a2.media([photo("B", 11), photo("B", 13), photo("B", 16)], { slug: "favourite-girlfriend-rome", lines: ["We celebrated our 100 days in Rome 🥹💯❤️"] }),
  a2.media([photo("B", 18)], { slug: "vatican", lines: ["My favourite view in the Vatican was you 🥹❤️"] }),
  a2.media([photo("B", 14)], { slug: "queen-aura-art", lines: ["So much aura, my queen 👑✨😎"] }),
  a2.video(video("B", 6), { slug: "lemon-challenge", lines: ["Amore, can you eat lemon? 🍋😂🤣", "I’m your number one fan 😂❤️"] }),
  a2.video(video("B", 17), { slug: "one-more-kiss", lines: ["Dai amore! You can do! Just one more beautiful kiss 🥹💋❤️"] }),
  a2.media([photo("B", 19), photo("B", 20)], { slug: "rome-selfies-and-kisses", lines: ["Uffa amore, last day together... 😢💔", "But no worries, we’ll keep in contact every day 📱❤️"] }),

  // ACT III: LONG DISTANCE (C)
  a3.text({ slug: "apart-one", title: "And now the stupid part 😢", tone: "medium" }),
  a3.media([photo("C", 3)], { slug: "rainbow-glasses", lines: ["Molto cool girlfriend 🌈😎💕"] }),
  a3.media([photo("C", 4)], { slug: "furba-face", lines: ["Ei tu, moooolto furba face 😏🤭❤️"] }),
  a3.media([photo("C", 7)], { slug: "mathematician", lines: ["Eeee? Can you be my mathematician girlfriend?? 🧮🤓🥹❤️"] }),
  a3.media([photo("C", 11)], { slug: "mathematician-glasses", lines: ["For sure mathematician glasses Min! 🤓😂🤣💕❤️"] }),
  a3.media([photo("C", 5), photo("C", 12)], { slug: "distance-min-one", layout: "side-two", lines: ["How is it possible so stupid papera? 🦆😂🤣💕"], effect: "duck-chaos" }),
  a3.media([photo("C", 14), photo("C", 15), photo("C", 16), photo("C", 17), photo("C", 10), photo("C", 13)], { slug: "distance-min-two", layout: "six", lines: ["Eeee? My bellissima again 😍💕"] }),
  a3.media([photo("C", 6)], { slug: "papera-girlfriend", lines: ["My papera girlfriend... I love! 🦆🥹💕"] }),
  a3.media([photo("C", 8)], { slug: "again-papere", lines: ["Again papere!! 🦆🦆😂❤️"] }),
  a3.media([photo("C", 9)], { slug: "papera-water", lines: ["Eeee?? Why you are papera in water! 🦆🌊😂🤣"] }),
  a3.media([photo("C", 18), photo("C", 19), photo("C", 21), photo("C", 22)], { slug: "distance-min-three", effect: "duck-love" }),
  a3.media([photo("C", 23), photo("C", 25), photo("C", 26), photo("C", 27)], { slug: "distance-min-four", lines: ["I never got tired of seeing your face 🥹💕"] }),
  a3.media([photo("C", 1)], { slug: "kiss-from-afar", lines: ["Amore, this is where I would kiss you if we weren't long distance 🥹💋❤️"] }),
  a3.video(video("C", 24), { slug: "carino-kiss", lines: ["My motivation... I love your carino kiss... please more 🥹💋😘💕❤️"] }),
  a3.video(video("C", 20), { slug: "white-kiss", lines: ["😘💋🥰💕✨"], effect: "kiss-pop" }),
  a3.media([photo("C", 31), photo("C", 32), photo("C", 33)], { slug: "distance-min-six", lines: ["My Beautiful Princess 🥹👸💕❤️"], effect: "love-pop" }),
  a3.media([photo("C", 28)], { slug: "mirror-regina", lines: ["And now bellissima regina... 👑🥹💕✨"], effect: "love-pop" }),
  a3.media([photo("C", 29), photo("C", 30)], { slug: "korean-bambina", lines: ["그리고 이제, 나의 예쁜 아기 🥹😍💕❤️"], effect: "love-pop" }),

  // ACT IV: KOREA
  a4.flight({ slug: "flight-korea", from: "Italy", to: "Korea", layout: "destination-chapter", kicker: "Chapter three", title: "Korea", landmarks: "korea" }),

  // KOREA + JAPAN (D)
  a4.media([photo("D", 1)], { slug: "boyfriend-flowers", lines: ["Tuo boyfriend gave you bambino flowers 💐🥹❤️"] }),
  a4.media([photo("D", 4)], { slug: "min-with-flowers", lines: ["So cool mia bella with flowers 😎💐❤️"] }),
  a4.media([photo("D", 2)], { slug: "chef-marriage", lines: ["Amore, please can you get married dressed like this? I love it 😂💍😍❤️"] }),
  a4.media([photo("D", 5)], { slug: "god-of-nature", lines: ["God of nature 🌊🌿👑❤️"] }),
  a4.video(video("D", 7), { slug: "god-of-beauty", lines: ["God of beauty, my Venere 🥹😍❤️"] }),
  a4.media([photo("D", 6)], { slug: "korea-pictures", lines: ["Amore che bello taking pictures together in Korea! 🌸📸🥹❤️"] }),
  a4.video(video("D", 8), { slug: "poco-sleep", lines: ["E? Amore how can we survive with so poco poco sleep! Aiuuuuuto! Forti! 😂", "I should give you soooo many kisses 😘❤️"] }),

  a4.flight({ slug: "japan", from: "Korea", to: "Japan", layout: "destination-chapter", kicker: "Chapter four", title: "Japan", landmarks: "japan" }),
  a4.media([photo("D", 9), photo("D", 10), photo("D", 11)], { slug: "travel-care", lines: ["Thankfully my bella takes care of me while we travel 🥹❤️", "She’s also sooo funny 😂"] }),
  a4.video(video("D", 28), { slug: "travel-care-funny", effect: "travel-pop" }),
  a4.video(video("D", 12), { slug: "buonissimo-food", lines: ["Finally trying buonissimo food with my bella 😋❤️"] }),
  a4.video(video("D", 19), { slug: "beautiful-when-you-eat", lines: ["Amore you are so beautiful when you eat... you are so happy 🥹😋❤️"] }),
  a4.media([video("D", 20), video("D", 21)], { slug: "gelato-happier", layout: "diag-two", lines: ["Even happier with gelato 😍🍦😂❤️"], effect: "gelato-pop" }),
  a4.video(video("D", 22), { slug: "stupid-things-together", lines: ["Even stupid things are nice to try with you 😂❤️"] }),
  a4.video(video("D", 39), { slug: "eating-like-turtle", lines: ["Ei tu! Why you eating like turtle 🐢😂❤️"] }),
  a4.video(video("D", 46), { slug: "more-gelato", lines: ["E?? More gelato? Mooolto happy mia queen 🍦😂👑❤️"] }),
  a4.video(video("D", 16), { slug: "principessa-bellissima", lines: ["My principessa bellissima 👸🥹💕"] }),
  a4.video(video("D", 17), { slug: "grande-food", lines: ["Again grande food! 😋🍜", "Good job bella, you are so cool! 😎🥰❤️"], effect: "food-pop" }),
  a4.video(video("D", 18), { slug: "blue-umbrella", effect: "love-pop" }),
  a4.video(video("D", 30), { slug: "drunk-min", lines: ["I love drunk Min 🥴😏🤫", "😂💋❤️"], effect: "drunk-pop" }),
  a4.media([photo("D", 13), photo("D", 36), photo("D", 43), photo("D", 47)], { slug: "many-kisses", lines: ["Sooo many kisses 😘💋❤️"], effect: "love-pop" }),
  a4.video(video("D", 45), { slug: "perfect-kisses", lines: ["In this video you gave me perfect kisses 🥹😘💋❤️"] }),
  a4.media([photo("D", 40)], { slug: "kisses-back", lines: ["For sure amore, I’m giving you kisses too 😘❤️"] }),
  a4.media([photo("D", 14), photo("D", 23), photo("D", 31), photo("D", 24)], { slug: "papera-comedian-japan", lines: ["Again my papera comedian 🦆😂🤣🥰❤️"], effect: "duck-chaos" }),
  a4.media([photo("D", 34), video("D", 33)], { slug: "min-toroto", lines: ["Min Totoro 😂🥰💚✨"], effect: "totoro-pop" }),
  a4.video(video("D", 32), { slug: "angry-min", lines: ["Moooolto scary Min when she is hungry 😡🍜😂🤣", "but so cute 🥰💕"], effect: "food-pop" }),
  a4.media([video("D", 29), video("D", 15)], { slug: "souvenir-laughs", lines: ["😂🤣🦆🥰❤️"], effect: "duck-chaos" }),
  a4.media([video("D", 26), video("D", 27)], { slug: "pudding", layout: "diag-two", lines: ["Turn the volume up 🔊🍮", "what she says is so lovely 🥹😂❤️"], effect: "volume-pop" }),
  a4.video(video("D", 41), { slug: "more-laughs", effect: "duck-chaos" }),
  a4.media([video("D", 25), video("D", 49)], { slug: "even-more-laughs", layout: "diag-two", lines: ["😂🤣😂🤣🦆"], effect: "duck-chaos" }),
  a4.video(video("D", 50), { slug: "osaka-200-days", lines: ["200 days in Osaka 🥹🎉🇯🇵❤️"] }),
  a4.media([photo("D", 44), photo("D", 51)], { slug: "again-food", lines: ["Again food 😋🍜🍡❤️"], effect: "food-pop" }),
  a4.video(video("D", 59), { slug: "busan-skyline", lines: ["Min took me to see Busan skyline 🌃🥹", "Magical ✨❤️"], effect: "skyline-pop" }),
  a4.media([photo("D", 3), photo("D", 54)], { slug: "queen-of-korea", lines: ["Min queen of Korea 👑🇰🇷🥹❤️"] }),
  a4.media([photo("D", 58)], { slug: "princess-min", effect: "love-pop" }),
  a4.media([photo("D", 57), video("D", 55)], { slug: "molto-cool", lines: ["Moooolto cool bambina 😎🥰❤️"] }),
  a4.video(video("D", 63), { slug: "vertical-love", effect: "love-pop" }),
  a4.media([video("D", 52), photo("D", 42)], { slug: "glasses-min", layout: "feature-video", lines: ["So hot Min with glasses 🤓😍🔥❤️"], effect: "love-pop" }),
  a4.media([photo("D", 35), photo("D", 53)], { slug: "japan-soft-moment", effect: "soft-sparkle" }),
  a4.media([video("D", 38), video("D", 37), video("D", 48)], {
    slug: "happiest-moments", layout: "three-videos", lines: ["Happiest moments together 🥹💕✨", "I wish we could share moments like these for the rest of our lives ❤️"], effect: "love-pop",
  }),
  a4.video(video("D", 56), {
    slug: "seoul-first-date-again",
    lines: ["We recreated our first date in Seoul with Korean chicken 🍗🥹❤️", "I don’t think we’ve ever been happier. It felt like magic ✨💕"],
    effect: "magic-pop",
  }),
  a4.media([video("D", 60), video("D", 61)], {
    slug: "korean-bbq-fire", lines: ["And again another magical moment she planned for me... 🥹🔥", "perfect Korean BBQ, also perfect chef 👩‍🍳🥩❤️"], effect: "bbq-pop",
  }),
  a4.media([photo("D", 62)], {
    slug: "more-japan-sweets", lines: ["Before another long distance, my bella gave me a beautiful gift 🥹🎁❤️"], effect: "magic-pop",
  }),

  // ───────────────────────── ACT V ─────────────────────────
  a5.text({ slug: "apart-two", title: "Again long distance 😢", tone: "medium" }),
  a5.media([photo("E", 2), photo("E", 9), photo("E", 13), photo("E", 22), photo("E", 5)], { slug: "paparazzi", layout: "five", lines: ["Tuo paparazzi boyfriend loves you so much 📸😂🥰❤️"], effect: "love-pop" }),
  a5.media([photo("E", 1), photo("E", 3), photo("E", 8), photo("E", 11)], { slug: "distance-again-one", lines: ["More photos of my bella 😍❤️"], effect: "eyes-pop" }),
  a5.media([photo("E", 4), photo("E", 6)], { slug: "pachirisu", layout: "side-two", lines: ["Mio amore, this squirrel looks like Pachirisu 🐿️😂🤣❤️"], effect: "squirrel-pop" }),
  a5.media([photo("E", 16), photo("E", 10), photo("E", 17), photo("E", 14)], { slug: "distance-again-two", lines: ["Eeee? How can you be so cute? 🥹💕"], effect: "love-pop" }),
  a5.media([photo("E", 12), photo("E", 23)], { slug: "long-distance-gestures", lines: ["Your loyal boyfriend’s gestures for you during long distance 💐🥹", "Little things, big love ❤️"], effect: "magic-pop" }),
  a5.media([photo("E", 15), photo("E", 18)], { slug: "distance-again-three", layout: "side-two", lines: ["Eee? Again furba??? 😏🦊😂🥰❤️"], effect: "furba-pop" }),
  a5.media([photo("E", 19), photo("E", 24), photo("E", 25), photo("E", 26)], { slug: "distance-again-four", lines: ["Still my favourite face in the world 😍🥰😘❤️"], effect: "eyes-pop" }),

  // ───────────────────────── ACT VI · ITALY (F) ─────────────────────────
  a6.flight({ slug: "flight-italy-again", from: "Korea", to: "Italy", layout: "destination-chapter", kicker: "Chapter five", title: "Italy", landmarks: "italy2" }),

  // JULY: flowers + road
  a6.media([photo("F", 1), video("F", 2)], { slug: "july-flowers", layout: "side-two", lines: ["July started with flowers 💐🥹", "Finalmente together in Italy again ❤️"], effect: "love-pop" }),
  a6.video(video("F", 23), { slug: "rose-in-car", lines: ["Mia regina with a rose in the car 🌹😍❤️"], effect: "eyes-pop" }),
  a6.media([video("F", 22), video("F", 21)], { slug: "car-cute", layout: "side-two", lines: ["Driving with my bella 🚗🥰", "Cute even when she is dormissima 😴❤️"], effect: "travel-pop" }),
  a6.media([video("F", 35), video("F", 36)], { slug: "car-faces", layout: "side-two", lines: ["Ei tu! Why so many faces in the car? 😂🚗"], effect: "laugh-pop" }),
  a6.media([photo("F", 9), video("F", 10)], { slug: "car-snack-sleep", layout: "side-two", lines: ["Snack stop, and then dormissima again 🥐😴❤️"], effect: "sleepy-pop" }),

  // FIRENZE
  a6.media([video("F", 3), video("F", 4)], { slug: "florence-white-dress", layout: "side-two", lines: ["Firenze with my bella in white dress 🤍😍", "So carina, mia regina 👑❤️"], effect: "eyes-pop" }),
  a6.media([photo("F", 5)], { slug: "florence-car-heart", lines: ["Still the most beautiful view for me 🥹❤️"], effect: "love-pop" }),
  a6.video(video("F", 6), { slug: "florence-drink", lines: ["Cold drink in Firenze 🥤😋", "Cutie bambina with a straw 🥰"], effect: "gelato-pop" }),
  a6.media([video("F", 7), video("F", 8)], { slug: "uffizi", layout: "side-two", lines: ["Min at the Uffizi 🖼️✨", "Honestly the best artwork was her 🥹❤️"], effect: "art-pop" }),
  a6.media([video("F", 11), video("F", 12)], { slug: "florence-night", layout: "side-two", lines: ["Firenze by night 🌙🥰", "Black dress, mia bella 🖤😍"], effect: "love-pop" }),

  // VAL D'ORCIA + PIENZA
  a6.video(video("F", 14), { slug: "val-dorcia", lines: ["Val d’Orcia 🌾🥹", "Green dress, green hills, mia regina 💚"], effect: "totoro-pop" }),
  a6.media([photo("F", 13)], { slug: "pienza", lines: ["Pienza, and a molto big iced coffee ☕🍦😍"], effect: "gelato-pop" }),

  // UMBRIA
  a6.media([photo("F", 15)], { slug: "road-umbria", lines: ["On the road to Umbria with her own pillow 🚗🛏️😂"], effect: "sleepy-pop" }),
  a6.media([photo("F", 17), video("F", 18)], { slug: "umbria-hotel", layout: "side-two", lines: ["Umbria 😍", "Our beautiful room ❤️"], effect: "love-pop" }),
  a6.video(video("F", 16), { slug: "umbria-red-bed", lines: ["Red bed princess 👸🛏️❤️", "Uffa, so dramatic 😂"], effect: "uffa-pop" }),
  a6.media([video("F", 19), video("F", 20)], { slug: "umbria-dinner", layout: "side-two", lines: ["Umbria dinner: Min must eat a botto 🍝😂", "Mooolto happy bambina 😋❤️"], effect: "food-pop" }),

  // NAPOLI
  a6.media([photo("F", 25)], { slug: "naples-selfie", lines: ["Napoli 🍕🇮🇹", "She forgot everything, but not my kisses 😘😂"], effect: "naples-pop" }),
  a6.media([video("F", 28), video("F", 29)], { slug: "naples-street-food", layout: "side-two", lines: ["Napoli street food 🍤😋", "Min with hungry eyes 😍🤣"], effect: "naples-pop" }),

  // COSTIERA AMALFITANA
  a6.media([photo("F", 24)], { slug: "amalfi-pasta", lines: ["Costiera Amalfitana 🌊🍝", "My bella and her pasta ❤️😋"], effect: "food-pop" }),
  a6.media([photo("F", 26), photo("F", 27)], { slug: "amalfi-views", lines: ["Sun, sea and us 🌞🌊❤️"], effect: "soft-sparkle" }),
  a6.media([photo("F", 34)], { slug: "amalfi-dessert", lines: ["Dessert face 🍰😍🥹", "Il mio cuore ❤️"], effect: "food-pop" }),

  // PISCINA
  a6.video(video("F", 31), { slug: "pool-outdoor", lines: ["Pool time 🏊‍♀️💦", "Mia sirenetta 🧜‍♀️❤️"], effect: "pool-pop" }),
  a6.media([photo("F", 32), video("F", 33)], { slug: "pool-night", layout: "side-two", lines: ["Moooolto furba faces 😏😂", "We are so stupid together 🤪❤️"], effect: "furba-pop" }),

  // PISA
  a6.media([photo("F", 38)], { slug: "pisa", lines: ["Pisa 🗼😂", "She is holding it up. Don’t tell anyone 🤫"], effect: "laugh-pop" }),

  // VENEZIA
  a6.media([photo("F", 40), photo("F", 42), video("F", 41)], { slug: "venice", lines: ["Venezia 🚤💋", "Canals, selfies and kisses ❤️"], effect: "kiss-pop" }),

  // SPA
  a6.media([photo("F", 43), photo("F", 44)], { slug: "spa", lines: ["SPA day 🧖‍♀️✨", "My bella relaxed like a queen 👑🥹❤️"], effect: "spa-pop" }),

  // LAGO DI GARDA: Riva, Tenno, Limone
  a6.media([photo("F", 46), video("F", 30), video("F", 37)], { slug: "road-lake", lines: ["Next stop: Lago di Garda 🚗💙", "Navigator Min: asleep 😴😂"], effect: "sleepy-pop" }),
  a6.video(video("F", 50), { slug: "riva-del-garda", lines: ["Riva del Garda 💙🏞️", "My bella in blue 🥹❤️"], effect: "lake-pop" }),
  a6.media([photo("F", 47), video("F", 49)], { slug: "riva-kisses", layout: "side-two", lines: ["Blue couple 💙😘", "Sooo many kisses by the lake ❤️"], effect: "kiss-pop" }),
  a6.media([photo("F", 48)], { slug: "riva-playground", lines: ["Min on the bunny 🐰😂🥰"], effect: "laugh-pop" }),
  a6.media([photo("F", 52), video("F", 53)], { slug: "lago-di-tenno", lines: ["Lago di Tenno 💙🏔️", "Cutest bambina by the lake 🥹❤️"], effect: "lake-pop" }),
  a6.media([photo("F", 54), video("F", 51)], { slug: "tenno-gelato", layout: "side-two", lines: ["Snack time 😋", "and gelato in blue 🍦💙❤️"], effect: "gelato-pop" }),
  a6.media([photo("F", 39), photo("F", 55)], { slug: "baking-cookies", lines: ["Min baking 🍪👩‍🍳", "Me supervising... eating 😂❤️"], effect: "food-pop" }),
  a6.media([photo("F", 56), photo("F", 57)], { slug: "limone", lines: ["Limone sul Garda 🍋😍", "My bella with a lemon 🥹❤️"], effect: "lemon-pop" }),
  a6.media([photo("F", 58), photo("F", 62)], { slug: "italy-leaning", lines: ["Me, leaning on my favorite person 🥹❤️"], effect: "love-pop" }),

  // ───────────────────────── ACT VII · PARIS AND NOW ─────────────────────────
  a7.text({ slug: "paris", kicker: "Also", title: "Paris.", lines: ["Because why not."] }),
  a7.video(video("F", 63)),
  a7.media([photo("F", 65)], { lines: ["My favorite exhibit."] }),
  a7.video(video("F", 67)),
  a7.media([photo("F", 71), photo("F", 72)], { lines: ["A very long hallway.", "Perfect for a kiss."] }),
  a7.media([photo("F", 73)], { lines: ["Golden hour by the river."] }),
  a7.video(video("F", 75)),
  a7.media([photo("F", 78)], { lines: ["Lunch with a view.", "Me eating. Min documenting."] }),
  a7.video(video("F", 79)),
  a7.media([photo("F", 82)], { lines: ["Tired. Happy.", "Still leaning on each other."] }),

  // MANY MINNIES
  a7.text({ slug: "minnies-intro", kicker: "Field guide", title: "The many Minnies.", lines: ["Quick. Don’t blink."] }),
  a7.rapid(
    [
      { media: photo("E", 7), label: "Cute Minnie" },
      { media: photo("E", 21), label: "Sleepy Minnie" },
      { media: photo("F", 54), label: "Hungry Minnie" },
      { media: photo("F", 1), label: "Princess Minnie" },
      { media: photo("E", 20), label: "Serious Minnie" },
      { media: photo("E", 2), label: "Weird Minnie" },
      { media: photo("C", 9), label: "Papera Minnie" },
      { media: photo("E", 22), label: "Shhh Minnie" },
      { media: photo("C", 2), label: "Not that Minnie." },
    ],
    { slug: "many-minnies", lines: [] },
  ),

  // NOW (G)
  a7.text({ slug: "now", kicker: "Now", title: "And now.", lines: ["Distance again."] }),
  a7.media([photo("G", 3), photo("G", 5)], { lines: ["But look at her.", "Cap on, apron on, thumbs up."] }),
  a7.media([photo("G", 2), photo("G", 1), photo("G", 4)], { lines: ["Still Min.", "Still the best part of my day."] }),
  a7.text({ slug: "what-next", title: "So what happens next?", tone: "big" }),

  // ───────────────────────── ACT VIII ─────────────────────────
  a8.art("princeton-fall", { lines: ["Princeton, New Jersey.", "Yes, really."], kicker: "Next chapter", tone: "warm" }),
  a8.art("princeton-snow", { lines: ["Snow. A train to New York.", "Coffee in paper cups."], tone: "cold" }),
  a8.art("home", { lines: ["Our future home.", "Small. Warm. Porch light on."] }),
  a8.art("kitchen", { lines: ["Min’s office.", "Staff: one pastry chef, one taste tester."] }),
  a8.art("bedroom", { geese: 0, lines: ["The bedroom.", "Calm. Tasteful. One lamp."] }),
  a8.art("bedroom", { geese: 1, count: "1", lines: ["One goose pillow.", "Cute, honestly."] }),
  a8.art("bedroom", { geese: 2, count: "2", lines: ["Two.", "Still normal."] }),
  a8.art("bedroom", { geese: 5, count: "5", lines: ["Five.", "Someone has been shopping."] }),
  a8.art("bedroom", { geese: 12, count: "12", lines: ["Twelve.", "We need to talk."] }),
  a8.art("bedroom", { geese: 90, count: "GOOSE APOCALYPSE", apocalypse: true, tone: "alarm", lines: ["Min: “I don’t see the problem.”"] }),
  a8.art("family-cover", { lines: ["Content warning: extremely cute."], tone: "warm" }),
  a8.art("family-lineup", { lines: ["Release date: unknown.", "Goose pillows: included."], tone: "warm" }),

  a8.text({ slug: "quiet-one", tone: "quiet", lines: ["Maybe I don’t know exactly what our house will look like."] }),
  a8.text({ slug: "quiet-two", tone: "quiet", lines: ["Or how many goose pillows there will be."] }),
  a8.text({ slug: "quiet-three", tone: "quiet", lines: ["But there’s one thing I do know."] }),

  a8.media([photo("F", 47)], { slug: "final-a", tone: "final", lines: ["I want you in it."] }),
  a8.media([photo("F", 47)], { slug: "final-b", tone: "final", lines: ["Happy anniversary, Min."] }),
  a8.text({ slug: "final-date", tone: "night", title: "26.09.2026", lines: ["— Giuseppe"], last: true, archiveNext: true }),


  // EXTRA PHOTOS — every image not used in the main story
  extra.text({ slug: "archive-intro", kicker: "Our archive", title: "Every moment", lines: ["All our photos and videos ❤️"] }),
  ...[
    ["F", 45],
    ["F", 61],
    ["F", 64],
    ["F", 68],
    ["F", 76],
    ["F", 77],
    ["F", 81],
  ].map(([folder, n]) => extra.media([photo(folder, n)], {
    slug: `extra-photo-${folder.toLowerCase()}-${pad(n)}`,
  })),

  // EXTRA VIDEOS — clips not included in the main story
  ...[
    ["F", 59],
    ["F", 60],
    ["F", 66],
    ["F", 69],
    ["F", 70],
    ["F", 74],
    ["F", 80],
  ].map(([folder, n]) => extra.video(video(folder, n), {
    slug: `extra-video-${folder.toLowerCase()}-${pad(n)}`,
  })),
];
