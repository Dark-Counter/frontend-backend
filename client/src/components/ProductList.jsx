import ProductCard from './ProductCard'

export default function ProductList({ products, onEdit, onDelete }) {
  if (!products.length) {
    return <div className="empty">Товаров пока нет</div>
  }
  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
