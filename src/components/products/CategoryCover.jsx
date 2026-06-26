import CategoryIcon from '../../data/categoryIcons';

export default function CategoryCover({ category, selectedVariant, onSelectVariant }) {
  return (
    <section
      className="category-cover"
      style={{ '--category-accent': category.accent }}
    >
      <div
        className="category-cover__bg"
        style={{ backgroundImage: `url(${category.coverImage})` }}
        aria-hidden="true"
      />
      <div className="category-cover__dim" aria-hidden="true" />
      <div className="category-cover__tint" aria-hidden="true" />

      <div className="category-cover__inner container">
        <div className="category-cover__header animate-fade-up">
          <span className="section-label">{category.label}</span>
          <h2 className="category-cover__title">{category.title}</h2>
          <p className="category-cover__desc">{category.description}</p>
          <span className="category-cover__badge">
            <CategoryIcon id={category.id} className="category-cover__badge-icon" />
            {category.shortName}
          </span>
        </div>

        <div className="variant-grid">
          {category.variants.map((variant, index) => (
            <button
              key={variant.id}
              type="button"
              className={`variant-card animate-fade-up ${
                selectedVariant?.id === variant.id ? 'variant-card--selected' : ''
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => onSelectVariant(variant)}
            >
              <div className="variant-card__image-wrap">
                <img src={variant.image} alt={variant.name} className="variant-card__image" />
                {variant.badge && (
                  <span className="variant-card__badge">{variant.badge}</span>
                )}
              </div>
              <div className="variant-card__body">
                <h3 className="variant-card__name">{variant.name}</h3>
                <div className="variant-card__tags">
                  {variant.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="variant-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="variant-card__hover-glow" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
