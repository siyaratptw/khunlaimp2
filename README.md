# Khunla IMP2 v2 Production

Stable Next.js + Supabase project. No Tailwind.

## Password
`imp2`

## Upload to GitHub Web
Upload these folders/files at the repository root:

- app/
- components/
- lib/
- public/
- package.json
- next.config.js
- tsconfig.json
- .gitignore
- .env.example
- README.md

## Vercel Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-publishable-key
```

## Supabase SQL

Run this in Supabase SQL Editor:

```sql
drop table if exists public.khunla_records;

create table public.khunla_records (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  employee_name text,
  event_type text,
  leave_mode text,
  start_date date,
  end_date date,
  days numeric,
  start_time text,
  end_time text,
  hours numeric,
  location text,
  reason text,
  status text default 'pending',
  created_by text
);

alter table public.khunla_records enable row level security;

create policy "Allow public read"
on public.khunla_records
for select
to anon
using (true);

create policy "Allow public insert"
on public.khunla_records
for insert
to anon
with check (true);

create policy "Allow public update"
on public.khunla_records
for update
to anon
using (true);

create policy "Allow public delete"
on public.khunla_records
for delete
to anon
using (true);
```
