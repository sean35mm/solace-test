import db from '../../../db';
import { advocates as advocatesTable } from '../../../db/schema';
import { advocateData } from '../../../db/seed/advocates';

type SortField =
  | 'firstName'
  | 'lastName'
  | 'city'
  | 'degree'
  | 'yearsOfExperience'
  | 'phoneNumber';

const ALLOWED_SORT_FIELDS: SortField[] = [
  'lastName',
  'firstName',
  'city',
  'degree',
  'yearsOfExperience',
  'phoneNumber',
];

export async function GET(request: Request) {
  // Uncomment this block when switching to database
  // const allData = await db.select().from(advocatesTable);

  const url = new URL(request.url);
  const params = url.searchParams;

  const q = (params.get('q') ?? '').trim().toLowerCase();
  const pageRaw = params.get('page') ?? '1';
  const pageSizeRaw = params.get('pageSize') ?? '20';
  const sortRaw = (params.get('sort') as SortField | null) ?? 'lastName';
  const orderRaw = (params.get('order') ?? 'asc').toLowerCase();

  const page = Number(pageRaw);
  const pageSize = Number(pageSizeRaw);
  const sort: SortField = ALLOWED_SORT_FIELDS.includes(sortRaw)
    ? sortRaw
    : 'lastName';
  const order: 'asc' | 'desc' = orderRaw === 'desc' ? 'desc' : 'asc';

  if (!Number.isFinite(page) || page < 1) {
    return new Response(JSON.stringify({ error: 'Invalid page' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }
  if (!Number.isFinite(pageSize) || pageSize < 1 || pageSize > 100) {
    return new Response(JSON.stringify({ error: 'Invalid pageSize' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const source = advocateData; // replace with allData when DB enabled

  const filtered = !q
    ? source
    : source.filter((adv) => {
        const first = adv.firstName.toLowerCase();
        const last = adv.lastName.toLowerCase();
        const city = adv.city.toLowerCase();
        const degree = adv.degree.toLowerCase();
        const specialtiesJoined = adv.specialties.join(' ').toLowerCase();
        const years = String(adv.yearsOfExperience);
        const phone = String(adv.phoneNumber);
        return (
          first.includes(q) ||
          last.includes(q) ||
          city.includes(q) ||
          degree.includes(q) ||
          specialtiesJoined.includes(q) ||
          years.includes(q) ||
          phone.includes(q)
        );
      });

  const sorted = filtered.slice().sort((a, b) => {
    const dir = order === 'asc' ? 1 : -1;
    const av = a[sort];
    const bv = b[sort];
    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * dir;
    }
    return String(av).localeCompare(String(bv)) * dir;
  });

  const total = sorted.length;
  const start = (page - 1) * pageSize;
  const data = sorted.slice(start, start + pageSize);

  return Response.json({ data, total, page, pageSize, sort, order });
}
