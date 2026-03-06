import { useContext } from "react";
import Modal from "./UI/Modal";
import { UIContext } from "../contexts/UIContext";
import { CartContext } from "../contexts/CartContext";
import useFetch from "../hooks/useFetch";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { uiProgress, hideCheckout } = useContext(UIContext);
  const { items, clearItems } = useContext(CartContext);

  const { data, isLoading, error, SendRequest } = useFetch(
    "http://localhost:3000/orders",
    config
  );

  function handleClose() {
    hideCheckout();
    clearItems();
  }

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());

    SendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );

    // fetch("http://localhost:3000/orders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body:
    // });
  }

  if (data && !error) {
    return (
      <Modal open={uiProgress === "checkout"}>
        <h2>Sipariş Alındı.</h2>
        <button
          className="btn btn-sm btn-outline-danger me-2"
          onClick={handleClose}
        >
          Kapat
        </button>
      </Modal>
    );
  }

  return (
    <Modal open={uiProgress === "checkout"}>
      <h2>Checkout</h2>
      <p>Sipariş Toplam: {cartTotal} ₺</p>
      <form className="mb-3" onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Ad Soyad
          </label>
          <input type="text" name="name" id="name" className="form-control" />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="phone" className="form-label">
              Telefon Numarası
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea
            name="address"
            id="address"
            className="form-control"
          ></textarea>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="city" className="form-label">
              Şehir
            </label>
            <input type="text" name="city" id="city" className="form-control" />
          </div>
          <div className="col">
            <label htmlFor="district" className="form-label">
              İlçe
            </label>
            <input
              type="text"
              name="district"
              id="district"
              className="form-control"
            />
          </div>
        </div>
        {isLoading ? (
          <div className="alert alert-warning">Yükleniyor...</div>
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={hideCheckout}
            >
              Kapat
            </button>
            <button type="submit" className="btn btn-sm btn-primary me-2">
              Kaydet
            </button>
          </>
        )}
      </form>
    </Modal>
  );
}
