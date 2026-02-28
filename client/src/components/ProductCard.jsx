export default function ProductCard({ product, onEdit, onDelete }) {
  const imageUrl = product.image
    ? (product.image.startsWith('http') ? product.image : `http://localhost:3000${product.image}`)
    : null

  return (
    <div className="product-card">
      {imageUrl && (
        <div className="product-card__image-wrap">
          <img src={imageUrl} alt={product.name} className="product-card__image" />
        </div>
      )}
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__meta">
          <span className="product-card__price">{product.price.toLocaleString('ru-RU')} ₽</span>
          <span className="product-card__stock">В наличии: {product.stock}</span>
          {product.rating != null && (
            <span className="product-card__rating">★ {product.rating}</span>
          )}
        </div>
        <div className="product-card__actions">
          <button type="button" className="btn btn--primary" onClick={() => onEdit(product)}>
            Редактировать
          </button>
          <button type="button" className="btn btn--danger" onClick={() => onDelete(product.id)}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
