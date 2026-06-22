import { useState, useRef } from 'react';
import { categories } from '../data/productCategories';
import CategoryHero from '../components/products/CategoryHero';
import CategoryCover from '../components/products/CategoryCover';
import VariantDetail from '../components/products/VariantDetail';
import ExploreCategories from '../components/products/ExploreCategories';
import ProductsCTA from '../components/products/ProductsCTA';

export default function ProductsPage() {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);
  const [selectedVariant, setSelectedVariant] = useState(categories[0].variants[0]);

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
          key={selectedVariant?.id ?? 'none'}
          variant={selectedVariant}
          category={activeCategory}
        />
      </div>
      <ExploreCategories
        categories={categories}
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
      />
      <ProductsCTA />
    </div>
  );
}
