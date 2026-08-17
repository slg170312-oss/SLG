import { useRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { categories } from '../data/productCategories';
import CategoryHero from '../components/products/CategoryHero';
import CategoryCover from '../components/products/CategoryCover';
import VariantDetail from '../components/products/VariantDetail';
import ProductsCTA from '../components/products/ProductsCTA';
import usePageMeta from '../hooks/usePageMeta';

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

  const handleCategoryChange = (categoryId) => {
    const nextCategory = categories.find((c) => c.id === categoryId) ?? categories[0];
    navigate(`/products/${categoryId}/${nextCategory.variants[0].id}`);
  };

  const detailRef = useRef(null);

  const handleVariantSelect = (variant) => {
    navigate(`/products/${activeCategory.id}/${variant.id}`);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleVariantNavigate = (variant) => {
    navigate(`/products/${activeCategory.id}/${variant.id}`);
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
          onSelectVariant={handleVariantNavigate}
        />
      </div>
      <ProductsCTA />
    </div>
  );
}
