import * as yup from 'yup';

export const ReviewSchema = yup.object({
    rating: yup.number().required(),
    title: yup.string(),
    description: yup.string(),
  });
  
export type ReviewSchemaType = yup.InferType<typeof ReviewSchema>

export interface AddReviewProps {
    isOpen: boolean;
    onClose: () => void;
    createReview: any;
  };