import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  seller: {
    shopName: string;
    city: string;
    area: string;
    address: string;
  };
}

const ShopPage = () => {
  const { sellerId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchShop = async () => {
      const { data } = await API.get(
        `/products/shop/${sellerId}`
      );
      setProducts(data);
    };

    fetchShop();
  }, [sellerId]);

  if (!products.length) return <p className="p-10">Loading...</p>;

  const shop = products[0].seller;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-2">
        {shop.shopName}
      </h2>
      <p className="text-slate-500 mb-8">
        {shop.city}, {shop.area}
      </p>
      <p className="text-slate-500 mb-8">
        {shop.address}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl p-5 shadow-sm"
          >
            <h3 className="font-semibold text-lg">
              {product.name}
            </h3>
            <p className="text-slate-600 mb-2">
              ₹{product.price}
            </p>
            {product.description && (
              <p className="text-sm text-slate-500">
                {product.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
