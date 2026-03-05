export interface Church {
  id: number;
  name: string;
  location: string;
  description: string;
  revelation: string;
}

export interface Question {
  id: number;
  churchId: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export const churches: Church[] = [
  {
    id: 1,
    name: "Efesul",
    location: "Efes, Asia Mică",
    description: "Biserica care și-a pierdut dragostea dintâi",
    revelation: "Apocalipsa 2:1-7",
  },
  {
    id: 2,
    name: "Smirna",
    location: "Smirna, Asia Mică",
    description: "Biserica care va suferi dar va rămâne credincioasă",
    revelation: "Apocalipsa 2:8-11",
  },
  {
    id: 3,
    name: "Pergam",
    location: "Pergam, Asia Mică",
    description: "Biserica din locul tronului lui Satan",
    revelation: "Apocalipsa 2:12-17",
  },
  {
    id: 4,
    name: "Tiatira",
    location: "Tiatira, Asia Mică",
    description: "Biserica cu lucrări care cresc",
    revelation: "Apocalipsa 2:18-29",
  },
  {
    id: 5,
    name: "Sardes",
    location: "Sardes, Asia Mică",
    description: "Biserica cu nume de viu, dar moartă",
    revelation: "Apocalipsa 3:1-6",
  },
  {
    id: 6,
    name: "Filadelfie",
    location: "Filadelfie, Asia Mică",
    description: "Biserica cu puțintă putere dar plină de dragoste",
    revelation: "Apocalipsa 3:7-13",
  },
  {
    id: 7,
    name: "Laodicea",
    location: "Laodicea, Asia Mică",
    description: "Biserica care nu este nici fierbinte, nici rece",
    revelation: "Apocalipsa 3:14-22",
  },
];

export const questions: Question[] = [
  // Biserica Efesului
  {
    id: 1,
    churchId: 1,
    text: "Ce reproș i se aduce bisericii din Efes?",
    options: [
      "Că a pierdut dragostea dintâi",
      "Că are lipsă de credință",
      "Că are idoli",
      "Că nu are înțelepciune",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    churchId: 1,
    text: "Ce promisiune primește cine învinge la Efes?",
    options: [
      "Viață pentru totdeauna",
      "A mânca din pomul vieții",
      "Coroană de aur",
      "O casă în cer",
    ],
    correctAnswerIndex: 1,
  },
  // Biserica Smirnei
  {
    id: 3,
    churchId: 2,
    text: "Cât timp va trebui să sufere Biserica din Smirna conform Apocalipsei?",
    options: ["Zece zile", "O vară", "Șapte ani", "Până la sfârșitul lumii"],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    churchId: 2,
    text: "Ce mesaj are Isus pentru biserica din Smirna?",
    options: [
      "Nu vă temeți de suferințele ce vin",
      "Fiți curajoși și stabili",
      "Iubiți-vă dușmanii",
      "Chemați pe cei ce vă suferă",
    ],
    correctAnswerIndex: 0,
  },
  // Biserica Pergamului
  {
    id: 5,
    churchId: 3,
    text: "Unde se afla tronul lui Satan conform Apocalipsei?",
    options: [
      "La Pergam",
      "La Babilon",
      "La Ierusalim",
      "La Roma",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 6,
    churchId: 3,
    text: "Cine din Pergam a murit martir pentru credința sa?",
    options: [
      "Antipa",
      "Nicolae",
      "Balaam",
      "Iosua",
    ],
    correctAnswerIndex: 0,
  },
  // Biserica Tiaterei
  {
    id: 7,
    churchId: 4,
    text: "Ce reproș aduce Isus Bisericii din Tiatira?",
    options: [
      "Să mănânce din lucrurile jertfite idolilor",
      "Să se închine la idoli",
      "Să-și piardă credința",
      "Să judece pe alții",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 8,
    churchId: 4,
    text: "Cât de adânci sunt rătăcirile din Tiatira?",
    options: [
      "Adâncimile satanei",
      "Superficiale",
      "Ușor de rezolvat",
      "Neimportante",
    ],
    correctAnswerIndex: 0,
  },
  // Biserica Sardesului
  {
    id: 9,
    churchId: 5,
    text: "Care este starea Bisericii din Sardes?",
    options: [
      "Are nume de viu, dar e moartă",
      "E foarte vie și credincioasă",
      "E plină de dragoste",
      "E pură și fără cusur",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 10,
    churchId: 5,
    text: "Ce se va întâmpla cu hainele curate din Sardes?",
    options: [
      "Vor umbla cu Isus în alb",
      "Vor fi aprinse cu foc",
      "Vor fi luate",
      "Vor deveni negre",
    ],
    correctAnswerIndex: 0,
  },
  // Biserica Filadelfiei
  {
    id: 11,
    churchId: 6,
    text: "Care este caracteristica Bisericii din Filadelfie?",
    options: [
      "Are puțintă putere dar multă dragoste",
      "E bogată și slujește mamonei",
      "E aproape de a cădea",
      "E plină de rău",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 12,
    churchId: 6,
    text: "Ce promisiune specială primește Filadelfie?",
    options: [
      "Că va fi păzită de ceasul ispitei",
      "Că va deveni bogată",
      "Că va conduce alte biserici",
      "Că nu va mai suferi niciodată",
    ],
    correctAnswerIndex: 0,
  },
  // Biserica Laodicei
  {
    id: 13,
    churchId: 7,
    text: "Care este principala problemă a Bisericii din Laodicea?",
    options: [
      "Că nu este nici fierbinte, nici rece",
      "Că este prea fierbinte",
      "Că este prea credincioasă",
      "Că nu are bani",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 14,
    churchId: 7,
    text: "Ce sfat dă Isus Laodicei?",
    options: [
      "Să-și cumpere aur încercat în foc",
      "Să devină bogație",
      "Să aibă mai mulți membri",
      "Să se mute într-alt loc",
    ],
    correctAnswerIndex: 0,
  },
];
