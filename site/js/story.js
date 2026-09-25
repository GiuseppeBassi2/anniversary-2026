import { ASPECT } from "./dims.js";

export const sceneTypes = ["text", "media", "video", "flight", "art", "rapid"];

const ACT1 = "Act I · How we started";
const ACT2 = "Act II · How we became us";
const ACT3 = "Act III · Where I hope this goes";

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

export const story = [
  // ───────────────────────── ACT I ─────────────────────────
  a1.text({ slug: "one-year", title: "One year. ❤️", tone: "big" }),
  a1.text({ slug: "date", lines: ["September 26, 2025."] }),
  a1.media([photo("A", 36)], { slug: "opening", lines: ["And somehow all of this happened.", "I love your voice 🥹🎙️"] }),

  // TORONTO (A)
  a1.text({ slug: "toronto", kicker: "Chapter one", title: "Toronto.", lines: ["Where it started."] }),
  a1.media([photo("A", 1), photo("A", 17)], { lines: ["My beautiful Korean queen 👑🇰🇷💕"] }),
  a1.media([photo("A", 3), photo("A", 4)], { lines: ["Carinissima princess on the first date 👸💕✨"] }),
  a1.video(video("A", 10), { lines: ["You thought I’m not bambino...", "I made a perfect lie... 😏💪🤥"] }),
  a1.video(video("A", 16)),
  a1.media([photo("A", 5)], { lines: ["My beautiful queen was so cute when she gave me taiyaki 🥹🐟", "that I sent this picture to all my friends 😂"] }),
  a1.media([photo("A", 6)], { lines: ["So cool bambina with beer... 🍺😎", "I was already fallen in love 😍"] }),
  a1.media([photo("A", 21)], { lines: ["Niagara.", "Even the weather tried to be romantic."] }),
  a1.media([photo("A", 20)], { lines: ["This beautiful smile 😍✨"] }),
  a1.media([photo("A", 13), photo("A", 14), photo("A", 15), photo("A", 8)], { lines: ["I love you so much 💕🥰"] }),
  a1.video(video("A", 22)),
  a1.video(video("A", 23), { lines: ["I fell in love with your food 😋🍜❤️"] }),
  a1.media([photo("A", 29)], { lines: ["My angel 😇🤍"] }),
  a1.media([photo("A", 37), photo("A", 38)], { lines: ["Beautiful pictures by Giovanni 📸🍁", "💕❤️💕"] }),
  a1.video(video("A", 39)),
  a1.video(video("A", 40), { lines: ["My master... 👑", "I’m completely your slave 🥵❤️😂"] }),
  a1.media([photo("A", 43), photo("A", 45), photo("A", 42)], { lines: ["My bambina happy with cinnamon rolls and beaver tails 🥰🥐"] }),
  a1.media([photo("A", 50)], { lines: ["Compleeeetely drunk bambina after a big beer... 🍺🥴", "(see the next video...)"] }),
  a1.video(video("A", 52)),
  a1.media([photo("A", 46), photo("A", 53), photo("A", 54)], { lines: ["Flowers. Min. Obviously. 💐😍"] }),
  a1.video(video("A", 47), { lines: ["Cutest girl on the planet 🌎", "my beautiful flower 🌸💖"] }),
  a1.media(
    [photo("A", 28), photo("A", 35), photo("A", 48), photo("A", 49), photo("A", 55), photo("A", 60), photo("A", 12), photo("A", 19), photo("A", 57)],
    { layout: "dump", lines: ["Memories from Canada 🍁🇨🇦💕"] },
  ),
  a1.video(video("A", 56), { lines: ["Dormissimo bambino boyfriend 😴💤🥰"] }),
  a1.media([photo("A", 25)], { lines: ["My safe heaven 🥹🐧🤍"] }),
  a1.video(video("A", 58), { lines: ["...Again dormissimo... 😴💤"] }),
  a1.media([video("A", 62), photo("A", 65)], { lines: ["Kitchen experiments."] }),
  a1.video(video("A", 59)),
  a1.media([photo("A", 63)], { lines: ["Again dormissimo... 😴🤍💤"] }),
  a1.media([photo("A", 64), photo("A", 67)], { lines: ["One last lazy morning.", "Then it was time to pack."] }),

  a1.flight({ slug: "flight-italy", from: "Toronto", to: "Italy", lines: ["Now it was my turn."] }),

  // ITALY I (B)
  a1.text({ slug: "italy-one", kicker: "Chapter two", title: "My world.", lines: ["Min, meet Italy."] }),
  a1.media([photo("B", 1)], { lines: ["Min officially enters my world.", "Passes with honors."] }),
  a1.media([photo("B", 2), photo("B", 3)], { lines: ["Churches, arches, kisses."] }),
  a1.video(video("B", 5)),
  a1.media([photo("B", 8), video("B", 10), video("B", 9)], {}),
  a1.media([photo("B", 11)], { lines: ["Trevi at night.", "Wish is classified."] }),
  a1.video(video("B", 12)),
  a1.media([photo("B", 13), photo("B", 14), photo("B", 16)], { lines: ["Pasta, marble, columns.", "Standard Rome."] }),
  a1.video(video("B", 6)),
  a1.media([photo("B", 19), photo("B", 20)], { lines: ["Mirror selfies and kisses.", "In Rome. Obviously."] }),
  a1.video(video("B", 17)),
  a1.media([photo("B", 21)], { lines: ["Golden hour Min."] }),

  // APART (C)
  a1.text({ slug: "apart-one", kicker: "Then", title: "And then came the stupid part.", tone: "medium" }),
  a1.text({ slug: "apart-one-b", lines: ["You went home.", "I stayed.", "FaceTime got a lot of work."] }),
  a1.media([photo("C", 3), photo("C", 4), photo("C", 7), photo("C", 11)], { lines: ["Most of my favorite moments that month lived in a tiny rectangle."] }),
  a1.media([photo("C", 6)], { lines: ["Ducks.", "In case I forgot."] }),
  a1.media([photo("C", 8), photo("C", 9), photo("C", 1)], { lines: ["“Ti amo tanto.”", "She learned the important Italian first."] }),
  a1.video(video("C", 24)),

  a1.flight({ slug: "flight-korea", from: "Italy", to: "Korea", lines: ["So I went to see your world."] }),

  // KOREA + JAPAN (D)
  a1.text({ slug: "korea", kicker: "Chapter three", title: "Your world.", lines: ["First you entered mine.", "Then I got to enter yours."] }),
  a1.media([photo("D", 1)], { lines: ["Arrival.", "Flowers in hand, brain on standby."] }),
  a1.media([photo("D", 2), photo("D", 4)], { lines: ["Min at work.", "Min at home. Both excellent."] }),
  a1.video(video("D", 8)),
  a1.media([photo("D", 5)], { lines: ["The sea behind her.", "She was better."] }),
  a1.video(video("D", 7)),
  a1.media([photo("D", 6)], { lines: ["Blossoms, a bus, and us on a bench like we owned the place."] }),
  a1.media([photo("D", 9), photo("D", 10), photo("D", 11)], { lines: ["Trains, elevators, snacks.", "The good stuff between places."] }),
  a1.video(video("D", 12)),
  a1.media([photo("D", 3), photo("D", 13)], { lines: ["Kisses on the cheek.", "Mostly in bad lighting."] }),

  a1.text({ slug: "japan", kicker: "Then", title: "Japan.", lines: ["A lot of walking.", "An unreasonable amount of snacks."] }),
  a1.media([photo("D", 14), photo("D", 23), photo("D", 24), video("D", 29)], { lines: ["Souvenir shopping, Min style."] }),
  a1.video(video("D", 15)),
  a1.video(video("D", 16)),
  a1.video(video("D", 19)),
  a1.video(video("D", 20)),
  a1.media([photo("D", 36)], { lines: ["Cherry blossoms.", "Someone had a heart doodle ready."] }),
  a1.video(video("D", 22)),
  a1.media([photo("D", 34), photo("D", 31), video("D", 33)], {}),
  a1.media([photo("D", 43), photo("D", 47)], { lines: ["Public affection.", "Highly recommended."] }),
  a1.video(video("D", 45)),
  a1.media([photo("D", 40)], { lines: ["Sunset, river, you."] }),
  a1.video(video("D", 41)),
  a1.video(video("D", 50)),
  a1.media([photo("D", 44), photo("D", 51), video("D", 39)], { lines: ["Meals: many.", "Regrets: zero."] }),
  a1.video(video("D", 52)),
  a1.media([photo("D", 53)], { lines: ["Train selfie.", "We look tired and happy."] }),
  a1.video(video("D", 46)),
  a1.media([photo("D", 54), photo("D", 57)], { lines: ["Hotel bed, tiny plushies, big smiles."] }),
  a1.video(video("D", 55)),
  a1.video(video("D", 63)),
  a1.video(video("D", 56)),
  a1.media(
    [photo("D", 35), video("D", 38), photo("D", 42), photo("D", 58), photo("D", 62), video("D", 37), video("D", 48)],
    { layout: "dump", lines: ["Everything else."] },
  ),

  // ───────────────────────── ACT II ─────────────────────────
  a2.text({ slug: "apart-two", kicker: "Meanwhile", title: "Minnie continued being Minnie.", tone: "medium" }),
  a2.media([photo("E", 2), photo("E", 9), photo("E", 13), photo("E", 22)], { lines: ["Documented for science."] }),
  a2.media([photo("E", 5)], { lines: ["Somehow my name ended up on her desk.", "I’m not complaining."] }),
  a2.media([photo("E", 12)], { lines: ["Our little wall of us."] }),
  a2.media([photo("E", 23)], { lines: ["Also: flowers. She’s doing fine."] }),

  a2.flight({ slug: "reunion-flight", from: "Korea", to: "Italy", lines: ["And then, July."] }),
  a2.text({ slug: "reunion", lines: ["Reunion.", "Finally."] }),

  // ITALY SUMMER (F)
  a2.text({ slug: "italy-summer", kicker: "Chapter four", title: "Our little life.", lines: ["Less “we travelled here.”", "More “this is what it feels like.”"] }),
  a2.media([photo("F", 1)], { lines: ["July started with flowers."] }),
  a2.video(video("F", 2)),
  a2.text({ slug: "driving", kicker: "Field notes", title: "Driving with Min.", lines: ["A short guide."] }),
  a2.media([photo("F", 15)], { lines: ["The co-pilot.", "Comes with her own pillow."] }),
  a2.video(video("F", 10)),
  a2.media([photo("F", 9)], { lines: ["In-car entertainment system:", "Min. Volume: high."] }),
  a2.video(video("F", 16)),
  a2.media([photo("F", 46)], { lines: ["Snack stop.", "Non-negotiable."] }),
  a2.media([video("F", 37), video("F", 30)], { lines: ["Navigation assistant:", "asleep."] }),
  a2.video(video("F", 22)),
  a2.media([photo("F", 26)], { lines: ["10/10.", "Would road trip again."] }),
  a2.media([video("F", 4), photo("F", 5), photo("F", 13)], { lines: ["Min, chilling.", "Everywhere."] }),
  a2.video(video("F", 3)),
  a2.media([photo("F", 24)], { lines: ["Pasta with a view.", "Min with the better view."] }),
  a2.video(video("F", 6)),
  a2.media([photo("F", 38)], { lines: ["Pisa.", "She’s holding it up. Don’t tell anyone."] }),
  a2.media([photo("F", 40)], { lines: ["Canals, gelato weather, and the required selfie."] }),
  a2.media([video("F", 31), photo("F", 44), photo("F", 43)], {}),
  a2.media([photo("F", 39), photo("F", 55)], { lines: ["Min baking.", "Me supervising. (Eating.)"] }),
  a2.media([photo("F", 32), photo("F", 42)], { lines: ["Ordinary Tuesday.", "Extremely good."] }),
  a2.video(video("F", 50)),
  a2.media([photo("F", 47)], { lines: ["Somewhere with a lake and no schedule."] }),
  a2.media([photo("F", 48), photo("F", 52), video("F", 53), photo("F", 54), photo("F", 56), photo("F", 57)], { layout: "dump", lines: ["Small moments."] }),
  a2.media([photo("F", 58), video("F", 41), photo("F", 62)], { lines: ["Me, leaning on my favorite person."] }),

  a2.text({ slug: "paris", kicker: "Also", title: "Paris.", lines: ["Because why not."] }),
  a2.video(video("F", 63)),
  a2.media([photo("F", 65)], { lines: ["My favorite exhibit."] }),
  a2.video(video("F", 67)),
  a2.media([photo("F", 71), photo("F", 72)], { lines: ["A very long hallway.", "Perfect for a kiss."] }),
  a2.media([photo("F", 73)], { lines: ["Golden hour by the river."] }),
  a2.video(video("F", 75)),
  a2.media([photo("F", 78)], { lines: ["Lunch with a view.", "Me eating. Min documenting."] }),
  a2.video(video("F", 79)),
  a2.media([photo("F", 82)], { lines: ["Tired. Happy.", "Still leaning on each other."] }),

  // MANY MINNIES
  a2.text({ slug: "minnies-intro", kicker: "Field guide", title: "The many Minnies.", lines: ["Quick. Don’t blink."] }),
  a2.rapid(
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
  a2.text({ slug: "now", kicker: "Now", title: "And now.", lines: ["Distance again."] }),
  a2.media([photo("G", 3), photo("G", 5)], { lines: ["But look at her.", "Cap on, apron on, thumbs up."] }),
  a2.media([photo("G", 2), photo("G", 1), photo("G", 4)], { lines: ["Still Min.", "Still the best part of my day."] }),
  a2.text({ slug: "what-next", title: "So what happens next?", tone: "big" }),

  // ───────────────────────── ACT III ─────────────────────────
  a3.art("princeton-fall", { lines: ["Princeton, New Jersey.", "Yes, really."], kicker: "Next chapter", tone: "warm" }),
  a3.art("princeton-snow", { lines: ["Snow. A train to New York.", "Coffee in paper cups."], tone: "cold" }),
  a3.art("home", { lines: ["Our future home.", "Small. Warm. Porch light on."] }),
  a3.art("kitchen", { lines: ["Min’s office.", "Staff: one pastry chef, one taste tester."] }),
  a3.art("bedroom", { geese: 0, lines: ["The bedroom.", "Calm. Tasteful. One lamp."] }),
  a3.art("bedroom", { geese: 1, count: "1", lines: ["One goose pillow.", "Cute, honestly."] }),
  a3.art("bedroom", { geese: 2, count: "2", lines: ["Two.", "Still normal."] }),
  a3.art("bedroom", { geese: 5, count: "5", lines: ["Five.", "Someone has been shopping."] }),
  a3.art("bedroom", { geese: 12, count: "12", lines: ["Twelve.", "We need to talk."] }),
  a3.art("bedroom", { geese: 90, count: "GOOSE APOCALYPSE", apocalypse: true, tone: "alarm", lines: ["Min: “I don’t see the problem.”"] }),
  a3.art("family-cover", { lines: ["Content warning: extremely cute."], tone: "warm" }),
  a3.art("family-lineup", { lines: ["Release date: unknown.", "Goose pillows: included."], tone: "warm" }),

  a3.text({ slug: "quiet-one", tone: "quiet", lines: ["Maybe I don’t know exactly what our house will look like."] }),
  a3.text({ slug: "quiet-two", tone: "quiet", lines: ["Or how many goose pillows there will be."] }),
  a3.text({ slug: "quiet-three", tone: "quiet", lines: ["But there’s one thing I do know."] }),

  a3.media([photo("F", 47)], { slug: "final-a", tone: "final", lines: ["I want you in it."] }),
  a3.media([photo("F", 47)], { slug: "final-b", tone: "final", lines: ["Happy anniversary, Min."] }),
  a3.text({ slug: "final-date", tone: "night", title: "26.09.2026", lines: ["— Giuseppe"], last: true }),
];
