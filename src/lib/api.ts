import { Category, Product } from "@/types";
import { initialCategories, initialProducts } from "@/data/mock-data";

const BASE_URL_PRIMARY = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_BACKUP = "https://api.abcz.workers.dev/api/bazardor";

async function fetchWithFallback<T>(endpoint: string): Promise<T | null> {
  const urls = [`${BASE_URL_PRIMARY}${endpoint}`, `${BASE_URL_BACKUP}${endpoint}`];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return data as T;
      }
    } catch {
      // Continue to backup URL
    }
  }

  return null;
}

export async function getCategories(): Promise<Category[]> {
  const remote = await fetchWithFallback<Category[]>("/categories");
  if (remote && Array.isArray(remote) && remote.length > 0) {
    return remote;
  }
  return initialCategories;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const endpoint = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const remote = await fetchWithFallback<Product[]>(endpoint);

  if (remote && Array.isArray(remote) && remote.length > 0) {
    return remote;
  }

  // Fallback to local mock data
  if (category) {
    return initialProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase() || p.slug === category
    );
  }
  return initialProducts;
}

export async function getProductBySlug(slugOrId: string | number): Promise<Product | null> {
  const endpoint = `/products/${slugOrId}`;
  const remote = await fetchWithFallback<Product>(endpoint);

  if (remote && remote.nameBn) {
    return remote;
  }

  // Fallback to local mock data
  const slugStr = slugOrId.toString().toLowerCase();
  const found = initialProducts.find(
    (p) => p.slug.toLowerCase() === slugStr || p.id.toString() === slugStr
  );

  return found || null;
}

export async function getTopRisers(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

export async function getTopFallers(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  return all
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}
