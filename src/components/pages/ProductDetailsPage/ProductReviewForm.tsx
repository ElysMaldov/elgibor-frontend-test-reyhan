import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { addReview } from "@/lib/store/reducers/product-reviews";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";
import { nanoid } from "nanoid";

const formSchema = z.object({
  name: z.string().min(2, "Name is required").max(50),
  email: z.email("Invalid email address"),
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().optional(),
});

export interface ProductReviewFormProps {
  productId: string;
  onReviewSubmit: () => void;
}

const ProductReviewForm = ({
  productId,
  onReviewSubmit,
}: ProductReviewFormProps) => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      dispatch(
        addReview({
          productId,
          review: {
            ...values,
            date: new Date().toISOString(),
            id: nanoid(),
          },
        }),
      );

      toast.success("Thank you for your review!");

      onReviewSubmit();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit your review. Please try again later.");
    }
  };

  const renderRatingStars = (
    rating: number,
    onRatingChange: (rating: number) => void,
  ) => {
    return (
      <section className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          </button>
        ))}
      </section>
    );
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Write Your Review</h3>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Your name will be displayed in the reviews
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We will not share your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Rating <RequiredAsterisk />
                  </FormLabel>
                  <FormControl>
                    {renderRatingStars(field.value, (rating) =>
                      form.setValue("rating", rating),
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      id="comment"
                      data-testid="comment"
                      placeholder="Share your thoughts about this product..."
                      {...field}
                      className="mt-1"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!form.formState.isValid}
            >
              Submit Review
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductReviewForm;

const RequiredAsterisk = () => <span className="-ml-1.5 text-red-500">*</span>;
