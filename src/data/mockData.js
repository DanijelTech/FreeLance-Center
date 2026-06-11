// Mock podatki za freelancer dashboard - vse vrednosti so statične/demo

export const sparkline7d = [
  { day: "Pon", value: 12000 },
  { day: "Tor", value: 12150 },
  { day: "Sre", value: 12080 },
  { day: "Čet", value: 12300 },
  { day: "Pet", value: 12260 },
  { day: "Sob", value: 12380 },
  { day: "Ned", value: 12400 },
];

export const socialNetworks = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@mojracun",
    gradient: "from-[#feda75] via-[#d62976] to-[#962fbf]",
    followers: "12.4K",
    following: "892",
    likes: "3.241",
    comments: "847",
    newDMs: 23,
    lastPost: "2h",
    status: "active",
    sparkline: [
      { v: 11900 }, { v: 12000 }, { v: 12050 }, { v: 12180 }, { v: 12240 }, { v: 12320 }, { v: 12400 },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "MojKanal",
    gradient: "from-[#FF0000] to-[#cc0000]",
    subscribers: "8.7K",
    views: "45.2K",
    pendingComments: 134,
    totalLikes: "12.1K",
    newSubsToday: "+47",
    status: "active",
    sparkline: [
      { v: 8400 }, { v: 8480 }, { v: 8520 }, { v: 8560 }, { v: 8610 }, { v: 8660 }, { v: 8700 },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    handle: "@mojracun",
    gradient: "from-[#00f2ea] via-[#000000] to-[#ff0050]",
    followers: "34.1K",
    likes: "892K",
    views: "156K",
    comments: "2.341",
    shares: "891",
    trend: "up",
    trendPercent: "8.2%",
    status: "active",
    sparkline: [
      { v: 30000 }, { v: 31200 }, { v: 31900 }, { v: 32500 }, { v: 33100 }, { v: 33700 }, { v: 34100 },
    ],
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    handle: "@mojracun",
    gradient: "from-[#000000] to-[#1a1a1a]",
    followers: "5.2K",
    tweetsThisMonth: "89",
    likes: "1.204",
    retweets: "234",
    mentions: "67",
    dms: "12",
    status: "active",
    sparkline: [
      { v: 4900 }, { v: 4950 }, { v: 5000 }, { v: 5050 }, { v: 5100 }, { v: 5160 }, { v: 5200 },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Danijel C.",
    gradient: "from-[#0A66C2] to-[#004182]",
    connections: "1.847",
    profileViews: "423",
    postLikes: "891",
    comments: "156",
    pendingRequests: 8,
    status: "active",
    sparkline: [
      { v: 1700 }, { v: 1740 }, { v: 1770 }, { v: 1790 }, { v: 1810 }, { v: 1830 }, { v: 1847 },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    handle: "Freelance Stran",
    gradient: "from-[#1877F2] to-[#0a4ea8]",
    pageLikes: "4.2K",
    reach: "12.4K",
    comments: "234",
    shares: "67",
    status: "active",
    sparkline: [
      { v: 4000 }, { v: 4050 }, { v: 4080 }, { v: 4120 }, { v: 4150 }, { v: 4180 }, { v: 4200 },
    ],
  },
];

export const proxies = [
  {
    id: 1,
    address: "185.234.219.90",
    port: "8080",
    protocol: "HTTPS",
    status: "active",
    speed: "45ms",
    location: "Nemčija",
    flag: "🇩🇪",
  },
  {
    id: 2,
    address: "92.118.234.56",
    port: "3128",
    protocol: "SOCKS5",
    status: "active",
    speed: "123ms",
    location: "Nizozemska",
    flag: "🇳🇱",
  },
  {
    id: 3,
    address: "103.47.29.91",
    port: "8080",
    protocol: "HTTP",
    status: "inactive",
    speed: "-",
    location: "ZDA",
    flag: "🇺🇸",
  },
  {
    id: 4,
    address: "45.77.123.201",
    port: "1080",
    protocol: "SOCKS5",
    status: "checking",
    speed: "...",
    location: "Japonska",
    flag: "🇯🇵",
  },
  {
    id: 5,
    address: "178.62.193.71",
    port: "3128",
    protocol: "HTTPS",
    status: "active",
    speed: "67ms",
    location: "UK",
    flag: "🇬🇧",
  },
];

export const messages = [
  {
    id: 1,
    platform: "instagram",
    name: "Marja Kovač",
    avatar: "MK",
    preview: "Živjo! Ali bi bil zaniman za sodelovanje na mojem profilu?",
    time: "5min",
    read: false,
  },
  {
    id: 2,
    platform: "linkedin",
    name: "Jure Petek",
    avatar: "JP",
    preview: "Pozdravljen, ogledal sem si tvoj profil in me zanima...",
    time: "23min",
    read: false,
  },
  {
    id: 3,
    platform: "twitter",
    name: "@dev_slovenija",
    avatar: "DS",
    preview: "Super projekt! Ali je koda odprtokodna?",
    time: "1h",
    read: true,
  },
  {
    id: 4,
    platform: "youtube",
    name: "CoolViewer99",
    avatar: "CV",
    preview: "Kdaj pride nova epizoda serije o React-u?",
    time: "3h",
    read: true,
  },
  {
    id: 5,
    platform: "linkedin",
    name: "Ana Novak",
    avatar: "AN",
    preview: "Hvala za povezavo, bi rad sodeloval na projektu...",
    time: "5h",
    read: true,
  },
];

// Rast angažiranosti zadnjih 14 dni po platformah
export const engagementHistory = [
  { date: "28.5", instagram: 2900, youtube: 1800, tiktok: 5200, twitter: 900, linkedin: 600, facebook: 1100 },
  { date: "29.5", instagram: 3100, youtube: 1750, tiktok: 5400, twitter: 950, linkedin: 620, facebook: 1150 },
  { date: "30.5", instagram: 3050, youtube: 1900, tiktok: 5800, twitter: 1000, linkedin: 640, facebook: 1180 },
  { date: "31.5", instagram: 3300, youtube: 2000, tiktok: 6100, twitter: 1020, linkedin: 660, facebook: 1200 },
  { date: "1.6", instagram: 3250, youtube: 2100, tiktok: 6400, twitter: 1080, linkedin: 700, facebook: 1250 },
  { date: "2.6", instagram: 3400, youtube: 2050, tiktok: 6700, twitter: 1100, linkedin: 720, facebook: 1280 },
  { date: "3.6", instagram: 3550, youtube: 2200, tiktok: 7000, twitter: 1150, linkedin: 740, facebook: 1300 },
  { date: "4.6", instagram: 3500, youtube: 2300, tiktok: 7200, twitter: 1180, linkedin: 760, facebook: 1320 },
  { date: "5.6", instagram: 3700, youtube: 2250, tiktok: 7500, twitter: 1200, linkedin: 780, facebook: 1350 },
  { date: "6.6", instagram: 3800, youtube: 2400, tiktok: 7800, twitter: 1250, linkedin: 800, facebook: 1380 },
  { date: "7.6", instagram: 3950, youtube: 2500, tiktok: 8100, twitter: 1280, linkedin: 820, facebook: 1400 },
  { date: "8.6", instagram: 4100, youtube: 2450, tiktok: 8400, twitter: 1300, linkedin: 840, facebook: 1420 },
  { date: "9.6", instagram: 4200, youtube: 2600, tiktok: 8700, twitter: 1340, linkedin: 860, facebook: 1450 },
  { date: "10.6", instagram: 4350, youtube: 2700, tiktok: 9000, twitter: 1380, linkedin: 880, facebook: 1480 },
];

export const platformComparison = [
  { name: "Instagram", followers: 12400, engagement: 7.8, color: "#d62976" },
  { name: "YouTube", followers: 8700, engagement: 5.4, color: "#FF0000" },
  { name: "TikTok", followers: 34100, engagement: 9.2, color: "#00f2ea" },
  { name: "X (Twitter)", followers: 5200, engagement: 3.1, color: "#e2e8f0" },
  { name: "LinkedIn", followers: 1847, engagement: 4.6, color: "#0A66C2" },
  { name: "Facebook", followers: 4200, engagement: 2.9, color: "#1877F2" },
];

export const topPosts = [
  {
    id: 1,
    platform: "tiktok",
    title: "5 trikov za hitrejši React razvoj",
    metric: "892K ogledov",
    engagement: "12.4% engagement",
    date: "pred 3 dnevi",
  },
  {
    id: 2,
    platform: "instagram",
    title: "Behind the scenes - moj delovni prostor",
    metric: "45.2K všečkov",
    engagement: "8.9% engagement",
    date: "pred 5 dnevi",
  },
  {
    id: 3,
    platform: "youtube",
    title: "Kako sem zgradil dashboard v enem dnevu",
    metric: "23.1K ogledov",
    engagement: "6.7% engagement",
    date: "pred 1 teden",
  },
  {
    id: 4,
    platform: "linkedin",
    title: "Zakaj se freelancerji morajo naučiti Tailwind CSS",
    metric: "3.2K ogledov",
    engagement: "5.1% engagement",
    date: "pred 1 teden",
  },
  {
    id: 5,
    platform: "twitter",
    title: "Nit o tem, kako sem pridobil prve stranke",
    metric: "1.8K všečkov",
    engagement: "4.4% engagement",
    date: "pred 2 tednoma",
  },
];

// Urnik objav - dnevi so relativni glede na trenutni teden (0 = ponedeljek)
export const scheduledPosts = [
  { id: 1, platform: "instagram", title: "Reel: Dan iz življenja freelancerja", day: 0, time: "09:00", status: "published" },
  { id: 2, platform: "linkedin", title: "Članek: 5 nasvetov za nove freelancerje", day: 0, time: "14:00", status: "published" },
  { id: 3, platform: "tiktok", title: "Hitri trik za React performance", day: 1, time: "18:00", status: "published" },
  { id: 4, platform: "youtube", title: "Tutorial: Gradnja dashboarda v Reactu", day: 2, time: "16:00", status: "scheduled" },
  { id: 5, platform: "instagram", title: "Carousel: Pred/po redesign projekta", day: 2, time: "11:00", status: "scheduled" },
  { id: 6, platform: "twitter", title: "Nit o cenovnih strategijah za freelancerje", day: 3, time: "10:00", status: "scheduled" },
  { id: 7, platform: "facebook", title: "Objava: Nova storitev na voljo", day: 4, time: "12:00", status: "scheduled" },
  { id: 8, platform: "tiktok", title: "Q&A: Najpogostejša vprašanja strank", day: 4, time: "19:00", status: "draft" },
  { id: 9, platform: "linkedin", title: "Case study: Projekt za stranko XY", day: 5, time: "09:30", status: "draft" },
  { id: 10, platform: "instagram", title: "Story: Vprašaj me karkoli (AMA)", day: 6, time: "17:00", status: "scheduled" },
];

// Modeli, ki jih (simulirano) vrne LM Studio API ob testu povezave
export const lmStudioModels = [
  "meta-llama-3.1-8b-instruct",
  "mistral-7b-instruct-v0.3",
  "qwen2.5-14b-instruct",
  "deepseek-r1-distill-qwen-7b",
];

// Dnevnik dejanj Hermes agenta (mock)
export const agentLogs = [
  { id: 1, type: "reply", platform: "instagram", text: "Avtomatsko odgovorjeno na DM od MarjaKovač", time: "pred 4 min" },
  { id: 2, type: "sentiment", platform: "youtube", text: "Analiziranih 12 novih komentarjev (10 pozitivnih, 2 nevtralna)", time: "pred 22 min" },
  { id: 3, type: "comment", platform: "tiktok", text: "Predlagan odgovor na komentar od neza_98", time: "pred 38 min" },
  { id: 4, type: "summary", platform: "linkedin", text: "Pripravljen dnevni povzetek aktivnosti", time: "pred 1 h" },
  { id: 5, type: "reply", platform: "facebook", text: "Avtomatsko odgovorjeno na vprašanje o storitvah", time: "pred 2 h" },
];

export const conversations = {
  1: [
    { from: "them", text: "Živjo! Ali bi bil zaniman za sodelovanje na mojem profilu?", time: "10:02" },
    { from: "them", text: "Iščem nekoga, ki bi mi pomagal urediti feed in objave.", time: "10:03" },
    { from: "me", text: "Pozdravljena Marja, hvala za sporočilo! Lahko, povej mi več o projektu.", time: "10:14" },
    { from: "them", text: "Super! Gre za manjšo modno znamko, potrebujem ~10 objav na mesec.", time: "10:20" },
  ],
  2: [
    { from: "them", text: "Pozdravljen, ogledal sem si tvoj profil in me zanima sodelovanje.", time: "08:40" },
    { from: "them", text: "Iščemo freelancerja za upravljanje LinkedIn strani podjetja.", time: "08:41" },
  ],
  3: [
    { from: "them", text: "Super projekt! Ali je koda odprtokodna?", time: "včeraj" },
    { from: "me", text: "Hvala! Trenutno ne, ampak razmišljam o tem za prihodnost.", time: "včeraj" },
  ],
  4: [
    { from: "them", text: "Kdaj pride nova epizoda serije o React-u?", time: "ponedeljek" },
    { from: "me", text: "Naslednji teden! Delam na delu o custom hookih.", time: "ponedeljek" },
  ],
  5: [
    { from: "them", text: "Hvala za povezavo, bi rad sodeloval na projektu.", time: "petek" },
    { from: "them", text: "Imamo prosto mesto za kratkoročno sodelovanje na vsebinski strategiji.", time: "petek" },
  ],
};

export const comments = [
  {
    id: 1,
    platform: "instagram",
    author: "tina.creative",
    content: "Wau, ta postavitev je čudovita! Kje si naročil ta material?",
    time: "12min",
  },
  {
    id: 2,
    platform: "youtube",
    author: "MarkoDev",
    content: "Odličen tutorial, ali lahko narediš še eno o hookih?",
    time: "45min",
  },
  {
    id: 3,
    platform: "tiktok",
    author: "neza_98",
    content: "Kako si to naredil v tako kratkem času?? 😍",
    time: "1h",
  },
  {
    id: 4,
    platform: "facebook",
    author: "Boštjan K.",
    content: "Ali ponujate tudi popravila obstoječih spletnih strani?",
    time: "2h",
  },
  {
    id: 5,
    platform: "twitter",
    author: "@startup_si",
    content: "Bi bil pripravljen na kratek intervju za naš blog?",
    time: "4h",
  },
];

export const statsCards = [
  {
    id: "reach",
    label: "Skupni doseg",
    value: "89.4K",
    trend: "up",
    change: "+12% ta teden",
    color: "primary",
    icon: "trending-up",
    sparkline: [
      { v: 70 }, { v: 75 }, { v: 78 }, { v: 82 }, { v: 86 }, { v: 90 }, { v: 89.4 },
    ],
  },
  {
    id: "likes",
    label: "Skupni všečki",
    value: "18.2K",
    trend: "up",
    change: "+8% ta teden",
    color: "pink",
    icon: "heart",
    sparkline: [
      { v: 14 }, { v: 14.5 }, { v: 15.2 }, { v: 16 }, { v: 16.8 }, { v: 17.5 }, { v: 18.2 },
    ],
  },
  {
    id: "comments",
    label: "Skupni komentarji",
    value: "3.8K",
    trend: "up",
    change: "+23% ta teden",
    color: "secondary",
    icon: "message-circle",
    sparkline: [
      { v: 2.5 }, { v: 2.7 }, { v: 2.9 }, { v: 3.1 }, { v: 3.4 }, { v: 3.6 }, { v: 3.8 },
    ],
  },
  {
    id: "followers",
    label: "Skupni sledilci",
    value: "66.4K",
    trend: "up",
    change: "+156 danes",
    color: "blue",
    icon: "users",
    sparkline: [
      { v: 60 }, { v: 61 }, { v: 62.5 }, { v: 63.8 }, { v: 64.9 }, { v: 65.7 }, { v: 66.4 },
    ],
  },
];
