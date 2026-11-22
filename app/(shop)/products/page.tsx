import { Suspense } from 'react';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { ProductCard } from '@/components/ui/productCard';
import { ProductCardSkeleton } from '@/components/ui/productCardSkeleton';
import { ProductsPagination } from '@/components/ui/productsPagination';
import { ActiveFilters } from '@/components/ui/activeFilters';
import { SortSelect } from '@/components/ui/sortSelect';
import { API_URL, DEFAULT_SORT } from '@/lib/constants';
import { ProductsResponse } from '@/types/products';

const MOBILE_LIMIT = 10;
const DESKTOP_LIMIT = 20;

// The catalogue may lag behind admin edits by up to this many seconds.
// Product pages, cart and checkout keep reading live data.
const REVALIDATE_SECONDS = 60;

const GRID_CLASS =
  'grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 min-[440px]:gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-12';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const firstValue = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? '';

const fetchProducts = async (
  query: string
): Promise<ProductsResponse | null> => {
  try {
    const res = await fetch(`${API_URL}/products?${query}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as ProductsResponse;
  } catch {
    return null;
  }
};

const ProductsList = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const data = await fetchProducts(query);

  if (!data) return <p className='text-center mt-12'>Ошибка загрузки</p>;
  if (data.products.length === 0)
    return <p className='text-center mt-12'>Ничего не найдено</p>;

  return (
    <>
      <div className={GRID_CLASS}>
        {data.products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {data.totalPages > 1 && (
        <ProductsPagination page={page} totalPages={data.totalPages} />
      )}
    </>
  );
};

// Rendered on the server: products are in the initial HTML, so they show up
// before any JS loads and are visible to search engines.
export default async function Products({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const brand = firstValue(params.brand);
  const category = firstValue(params.category);
  const searchTerm = firstValue(params.q);
  const sort = firstValue(params.sort) || DEFAULT_SORT;
  const page = Math.max(1, Math.floor(Number(firstValue(params.page)) || 1));

  // The viewport is unknown on the server, so pick the page size by device.
  const { device } = userAgent({ headers: await headers() });
  const limit = device.type === 'mobile' ? MOBILE_LIMIT : DESKTOP_LIMIT;

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });
  if (brand) query.set('brand', brand);
  if (category) query.set('category', category);
  if (searchTerm) query.set('q', searchTerm);

  return (
    <>
      {searchTerm && (
        <h2 className='text-center text-lg font-medium mt-6'>
          Результаты поиска: &quot;{searchTerm}&quot;
        </h2>
      )}

      <div className='flex flex-wrap items-center gap-3 mt-6'>
        <ActiveFilters />
        <SortSelect />
      </div>

      {/* A new key per query shows the skeleton while a new page/filter loads. */}
      <Suspense
        key={query.toString()}
        fallback={
          <div className={GRID_CLASS}>
            {Array.from({ length: limit }).map((_key, index) => (
              <ProductCardSkeleton key={index} variant='card' />
            ))}
          </div>
        }
      >
        <ProductsList query={query.toString()} page={page} />
      </Suspense>
    </>
  );
}
