import { Button } from "@/components/ui/shadcn/button";
import type { RootState } from "@/lib/store";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/store/reducers/wishlist";
import { selectIsInWishlist } from "@/lib/store/reducers/wishlist/selectors";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export interface AddToWishlistButtonProps {
  productId: string;
}

const AddToWishlistButton = ({ productId }: AddToWishlistButtonProps) => {
  const dispatch = useDispatch();
  const isWishlisted = useSelector((state: RootState) =>
    selectIsInWishlist(state, productId),
  );

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeFromWishlist(productId));
      toast("Product removed from your wishlist");
    } else {
      dispatch(addToWishlist(productId));
      toast("Product added to your wishlist");
    }
  };

  return (
    <Button
      onClick={handleWishlistToggle}
      variant={isWishlisted ? "default" : "outline"}
      size="lg"
      className="flex-1"
    >
      <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
      {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default AddToWishlistButton;
