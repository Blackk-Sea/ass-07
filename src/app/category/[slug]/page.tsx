import Navbar from "@/components/layout/Navbar";
import PriceTicker from "@/components/layout/PriceTicker";
import Footer from "@/components/layout/Footer";
import CategoryView from "@/components/category/CategoryView";
import { getCategories, getProducts } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [categories, allProducts, categoryProducts] = await Promise.all([
    getCategories(),
    getProducts(),
    getProducts(slug),
  ]);

  const currentCategory = categories.find((c) => c.slug === slug) || null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar categories={categories} />
      <PriceTicker products={allProducts} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
        <CategoryView category={currentCategory} products={categoryProducts} />
      </main>

      <Footer />
    </div>
  );
}
