"use client"
import { apiSlice } from '../services/apiSlice';

interface checksubscription{
  isValid: boolean;
  next_billing_date: string | null;
}

interface UserSubscription {
  id: number;
  user: number | string; 
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  stripe_current_period_end: Date | null;
}

const subscriptionApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
   
    CheckSubscription:builder.query<checksubscription,void>({
      query: () => '/stripe/check-subscription/',
    }),
    subscription:builder.query<UserSubscription, void>({
      query: () => '/stripe/subscription/',
    }),
  }),
});

export const {
  useSubscriptionQuery,
  useCheckSubscriptionQuery,
} = subscriptionApiSlice;
 


