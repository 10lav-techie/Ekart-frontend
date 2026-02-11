import { useNavigate } from "react-router-dom";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

/**
 * TEMP MOCK PRODUCT LIST
 * ---------------------
 * Will be fetched from backend later
 */
const mockProducts = [
  {
    id: "p1",
    name: "Amul Milk 500ml",
    price: 56,
    isNew: true,
    isTop: false,
  },
  {
    id: "p2",
    name: "Tata Salt",
    price: 28,
    isNew: false,
    isTop: true,
  },
  {
    id: "p3",
    name: "Fortune Oil",
    price: 165,
    isNew: false,
    isTop: false,
  },
];

const MyProducts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            My Products
          </h1>

          <Button
            size="sm"
            onClick={() => navigate("/seller/add-product")}
          >
            Add Product
          </Button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-soft overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="px-4 py-3 font-medium">
                  Product
                </th>
                <th className="px-4 py-3 font-medium">
                  Price
                </th>
                <th className="px-4 py-3 font-medium">
                  Tags
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {mockProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    {product.name}
                  </td>

                  <td className="px-4 py-3">
                    ₹{product.price}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {product.isNew && (
                        <Badge variant="new">New</Badge>
                      )}
                      {product.isTop && (
                        <Badge variant="top">
                          Top
                        </Badge>
                      )}
                      {!product.isNew &&
                        !product.isTop && (
                          <Badge>—</Badge>
                        )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/seller/edit-product/${product.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default MyProducts;
