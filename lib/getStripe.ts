import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      throw new Error('Stripe publishable key is not set in the environment.');
    }

    stripePromise = loadStripe(publishableKey);
  }

  return stripePromise;
};

export default getStripe;