export default function Pizza({ imgSrc, title, description, price }) {
  return (
    <div className="col">
      <div className="card item">
        <img
          src={`http://localhost:3000/images/${imgSrc}`}
          alt={title}
          className="card-img-top p-2 p-md-3 border-bottom"
        />
        <div className="card-body">
          <h3 className="card-title">{title}</h3>
          <p className="card-text">{description}</p>
          <div className="item-price">
            <b>{price} ₺</b>
            <button className="btn btn-sm btn-danger">Sepete Ekle</button>
          </div>
        </div>
      </div>
    </div>
  );
}
