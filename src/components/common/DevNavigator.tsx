import { Link } from "react-router-dom";

const DevNavigator = () => {
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-soft rounded-lg p-3 text-xs z-50">
      <p className="font-semibold mb-2">Dev Navigation</p>

      <div className="space-y-1">
        <Link to="/" className="block text-accent">Login</Link>
        <Link to="/signup" className="block text-accent">Signup</Link>
        <Link to="/buyer/home" className="block text-accent">Buyer Home</Link>
        <Link to="/buyer/search?query=milk" className="block text-accent">Search</Link>
        <Link to="/buyer/product/p1" className="block text-accent">Product</Link>
        <Link to="/buyer/shop/1" className="block text-accent">Shop</Link>
        <Link to="/seller/dashboard" className="block text-accent">Seller Dashboard</Link>
        <Link to="/seller/add-product" className="block text-accent">Add Product</Link>
        <Link to="/seller/products" className="block text-accent">My Products</Link>
      </div>
    </div>
  );
};

export default DevNavigator;
