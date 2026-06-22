export default function ExploreCategories({ categories, activeCategoryId, onCategoryChange }) {
  return (
    <section className="explore-categories">
      <div className="explore-categories__inner container">
        <span className="section-label section-label--dark">Explore All Categories</span>
        <div className="explore-grid">
          {categories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={`explore-card animate-fade-up ${
                activeCategoryId === category.id ? 'explore-card--active' : ''
              }`}
              style={{
                '--category-accent': category.accent,
                animationDelay: `${index * 100}ms`,
              }}
              onClick={() => {
                onCategoryChange(category.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div
                className="explore-card__bg"
                style={{ backgroundImage: `url(${category.coverImage})` }}
                aria-hidden="true"
              />
              <div className="explore-card__overlay" aria-hidden="true" />
              <div className="explore-card__content">
                <span className="explore-card__icon">{category.icon}</span>
                <h3 className="explore-card__name">{category.name}</h3>
                <p className="explore-card__count">
                  {category.variants.length} Models Available
                </p>
                <span className="explore-card__link">
                  VIEW RANGE
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M6 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {activeCategoryId === category.id && (
                  <span className="explore-card__active-badge">ACTIVE</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
