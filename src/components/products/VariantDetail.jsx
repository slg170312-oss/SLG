import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useEnquiry } from '../../context/EnquiryContext';

export default function VariantDetail({
  variant,
  category,
  variants = [],
  catalogue = [],
  onSelectVariant,
}) {
  const { openEnquiry } = useEnquiry();
  const [slideDir, setSlideDir] = useState(null);
  const [activeImage, setActiveImage] = useState(variant?.image);

  // The photo swap is deferred 250ms so the outgoing image can slide away first.
  // Both refs track that in-flight step: the timer so it can be cancelled, and
  // the destination so a click landing mid-slide advances from where we're
  // heading rather than from what's still on screen.
  const timerRef = useRef(null);
  const pendingRef = useRef(null);

  const currentIndex = variants.findIndex((v) => v.id === variant?.id);
  const galleryImages = variant ? [variant.image, ...(variant.gallery || [])] : [];

  // A pending slide must not outlive the component. Without this, clicking an
  // arrow and then switching category fires onSelectVariant 250ms later and drags
  // the user back to the category they just left.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // When the product changes from outside (a card in the grid above, or the back
  // button), drop any in-flight slide and show the new product's first photo.
  // Arrow/dot navigation sets the photo itself, so the includes() check leaves
  // that choice untouched and avoids a late-effect clobber.
  useEffect(() => {
    if (!variant) return;
    clearTimeout(timerRef.current);
    pendingRef.current = null;
    setSlideDir(null);
    const images = [variant.image, ...(variant.gallery || [])];
    setActiveImage((curr) => (images.includes(curr) ? curr : images[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant?.id]);

  // Starts a slide, replacing any step still in flight — so rapid clicks collapse
  // into a single swap at the final destination instead of fighting each other.
  const slideTo = useCallback(
    (nextVariant, nextCategory, image, dir) => {
      pendingRef.current = { variant: nextVariant, category: nextCategory, image };
      clearTimeout(timerRef.current);
      setSlideDir(dir > 0 ? 'left' : 'right');
      timerRef.current = setTimeout(() => {
        if (nextVariant) onSelectVariant?.(nextVariant, nextCategory ?? category);
        setActiveImage(image);
        setSlideDir(null);
        pendingRef.current = null;
      }, 250);
    },
    [onSelectVariant, category],
  );

  // Dots pick a product within the current category.
  const goToVariant = useCallback(
    (nextVariant, dir) => {
      slideTo(nextVariant, category, nextVariant.image, dir);
    },
    [slideTo, category],
  );

  // The arrows step through every photo of the current product, then on to the
  // next product in the catalogue — running past the end of a category into the
  // start of the next one, and wrapping round at the very end of the range.
  const navigate = useCallback(
    (dir) => {
      const pending = pendingRef.current;
      const fromVariant = pending?.variant ?? variant;
      const fromCategory = pending?.category ?? category;
      const images = [fromVariant.image, ...(fromVariant.gallery || [])];
      const imgIdx = Math.max(0, images.indexOf(pending?.image ?? activeImage));

      // Another photo of this product to show before moving on. Carry the pending
      // target through, or its navigation would be dropped along with its timer.
      if (dir > 0 && imgIdx < images.length - 1) {
        slideTo(pending?.variant ?? null, pending?.category ?? null, images[imgIdx + 1], 1);
        return;
      }
      if (dir < 0 && imgIdx > 0) {
        slideTo(pending?.variant ?? null, pending?.category ?? null, images[imgIdx - 1], -1);
        return;
      }
      if (catalogue.length < 2) return;

      const fromIndex = catalogue.findIndex(
        (entry) => entry.variant.id === fromVariant.id && entry.category.id === fromCategory.id,
      );
      const next = catalogue[(fromIndex + dir + catalogue.length) % catalogue.length];
      const nextImages = [next.variant.image, ...(next.variant.gallery || [])];
      // Stepping backwards lands on the previous product's last photo, so the
      // sequence reads the same in both directions.
      slideTo(
        next.variant,
        next.category,
        dir > 0 ? nextImages[0] : nextImages[nextImages.length - 1],
        dir,
      );
    },
    [activeImage, variant, category, catalogue, slideTo],
  );

  if (!variant) return null;

  const phaseSpec = category.generalSpecs?.tables.find((t) => variant.tags?.includes(t.phase));

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
              alt={variant.imageAlt || variant.name}
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
                        goToVariant(v, i > currentIndex ? 1 : -1);
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
          {phaseSpec ? (
            <>
              <span className="section-label section-label--dark">Technical Specifications</span>
              <div className="model-table-wrap">
                <table className="model-table model-table--kv">
                  <caption className="model-table__caption">{phaseSpec.title}</caption>
                  <tbody>
                    {phaseSpec.rows.map((spec) => (
                      <tr key={spec.label}>
                        <td className="model-table__kv-label">{spec.label}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Link to="/custom" className="variant-detail__standards-link">
                See our quality &amp; compliance standards →
              </Link>
            </>
          ) : variant.specs?.length > 0 || variant.specTable ? (
            <>
              <span className="section-label section-label--dark">Technical Specifications</span>
              {variant.specs?.length > 0 && category.specsAsTable && (
                <div className="model-table-wrap">
                  <table className="model-table model-table--kv">
                    <caption className="model-table__caption">{variant.name}</caption>
                    <tbody>
                      {variant.specs.map((spec) => (
                        <tr key={spec.label}>
                          <td className="model-table__kv-label">{spec.label}</td>
                          <td>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {variant.specs?.length > 0 && !category.specsAsTable && (
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
              )}
              {variant.specTable && (
                <div className="model-table-wrap">
                  <table className="model-table">
                    <caption className="model-table__caption">{variant.specTable.title}</caption>
                    <thead>
                      <tr>
                        <th rowSpan={2}>Model</th>
                        <th rowSpan={2}>
                          Motor Power
                          <span className="model-table__unit">HP</span>
                        </th>
                        <th colSpan={2}>Free Air Delivery</th>
                        <th colSpan={2}>Maximum Pressure</th>
                        <th rowSpan={2}>
                          Tank Capacity
                          <span className="model-table__unit">Ltr</span>
                        </th>
                      </tr>
                      <tr>
                        <th className="model-table__subhead">LPM</th>
                        <th className="model-table__subhead">CFM</th>
                        <th className="model-table__subhead">Kg/Cm²</th>
                        <th className="model-table__subhead">PSI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variant.specTable.rows.map((row) => (
                        <tr key={row.model}>
                          <td>{row.model}</td>
                          <td>{row.hp}</td>
                          <td>{row.lpm}</td>
                          <td>{row.cfm}</td>
                          <td>{row.kgcm2}</td>
                          <td>{row.psi}</td>
                          <td>{row.tank}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            variant.note && <p className="variant-detail__note">{variant.note}</p>
          )}
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
