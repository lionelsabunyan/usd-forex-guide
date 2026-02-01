import { useState } from "react";
import { Star, Send, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { reviewStore } from "@/lib/adminStore";

type ReviewFormProps = {
  brokerName: string;
  brokerId: string;
};

const ReviewForm = ({ brokerName, brokerId }: ReviewFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    title: "",
    review: "",
    location: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to local store
      reviewStore.add({
        brokerId,
        brokerName,
        authorName: formData.name,
        authorEmail: formData.email,
        rating: formData.rating,
        title: formData.title,
        review: formData.review,
        pros: "",
        cons: "",
      });

      // Small delay for UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsSubmitting(false);
      toast({
        title: "Review Submitted!",
        description: "Thank you for your review. It will be reviewed before publication.",
      });
      setFormData({
        name: "",
        email: "",
        rating: 0,
        title: "",
        review: "",
        location: "",
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  return (
    <Card className="bg-gradient-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          Write a Review for {brokerName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="review-name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="review-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="review-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-location">Location (Optional)</Label>
            <Input
              id="review-location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State, USA"
            />
          </div>

          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      rating <= (hoveredRating || formData.rating)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  {formData.rating} out of 5
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-title">Review Title</Label>
            <Input
              id="review-title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief summary of your experience"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-text">Your Review</Label>
            <Textarea
              id="review-text"
              name="review"
              required
              value={formData.review}
              onChange={handleChange}
              placeholder="Share your experience with this broker..."
              rows={6}
            />
          </div>

          <Button
            type="submit"
            variant="hero"
            className="w-full"
            disabled={isSubmitting || formData.rating === 0}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                Submit Review
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting, you agree that your review may be published on our website. 
            We reserve the right to moderate reviews for appropriateness and accuracy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
