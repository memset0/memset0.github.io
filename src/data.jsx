// data.jsx — content from CV (Yulun Wu)
const SITE = {
  name: "Yulun Wu",
  handle: "memset0",
  tagline: "Undergraduate",
  affiliation: "Zhejiang University",
  university: "Zhejiang University",
  location: "San Diego, CA",
  email: "yuw352@ucsd.edu",
  blogUrl: "https://mem.ac/posts",
  socials: [
    { label: "GitHub",  href: "https://github.com/memset0",   icon: "github" },
    { label: "Blog",    href: "https://mem.ac/posts",          icon: "external" },
  ],
  about: [
    "I am <strong>Yulun Wu</strong>, an undergraduate student at <strong>Zhejiang University</strong> (CS'27). Currently I am a visiting student at <strong>UC San Diego</strong>, advised by Prof. <a href=\"https://haozhang.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">Hao Zhang</a>.",
    "I am broadly interested in large language models, with a focus on <strong>efficient ML systems</strong> and <strong>agentic reasoning</strong>.",
    "In addition to research, I have been actively involved in <strong>competitive programming</strong> for over a decade. As the team leader of <a href=\"https://github.com/plenty-of-penalty/acm-template.typ\" target=\"_blank\" rel=\"noopener noreferrer\">Plenty of Penalty</a>, I led my team to a <strong>3rd place</strong> finish at the <strong>49th ICPC EC-Final</strong>, the national-level championship.",
  ],
  interests: ["Efficient ML Systems", "LLM Agentic Learning", "LLM Reasoning & Reinforcement Learning"],
  education: [
    {
      date: "Sept. 2023 — Present",
      title: "Zhejiang University",
      org: "B.Eng. in Computer Science & Technology",
      detail: "GPA 4.7 / 5.0 (93 / 100).",
      logo: "assets/logo-zju.png",
    },
  ],
  experience: [
    {
      date: "Mar. 2026 — Present",
      title: "University of California, San Diego",
      org: "Research Intern, advised by Prof. Hao Zhang",
      detail: "ML systems (training acceleration, speculative decoding) and LLM agents",
      logo: "assets/logo-ucsd.png",
    },
    {
      date: "Jul. 2025 — Nov. 2025",
      title: "Shanghai AI Lab",
      org: "Research Intern",
      detail: "Agentic reinforcement learning for LLMs",
      logo: "assets/logo-shlab.png",
    },
  ],
  publications: [
    {
      venue: "<strong>ICML 2026</strong>",
      year: "",
      title: "Evaluating Parameter Efficient Methods for RLVR",
      authors: [
        "Qingyu Yin*", "Yulun Wu*", "Zhennan Shen*",
        "Sunbowen Li", "Zhilin Wang", "Yanshu Li",
        "Chak Tou Leong", "Jiale Kang", "Jinjin Gu",
      ],
      links: [
        { label: "arXiv", href: "#" },
      ],
      thumb: "RLVR",
      thumbImg: "assets/pub-rlvr.png",
    },
    {
      venue: "arXiv preprint",
      year: "2025",
      badge: "tech report",
      title: "P1: Mastering Physics Olympiads with Reinforcement Learning",
      authors: [
        "Jiacheng Chen*", "Qianjia Cheng*", "Fangchen Yu*",
        "et al.", "(incl. Yulun Wu)",
      ],
      links: [
        { label: "arXiv", href: "#" },
      ],
      thumb: "P1",
      thumbImg: "assets/pub-p1.png",
      note: "Work done during internship at Shanghai AI Lab.",
    },
  ],
  scholarships: [
    { year: "Oct. 2025", title: "He Zhijun Education Fund Scholarship",  org: 'Highest scholarship of his college <strong>(1/550)</strong>' },
    { year: "Aug. 2025", title: "CCF Elite Collegiate Award",            org: '<strong>Top 99</strong> undergraduates nationwide in China' },
  ],
  awards: [
    { year: "Dec. 2024", title: "The 49th ICPC Asia East Continent Final (EC-Final) — Gold Medal, 3rd Place", org: "<strong>Top 3</strong> nationwide, out of 4,539 teams across all regionals" },
    { year: "Nov. 2023", title: "The 48th ICPC Regional Hefei — Gold Medal, 2nd Place",         org: "" },
    { year: "Nov. 2023", title: "The 48th ICPC Regional Nanjing — Gold Medal, 3rd Place",       org: "" },
    { year: "Oct. 2023", title: "The 9th CCPC Regional Qinhuangdao — Gold Medal, 3rd Place",   org: "" },
  ],
  // Additional ICPC/CCPC golds (not podium) — shown under a collapsible "more" toggle
  awardsMore: [
    { year: "Dec. 2025", title: "The 50th ICPC Regional Kunming — Gold Medal",   org: "" },
    { year: "Nov. 2025", title: "The 11th CCPC Regional Chongqing — Gold Medal", org: "" },
    { year: "Nov. 2025", title: "The 50th ICPC Regional Shanghai — Gold Medal",  org: "" },
    { year: "Nov. 2025", title: "The 11th CCPC Regional Jinan — Gold Medal",     org: "" },
    { year: "Dec. 2024", title: "The 49th ICPC Regional Kunming — Gold Medal",   org: "" },
    { year: "Nov. 2024", title: "The 49th ICPC Regional Shanghai — Gold Medal",  org: "" },
    { year: "Nov. 2024", title: "The 10th CCPC Regional Chongqing — Gold Medal", org: "" },
    { year: "Oct. 2024", title: "The 10th CCPC Regional Jinan — Gold Medal",     org: "" },
  ],
};

window.SITE = SITE;
