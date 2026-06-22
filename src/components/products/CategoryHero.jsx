export default function CategoryHero({ categories, activeCategoryId, onCategoryChange }) {
  return (
    <section className="products-hero">
      <div className="products-hero__overlay" aria-hidden="true" />
      <div className="products-hero__grid" aria-hidden="true" />
      <div className="products-hero__content container">
        <h1 className="products-hero__title">
          Our Product Categories<span className="products-hero__dot">.</span>
        </h1>
        <p className="products-hero__description">
          Explore SLG&apos;s complete range of electric motors, pumps, air compressors, and
          vehicle wash systems — engineered for Indian industrial conditions.
        </p>
      </div>
      <nav className="category-tabs" aria-label="Product categories">
        <div className="category-tabs__inner container">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-tab ${activeCategoryId === category.id ? 'category-tab--active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
              style={{ '--tab-accent': category.accent }}
            >
              <span className="category-tab__icon" aria-hidden="true">
                {category.icon}
              </span>
              <span className="category-tab__name">{category.shortName}</span>
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}
