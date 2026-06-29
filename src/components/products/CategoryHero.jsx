import { Link } from 'react-router-dom';
import CategoryIcon from '../../data/categoryIcons';

export default function CategoryHero({ categories, activeCategoryId, onCategoryChange }) {
  return (
    <section className="products-hero">
      <div className="products-hero__overlay" aria-hidden="true" />
      <div className="products-hero__grid" aria-hidden="true" />
      <div className="products-hero__content container">
        <nav className="products-hero__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">HOME</Link>
          <span className="products-hero__crumb-sep" aria-hidden="true">›</span>
          <span className="products-hero__crumb-current">PRODUCTS</span>
        </nav>
        <div className="products-hero__label">
          <span className="products-hero__label-line" />
          <span>INDUSTRIAL PRODUCT RANGE · SLG MOTORS</span>
          <span className="products-hero__label-line" />
        </div>
        <h1 className="products-hero__title">
          Our Product
          <br />
          <span className="products-hero__accent">Categories.</span>
        </h1>
        <p className="products-hero__description">
          Four industrial product lines — all engineered, assembled, and
          quality-certified at our facility in Coimbatore.
        </p>
      </div>
      <nav className="category-tabs" aria-label="Product categories">
        <div className="category-tabs__inner container">
          <span className="category-tabs__heading">Explore All Categories</span>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-tab ${activeCategoryId === category.id ? 'category-tab--active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
              style={{ '--tab-accent': category.accent }}
            >
              <span
                className="category-tab__bg"
                style={{ backgroundImage: `url(${category.coverImage})` }}
                aria-hidden="true"
              />
              <span className="category-tab__overlay" aria-hidden="true" />
              <span className="category-tab__content">
                <span className="category-tab__icon" aria-hidden="true">
                  <CategoryIcon id={category.id} />
                </span>
                <span className="category-tab__name">{category.shortName}</span>
              </span>
            </button>
          ))}
        </div>
      </nav>
    </section>
  );
}
