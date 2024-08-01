import Music from "../assets/ico/musical-note.png";
import Motion from "../assets/ico/motion-graphic.png";
import Calendar from "../assets/ico/calendar.png";
import Theater from "../assets/ico/theater.png";
import Vector from "../assets/ico/vector.png";
import Console from "../assets/ico/console.png";
import Tech from "../assets/ico/tech.png";
import Scolar from "../assets/ico/scolar.png";

export const DUMMY_DASHBOARD = [
  {
    id: 1,
    ico: Music,
    text: "Musiqi Sənayesi Akademiyası",
  },
  {
    id: 2,
    ico: Motion,
    text: "Animatorların Akselerasiyası",
    // to: '/animator',
  },
  {
    id: 3,
    ico: Calendar,
    text: "Producers Elevator",
    // to: '/procuders',
  },
  {
    id: 4,
    ico: Theater,
    text: "Komediya və Performans məktəbi",
    // to: '/comedia',
  },
  {
    id: 5,
    ico: Vector,
    text: "Qrafik Dizaynda Milli kod",
  },
  {
    id: 6,
    ico: Console,
    text: "Oyun Tərtibatçılar Emelatxanası",
    // to: '/game',
  },
  {
    id: 7,
    ico: Tech,
    text: "CulTech Akademiyası",
    // to: '/game',
  },
  {
    id: 8,
    ico: Scolar,
    text: "Təqaüd Proqramı",
    // to: '/game',
  },
];

export const languages = [
  {
    id: 1,
    name: "İngiliscə",
  },
  {
    id: 2,
    name: "Türkcə",
  },
  {
    id: 3,
    name: "Rusca",
  },
  {
    id: 4,
    name: "Almanca",
  },
];

export const eduLevels = [
  {
    id: 1,
    name: "Bakalavriat",
  },
  {
    id: 2,
    name: "Magistratura",
  },
];

export const parentOrNot = [
  {
    id: 1,
    name: "Valideyn",
  },
  {
    id: 2,
    name: "Qanuni nümayəndə",
  },
];

export const items = [
  {
    level: 1,
    steps: [
      {
        label:
          "Namizədin cari tədris ilində ümumtəhsil müəssisələrinin buraxılış sinfində (XI sinif və ya xaricdə təhsil aldıqda müvafiq buraxılış sinfi) təhsil almasını təsdiq edən arayış və ya tam orta təhsil və ya orta ixtisas təhsili haqqında dövlət sənədinin surəti",
      },
      {
        label:
          "Namizədin xarici ali təhsil müəssisəsinə qəbul edildiyini və ya xarici ali təhsil müəssisəsində təhsil aldığını təsdiq edən sənədin (ingilis, rus və türk dillərindən başqa digər dillərdə olan sənədlərin notariat qaydasında təsdiq edilmiş Azərbaycan dilinə tərcüməsi) surəti",
      },
      {
        label:
          "Namizədin təhsil alacağı xarici ali təhsil müəssisəsinin tədris dilini bilməsinə dair beynəlxalq səviyyəli dil sertifikatının surəti və ya öncəki təhsilini təhsil alacağı xarici dildə almasını təsdiq edən sənədin surəti",
      },
      {
        label:
          "Namizədin beynəlxalq təhsil proqramları üzrə müəyyən edilmiş keçid ballarının minimum və maksimum hədləri aralığında (minimum və maksimum bal daxil olmaqla) göstəricisini təsdiq edən müvafiq təhsil müəssisəsindən arayışın surəti",
      },
      {
        label: "Namizədin sağlamlığı haqqında arayış (forma AZS086/1)",
      },
    ],
  },
  {
    level: 2,
    steps: [
      {
        label:
          "Namizədin cari tədris ilində ali təhsil müəssisəsinin sonuncu tədris ilində təhsil almasını təsdiq edən arayış və ya bakalavr ali peşə-ixtisas dərəcəsi haqqında dövlət sənədinin surəti",
      },
      {
        label:
          "Namizədin xarici ali təhsil müəssisəsinə qəbul edildiyini və ya xarici ali təhsil müəssisəsində təhsil aldığını təsdiq edən sənədin (ingilis, rus və türk dillərindən başqa digər dillərdə olan sənədlərin notariat qaydasında təsdiq edilmiş Azərbaycan dilinə tərcüməsi) surəti",
      },
      {
        label:
          "Bakalavriat səviyyəsi üzrə xarici ali təhsilə aid kvalifikasiyanın tanınmasına dair şəhadətnamənin (xaricdə ali təhsil aldıqda) surəti",
      },
      {
        label:
          "Namizədin xarici ali təhsil müəssisəsində təhsil alma bacarıqları barədə rəyi özündə ehtiva edən ali təhsil müəssisəsi və ya elmi müəssisə və təşkilatda çalışan professor-müəllim heyətinin ən azı 2 (iki) üzvü tərəfindən verilmiş tövsiyə məktubunun (namizəd əmək fəaliyyəti ilə məşğul olduğu halda, məktublardan biri onun işəgötürəni tərəfindən təqdim edilə bilər) əsli və ya surəti",
      },
      {
        label:
          "Namizədin təhsil alacağı xarici ali təhsil müəssisəsinin tədris dilini bilməsinə dair beynəlxalq səviyyəli dil sertifikatının surəti və ya öncəki təhsilini təhsil alacağı xarici dildə almasını təsdiq edən sənədin surəti",
      },
      {
        label: "Namizədin transkriptinin (ÜOMG göstərilməklə) surəti",
      },
      {
        label: "Namizədin sağlamlığı haqqında arayış (forma AZS-086/1)",
      },
    ],
  },
];
