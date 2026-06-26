import { useState, useCallback } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';

export default function VariantDetail({ variant, category, variants = [], onSelectVariant }) {
  const { openEnquiry } = useEnquiry();
  const [slideDir, setSlideDir] = useState(null);

  const currentIndex = variants.findIndex((v) => v.id === variant?.id);

  const navigate = useCallback(
    (dir) => {
      const nextIndex = currentIndex + dir;
      if (nextIndex < 0 || nextIndex >= variants.length) return;
      setSlideDir(dir > 0 ? 'left' : 'right');
      setTimeout(() => {
        onSelectVariant?.(variants[nextIndex]);
        setSlideDir(null);
      }, 250);
    },
    [currentIndex, variants, onSelectVariant],
  );

  if (!variant) return null;

  const handleDownloadDatasheet = async () => {
    const { downloadDatasheet } = await import('../../utils/datasheet');
    downloadDatasheet(variant, category);
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < variants.length - 1;

  return (
    <section
      className="variant-detail animate-slide-up"
      style={{ '--category-accent': category.accent }}
    >
      <div className="variant-detail__inner container">
        <div className="variant-detail__left">
          <div className="variant-detail__image-wrap">
            <img
              src={variant.image}
              alt={variant.name}
              className={`variant-detail__image ${slideDir ? `slide-out-${slideDir}` : 'slide-in'}`}
            />
            {variants.length > 1 && (
              <>
                <button
                  type="button"
                  className={`variant-nav variant-nav--prev ${!hasPrev ? 'variant-nav--disabled' : ''}`}
                  onClick={() => navigate(-1)}
                  disabled={!hasPrev}
                  aria-label="Previous variant"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className={`variant-nav variant-nav--next ${!hasNext ? 'variant-nav--disabled' : ''}`}
                  onClick={() => navigate(1)}
                  disabled={!hasNext}
                  aria-label="Next variant"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <div className="variant-dots">
                  {variants.map((v, i) => (
                    <button
                      key={v.id}
                      type="button"
                      className={`variant-dot ${i === currentIndex ? 'variant-dot--active' : ''}`}
                      onClick={() => {
                        if (i === currentIndex) return;
                        setSlideDir(i > currentIndex ? 'left' : 'right');
                        setTimeout(() => {
                          onSelectVariant?.(v);
                          setSlideDir(null);
                        }, 250);
                      }}
                      aria-label={`View ${v.name}`}
                    />
                  ))}
                </div>
              </>
            )}
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
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => openEnquiry(category.name)}
              >
                GET QUOTE
              </button>
              <button
                type="button"
                className="btn btn--ghost-dark"
                onClick={handleDownloadDatasheet}
              >
                DOWNLOAD DATASHEET
              </button>
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
