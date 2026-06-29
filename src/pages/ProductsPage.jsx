import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categories } from '../data/productCategories';
import CategoryHero from '../components/products/CategoryHero';
import CategoryCover from '../components/products/CategoryCover';
import VariantDetail from '../components/products/VariantDetail';
import ProductsCTA from '../components/products/ProductsCTA';
import usePageMeta from '../hooks/usePageMeta';

export default function ProductsPage() {
  usePageMeta(
    'Products',
    'Browse the SLG Motors industrial range — AC induction, servo, BLDC, flameproof and brake motors, borewell pumps, air compressors and car & bike wash systems.',
  );

  const [searchParams] = useSearchParams();
  const paramCategory = categories.find((c) => c.id === searchParams.get('category'));
  const initialCategory = paramCategory ?? categories[0];

  const [activeCategoryId, setActiveCategoryId] = useState(initialCategory.id);
  const [selectedVariant, setSelectedVariant] = useState(initialCategory.variants[0]);

  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];

  const handleCategoryChange = (categoryId) => {
    setActiveCategoryId(categoryId);
    const nextCategory = categories.find((c) => c.id === categoryId) ?? categories[0];
    setSelectedVariant(nextCategory.variants[0]);
  };

  const detailRef = useRef(null);

  const handleVariantSelect = (variant) => {
    const next = selectedVariant?.id === variant.id ? null : variant;
    setSelectedVariant(next);
    if (next) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  };

  return (
    <div className="products-page">
      <CategoryHero
        categories={categories}
        activeCategoryId={activeCategoryId}
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
          onSelectVariant={setSelectedVariant}
        />
      </div>
      <ProductsCTA />
    </div>
  );
}
