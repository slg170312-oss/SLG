export default function VariantDetail({ variant, category }) {
  if (!variant) return null;

  return (
    <section
      className="variant-detail animate-slide-up"
      style={{ '--category-accent': category.accent }}
    >
      <div className="variant-detail__inner container">
        <div className="variant-detail__left">
          <div className="variant-detail__image-wrap">
            <img src={variant.image} alt={variant.name} className="variant-detail__image" />
          </div>
          <div className="variant-detail__info">
            {variant.badge && (
              <span className="variant-detail__badge">{variant.badge}</span>
            )}
            <h3 className="variant-detail__name">{variant.name}</h3>
            <p className="variant-detail__category">{category.name} Range</p>
            <div className="variant-detail__tags">
              {variant.tags.map((tag) => (
                <span key={tag} className="variant-detail__tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="variant-detail__actions">
              <a href="#" className="btn btn--primary">
                GET QUOTE
              </a>
              <a href="#" className="btn btn--ghost-dark">
                DOWNLOAD DATASHEET
              </a>
            </div>
          </div>
        </div>

        <div className="variant-detail__right">
          <span className="section-label section-label--dark">Technical Specifications</span>
          <div className="spec-table">
            {variant.specs.map((spec, i) => (
              <div
                key={spec.label}
                className="spec-table__row animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="spec-table__label">{spec.label}</span>
                <span className="spec-table__value">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="variant-detail__cert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3l7 3v6c0 4.5-3.5 7.5-7 9-3.5-1.5-7-4.5-7-9V6l7-3z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>All products are ISO certified &amp; BIS compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
