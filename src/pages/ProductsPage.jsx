import { useEffect, useRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { categories } from '../data/productCategories';
import CategoryHero from '../components/products/CategoryHero';
import CategoryCover from '../components/products/CategoryCover';
import VariantDetail from '../components/products/VariantDetail';
import ProductsCTA from '../components/products/ProductsCTA';
import usePageMeta from '../hooks/usePageMeta';

// One flat, ordered list of every product, so the detail arrows can run straight
// through the whole catalogue and cross into the next category instead of
// looping back to the first product of the one you're already in.
const catalogue = categories.flatMap((category) =>
  category.variants.map((variant) => ({ category, variant })),
);

export default function ProductsPage() {
  const { categorySlug, variantSlug } = useParams();
  const navigate = useNavigate();

  const activeCategory = categories.find((c) => c.id === categorySlug) ?? categories[0];
  const selectedVariant =
    activeCategory.variants.find((v) => v.id === variantSlug) ?? activeCategory.variants[0];

  usePageMeta(
    `${selectedVariant.name} — ${activeCategory.name}`,
    `${selectedVariant.name} from SLG — ${selectedVariant.tags?.join(' · ') || activeCategory.name}. Real specifications, get a quote or download the datasheet.`,
  );

  const detailRef = useRef(null);
  const scrollTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(scrollTimerRef.current), []);

  // Picking a card scrolls the detail panel into view once the new product has
  // rendered. Cancel any previous pending scroll first, so switching category
  // straight after a card click doesn't fight the reset-to-top that follows.
  const handleVariantSelect = (variant) => {
    navigate(`/products/${activeCategory.id}/${variant.id}`, { state: { preserveScroll: true } });
    clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleCategoryChange = (categoryId) => {
    clearTimeout(scrollTimerRef.current);
    const nextCategory = categories.find((c) => c.id === categoryId) ?? categories[0];
    navigate(`/products/${categoryId}/${nextCategory.variants[0].id}`);
  };

  // The arrows can hand back a product from a different category, so the target
  // category comes from the caller rather than being assumed to be the current one.
  const handleVariantNavigate = (variant, targetCategory = activeCategory) => {
    navigate(`/products/${targetCategory.id}/${variant.id}`, { state: { preserveScroll: true } });
  };

  const categoryExists = categories.some((c) => c.id === categorySlug);
  if (!categorySlug || !categoryExists) {
    return <Navigate to={`/products/${categories[0].id}/${categories[0].variants[0].id}`} replace />;
  }

  const variantExists = activeCategory.variants.some((v) => v.id === variantSlug);
  if (!variantSlug || !variantExists) {
    return <Navigate to={`/products/${activeCategory.id}/${activeCategory.variants[0].id}`} replace />;
  }

  return (
    <div className="products-page">
      <CategoryHero
        categories={categories}
        activeCategoryId={activeCategory.id}
        onCategoryChange={handleCategoryChange}
      />
      <CategoryCover
        key={activeCategory.id}
        category={activeCategory}
        selectedVariant={selectedVariant}
        onSelectVariant={handleVariantSelect}
      />
      <div ref={detailRef}>
        <VariantDetail
          key={activeCategory.id}
          variant={selectedVariant}
          category={activeCategory}
          variants={activeCategory.variants}
          catalogue={catalogue}
          onSelectVariant={handleVariantNavigate}
        />
      </div>
      <ProductsCTA />
    </div>
  );
}
