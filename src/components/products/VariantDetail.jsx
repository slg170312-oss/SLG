import { useState, useCallback, useEffect } from 'react';
import { useEnquiry } from '../../context/EnquiryContext';

export default function VariantDetail({ variant, category, variants = [], onSelectVariant }) {
  const { openEnquiry } = useEnquiry();
  const [slideDir, setSlideDir] = useState(null);
  const [activeImage, setActiveImage] = useState(variant?.image);

  const currentIndex = variants.findIndex((v) => v.id === variant?.id);
  const galleryImages = variant ? [variant.image, ...(variant.gallery || [])] : [];

  // When the product is changed from outside (a card in the grid above), show its
  // first photo. Arrow/dot navigation sets the photo itself, so the includes()
  // check leaves that choice untouched and avoids a late-effect clobber.
  useEffect(() => {
    if (!variant) return;
    const images = [variant.image, ...(variant.gallery || [])];
    setActiveImage((curr) => (images.includes(curr) ? curr : images[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant?.id]);

  const goToVariant = useCallback(
    (nextVariant, dir, startAtLast) => {
      const images = [nextVariant.image, ...(nextVariant.gallery || [])];
      setSlideDir(dir > 0 ? 'left' : 'right');
      setTimeout(() => {
        onSelectVariant?.(nextVariant);
        setActiveImage(startAtLast ? images[images.length - 1] : images[0]);
        setSlideDir(null);
      }, 250);
    },
    [onSelectVariant],
  );

  const stepImage = useCallback((image, dir) => {
    setSlideDir(dir > 0 ? 'left' : 'right');
    setTimeout(() => {
      setActiveImage(image);
      setSlideDir(null);
    }, 250);
  }, []);

  // The arrows step through every photo of the current product first, then move
  // on to the next/previous product — wrapping around at the very ends.
  const navigate = useCallback(
    (dir) => {
      const imgIdx = Math.max(0, galleryImages.indexOf(activeImage));
      if (dir > 0) {
        if (imgIdx < galleryImages.length - 1) {
          stepImage(galleryImages[imgIdx + 1], 1);
        } else if (variants.length > 1) {
          const nextIndex = (currentIndex + 1) % variants.length;
          goToVariant(variants[nextIndex], 1, false);
        }
      } else if (imgIdx > 0) {
        stepImage(galleryImages[imgIdx - 1], -1);
      } else if (variants.length > 1) {
        const prevIndex = (currentIndex - 1 + variants.length) % variants.length;
        goToVariant(variants[prevIndex], -1, true);
      }
    },
    [activeImage, galleryImages, currentIndex, variants, goToVariant, stepImage],
  );

  if (!variant) return null;

  const handleDownloadDatasheet = async () => {
    const { downloadDatasheet } = await import('../../utils/datasheet');
    downloadDatasheet(variant, category);
  };

  return (
    <section
      className="variant-detail animate-slide-up"
      style={{ '--category-accent': category.accent }}
    >
      <div className="variant-detail__inner container">
        <div className="variant-detail__left">
          <div className="variant-detail__image-wrap">
            <img
              src={activeImage}
              alt={variant.name}
              className={`variant-detail__image ${slideDir ? `slide-out-${slideDir}` : 'slide-in'}`}
            />
            {variants.length > 1 && (
              <>
                <button
                  type="button"
                  className="variant-nav variant-nav--prev"
                  onClick={() => navigate(-1)}
                  aria-label="Previous photo or product"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  type="button"
                  className="variant-nav variant-nav--next"
                  onClick={() => navigate(1)}
                  aria-label="Next photo or product"
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
                        goToVariant(v, i > currentIndex ? 1 : -1, false);
                      }}
                      aria-label={`View ${v.name}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {galleryImages.length > 1 && (
            <div className="variant-thumbs">
              {galleryImages.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  className={`variant-thumb ${img === activeImage ? 'variant-thumb--active' : ''}`}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View photo ${i + 1} of ${variant.name}`}
                >
                  <img src={img} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}
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
          <div className="spec-table" key={variant.id}>
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
