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
    text: "Cum este descrisă spiritual biserica din Smirna în pbl.md?",
    options: [
      "Nu primește mustrare, ci încurajare",
      "Primește doar mustrare",
      "Este declarată moartă spiritual",
      "Este numită căldicică",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    churchId: 2,
    text: "Care este mesajul central pentru Smirna prezentat în pbl.md?",
    options: [
      "Fii credincios până la moarte și îți voi da cununa vieții",
      "Fii bogat și vei fi mântuit",
      "Renunță la încercări și odihnește-te",
      "Construiește temple noi",
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
    text: "Ce reproș primește Tiatira în pbl.md?",
    options: [
      "A tolerat învățăturile false ale Izabelei",
      "A refuzat slujirea",
      "Nu mai avea nicio faptă",
      "A părăsit complet orașul",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 8,
    churchId: 4,
    text: "Ce promisiune primesc biruitorii din Tiatira conform pbl.md?",
    options: [
      "Autoritate asupra neamurilor și steaua de dimineață",
      "Bogăție materială imediată",
      "Mutarea într-un alt oraș",
      "Scutire de orice încercare",
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
    text: "Care este avertismentul dat Sardesului în pbl.md?",
    options: [
      "Dacă nu se trezesc, Hristos va veni ca un hoț",
      "Orașul va deveni capitală imperială",
      "Vor primi imediat bogăție",
      "Nu mai este nevoie de pocăință",
    ],
    correctAnswerIndex: 0,
  },
  // Biserica Filadelfiei
  {
    id: 11,
    churchId: 6,
    text: "Ce este specific bisericii din Filadelfia, conform pbl.md?",
    options: [
      "Nu primește nicio mustrare",
      "Este numită căldicică",
      "Este acuzată de idolatrie",
      "Este declarată moartă spiritual",
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 12,
    churchId: 6,
    text: "Ce imagine folosește mesajul către Filadelfia în pbl.md?",
    options: [
      "O ușă deschisă pe care nimeni nu o poate închide",
      "Un zid care separă toate neamurile",
      "Un templu închis pentru toți",
      "Un tron politic la Roma",
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
    text: "Ce remediu spiritual este menționat pentru Laodiceea în pbl.md?",
    options: [
      "Să-și cumpere aur încercat în foc",
      "Să își mărească armata",
      "Să construiască mai multe apeducte",
      "Să renunțe la orice disciplină spirituală",
    ],
    correctAnswerIndex: 0,
  },
];
