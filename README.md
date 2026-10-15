# sys&cotech клуб: танилцуулга

Next.js 14 (App Router), Tailwind CSS, Framer Motion, React Three Fiber.

## Ажиллуулах

```bash
npm install
npm run dev
```

http://localhost:3000

## Зураг солих

`public/images/` хавтсанд дараах нэртэй зургуудаа хийнэ. Зураг байхгүй бол торон загвартай орлуулга харагдана.

| Файл                        | Слайд                             |
| --------------------------- | --------------------------------- |
| `slide2-team.jpg`           | 2: багийн зураг (4:3)             |
| `game-1.jpg` … `game-4.jpg` | 3: тоглоом бүрийн зураг (4:3)     |
| `design-1.png`              | 4: "Хийсэн ажлууд" дэлгэц (16:10) |
| `design-2.png`              | 4: "Contact" дэлгэц (16:10)       |
| `design-3.png`              | 4: утасны дэлгэц (9:19)           |
| `slide6-group.jpg`          | 6: хамтын зураг (4:5)             |

Нэр, гарчгаа `src/components/slides/Slide1.tsx` дотор `[НЭРЭЭ БИЧ]`, `[ГАРЧИГ]`-ийг солиод бичнэ.
Бусад текст `src/lib/content.ts` дотор байна.

## Vercel-д байршуулах

```bash
npx vercel
```

Эсвэл GitHub руу push хийгээд vercel.com дээр Import Project дарна. Тохиргоо автоматаар танигдана.
