import GamingSvg from "./svg/GamingSvg";
import SportsSvg from "./svg/SportsSvg";
import BusinessSvg from "./svg/BusinessSvg";
import CryptoSvg from "./svg/CryptoSvg";
import CelebritySvg from "./svg/CelebritySvg";
import TelevisionSvg from "./svg/TelevisionSvg";
import OthersSvg from "./svg/OthersSvg";

const explore = [
  {
    name: "Gaming",
    svg: GamingSvg,
    children: [
      "Valheim",
      "Genshin Impact",
      "Minecraft",
      "Pokimane",
      "Halo Infinite",
      "Call of Duty: Warzone",
      "Path of Exile",
      "Hollow Knight: Silksong",
      "Escape from Tarkov",
      "Watch Dogs: Legion",
    ],
  },
  {
    name: "Sports",
    svg: SportsSvg,
    children: [
      "NFL",
      "NBA",
      "Megan Anderson",
      "Atlanta Hawks",
      "Los Angeles Lakers",
      "Boston Celtics",
      "Arsenal F.C.",
      "Philadelphia 76ers",
      "Premier League",
      "UFC",
    ],
  },

  {
    name: "Business, Economics, and Finance",
    svg: BusinessSvg,
    children: [
      "GameStop",
      "Moderna",
      "Pfizer",
      "Johnson & Johnson",
      "AstraZeneca",
      "Walgreens",
      "Best Buy",
      "Novavax",
      "SpaceX",
      "Tesla",
    ],
  },

  {
    name: "Crypto",
    svg: CryptoSvg,
    children: [
      "Cardano",
      "Dogecoin",
      "Algorand",
      "Bitcoin",
      "Litecoin",
      "Basic Attention Token",
      "Bitcoin Cash",
    ],
  },

  {
    name: "Television",
    svg: TelevisionSvg,
    children: [
      "The Real Housewives of Atlanta",
      "The Bachelor",
      "Sister Wives",
      "90 Day Fiance",
      "Wife Swap",
      "The Amazing Race Australia",
      "Married at First Sight",
      "The Real Housewives of Dallas",
      "My 600-lb Life",
      "Last Week Tonight with John Oliver",
    ],
  },

  {
    name: "Celebrity",
    svg: CelebritySvg,
    children: [
      "Kim Kardashian",
      "Doja Cat",
      "Iggy Azalea",
      "Anya Taylor-Joy",
      "Jamie Lee Curtis",
      "Natalie Portman",
      "Henry Cavill",
    ],
  },

  {
    name: "More Topics",
    svg: OthersSvg,
    children: [
      "Animals and Pets",
      "Anime",
      "Art",
      "Cars and Motor Vehicles",
      "Crafts and DIY",
      "Culture, Race, and Ethnicity",
      "Ethics and Philosophy",
      "Fashion",
      "Food and Drink",
      "History",
      "Hobbies",
      "Law",
      "Learning and Education",
      "Military",
      "Movies",
      "Music",
      "Place",
      "Podcasts and Streamers",
      "Programming",
      "Reading, Writing, and Literature",
      "Religion and Spirituality",
      "Science",
      "Tabletop Games",
      "Technology",
      "Travel",
    ],
  },
];

const more = [
  "Reddit iOS",
  "Reddit Andriod",
  "Rereddit",
  "Best Communities",
  "About Reddit",
  "Blog",
  "Careers",
  "Press",
  "Visit Old Reddit",
];

const terms = [
  "User Agreement",
  "Privacy Policy",
  "Content Policy",
  "Moderator Code of Conduct",
];

export { explore, more, terms };
