import Badge from "../common/Badge";
import Button from "../common/Button";

interface Props {
  name: string;
  price: number;
  tag?: "new" | "top";
}

const ProductCard = ({ name, price, tag }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft hover:shadow-xl transition p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{name}</h3>
        {tag && (
          <Badge variant={tag}>
            {tag === "new" ? "New" : "Top"}
          </Badge>
        )}
      </div>

      <p className="text-lg font-bold mb-4">
        ₹{price}
      </p>

      <Button variant="outline" size="sm" fullWidth>
        View Details
      </Button>
    </div>
  );
};

export default ProductCard;
