# Jocul celor 7 Biserici din Apocalipsa

Un joc interactiv de quiz bazat pe seria Trenului Revelatiei cu 7 statii (biserici) si podium cu clasament persistent pe dispozitiv.

## Caracteristici

- **Quiz Interactiv**: 2 intrebari per chiesa, 14 intrebari total
- **Progres Visual**: Bara de progres cu trenul animat
- **Podium**: Clasament bazat pe scor (desc) si timp (asc)
- **Blocare pe Dispozitiv**: Poti juca o singura data de pe acelasi telefon/browser
- **Panel Administrator**: Gestioneaza utilizatori cu numere indecente
- **Tema Vizuala**: Designul retro de tren cu culori calde

## Instalare

```bash
npm install
npx prisma migrate deploy
npm run dev
```

Accesare: http://localhost:3000

## Jocul - Fluxul

1. **Meniu Principal**: Alegi username si incepi
2. **Statiile Trenului**: Traversezi 7 statii (biserici) din Apocalipsa in ordine cronologica
3. **Quiz per Statie**: 2 intrebari per chiesa cu feedback instant (corect/incorect)
4. **Cronometru**: Se masoara de cand incepi pana cand termini
5. **Podium**: Vezi scorul final si te compari cu alti jucatori
6. **Admin Panel**: Conecta-te cu parola pentru a modera numere indecente (`ADMIN_SECRET`)

## Structura Bazei de Date

- **User**: Utilizatori inregistrati cu username, scor, timp, status
- **GameSession**: Blocul dispozitivelor - un utilizator per device, previne jocul multiplu
- **AdminUser**: Conturile de administrare (pentru viitor)

## Variabile de Mediu

```env
DATABASE_URL="postgresql://postgres:password@db.YOUR_PROJECT_REF.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:password@db.YOUR_PROJECT_REF.supabase.co:5432/postgres"
ADMIN_SECRET="schimba-parola"
```

## Deployment pe Vercel + Supabase

1. Creeaza un proiect in Supabase si copiaza connection strings (`DATABASE_URL` + `DIRECT_URL`).
2. In Vercel Project Settings → Environment Variables adauga:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `ADMIN_SECRET`
3. Build-ul ruleaza automat migrarile (`prisma migrate deploy`) si aplica schema.
4. Fa push pe `main` si redeploy din Vercel.

## Intrebari Quiz

Intrebarile sunt in [src/lib/quizData.ts](src/lib/quizData.ts). Fiecare chiesa are 2 intrebari.

## Componente Principale

- **Game.tsx**: Gameplay, cronometru, sina tren 🚂, quiz interactiv
- **Leaderboard.tsx**: Podium cu top 3 medalii + tabel complet
- **AdminPanel.tsx**: Moderare utilizatori, stergere din podium
- **Scene.tsx**: Background scenic cu animatii discrete

## Securitate

- Admin secret generat sigur pe Vercel
- Device ID persistent in localStorage (localStorage key: `bplgame_device_id`)
- Baza de date validata prin Prisma ORM
- Blocare stricta: un joc per device

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
