export const slides = [
  { id: "slide-1", label: "Нүүр" },
  { id: "slide-2", label: "Дотоод үйл ажиллагаа" },
  { id: "slide-3", label: "4 тоглоом" },
  { id: "slide-4", label: "Дизайн таск" },
  { id: "slide-5", label: "Хөгжүүлэлтийн таск" },
  { id: "slide-6", label: "Миний бодол" },
  { id: "slide-7", label: "Баярлалаа" },
] as const;

export const games = [
  {
    no: "01",
    title: "Monkeytype",
    text: "Баг бүрээс 2 гишүүн гарч, тус бүр нэг гараараа шивж баг хоорондоо өрсөлдсөн.",
    image: "/images/mnky.png",
    alt: "Monkeytype тэмцээнд гишүүд шивж буй агшин",
  },
  {
    no: "02",
    title: "Савх",
    text: "Хоёр гишүүн нэг нэг савх барьж, эд зүйлийг өгөгдсөн тодорхой зайнд зөөсөн.",
    image: "/images/chops.jpeg",
    alt: "Савхаар эд зүйл зөөж буй гишүүд",
  },
  {
    no: "03",
    title: "Зураг таах",
    text: "20 үгийг дараалан нэг нь зурж, нөгөө нь таасан.",
    image: "/images/qstn.jpeg",
    alt: "Зураг зурж, таалцаж буй гишүүд",
  },
  {
    no: "04",
    title: "Загасчилъя",
    text: "Загас хэлбэртэй хайчилсан цааснуудыг дэвтэрээр сэвэн цуглуулсан загасны тоогоор хоорондоо өрсөлдсөн.",
    image: "/images/fish.jpeg",
    alt: "Дэвтрээр сэвж цаас хайж буй баг",
  },
] as const;

export const projects = [
  {
    title: "Story",
    text: "24 цагийн хугацаатай story хийх project",
    href: "https://story-1.vercel.app",
  },
  {
    title: "Temperature",
    text: "Цельс, Фаренгейт, Кельвин хооронд хөрвүүлэх project",
    href: "https://temperature-1.vercel.app",
  },
] as const;

export const thoughts = [
  "Маш гоё, өөрийн гэсэн амьсгалтай клуб.",
  "Яг л гэр бүл шиг найрсаг хамт олон.",
  "Их сургуульд ороод өөрийгөө нээсэн газар минь.",
] as const;
