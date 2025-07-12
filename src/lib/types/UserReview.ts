export interface UserReview {
  id: string;
  name: string;
  email: string;
  userAvatar?: string;
  rating: number;
  comment?: string;
  date: string;
  verified?: boolean;
}
