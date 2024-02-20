import * as yup from 'yup';

export const ReviewSchema = yup.object({
    rating: yup.number().required(),
    title: yup.string().default(null),
    text: yup.string().default(null),
  });
  
export type ReviewSchemaType = yup.InferType<typeof ReviewSchema>

export interface AddReviewProps {
    isOpen: boolean;
    onClose: () => void;
    createReview: any;
  };