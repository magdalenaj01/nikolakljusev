# Nikola Kljusev Foundation — Next.js (без Prisma)

Next.js 15, React 19, Tailwind CSS, анимации, македонски/англиски, /adminnena.

## Локален старт

1. `npm install`
2. Копирај `.env.example` како `.env` и постави сопствени `ADMIN_EMAIL`, силна `ADMIN_PASSWORD` (најмалку 12 карактери) и `SESSION_SECRET` (најмалку 32 карактери).
3. `npm run dev`
4. Страници: `http://localhost:3000/mk`, `http://localhost:3000/en`, админ: `http://localhost:3000/adminnena`.

Нема Prisma, SQL, миграции, ниту Supabase конфигурација.

## Податоци

`src/lib/db.ts` е единствениот слој за податоци. Пример-објавите се во `data/sample-posts.json`. При првата промена преку админ-панелот, податоците се запишуваат во `data/posts.json`. Датотеката намерно е во `.gitignore`. Секоја нова објава, измена или бришење ќе се зачува таму и веднаш ќе биде видлива преку страниците. Поддржани се категории `activities`, `projects`, `literature` и `published` статус.

**Ова е развојно решение со локални датотеки.** Не е соодветно за serverless хостинг или повеќе инстанци: датотеките може да исчезнат, а синхронизацијата помеѓу инстанци не е гарантирана. За продукција користи Supabase база и Supabase Storage за фотографиите. Постојното прикачување фотографии запишува во `public/uploads/` само на сервер со траен диск.

## Подоцна: Supabase

Замени ги имплементациите `db.post.findMany`, `db.post.findUnique`, `db.post.create`, `db.post.update`, `db.post.delete` во `src/lib/db.ts` со Supabase барања. Задржи го истиот `Post` облик (вклучувајќи Date полиња) или направи адаптер. Пренеси `data/posts.json` во Supabase табела `posts`. Заштити ги администраторските API рути со Supabase Auth и со правилни RLS policies; никогаш не изложувај service-role клуч во browser. Заменете го локалниот upload со Supabase Storage.

Админ најава во оваа верзија користи environment credentials и HTTP-only JWT колаче. Не користи реална база на админи. За јавна продукција премини на Supabase Auth и додај rate limiting за login.

## Структура
- `src/components/navigation/`: посебни Navbar, NavItem, LanguageSwitcher и MobileMenu.
- `src/components/home/Hero.tsx`: анимирана почетна секција.
- `src/app/[locale]/`: двојазични јавни страници.
- `src/app/adminnena/`: администраторски приказ.
- `src/app/api/admin/`: админ API и uploads.
- `src/lib/db.ts`: заменлив слој за податоци.
- `src/lib/i18n.ts`: преводи.

Реални фотографии се додаваат во `public/images/`; визуелните placeholder-и не се претставени како архивски фотографии.
