import { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface CartItem {
    name: string;
    image: { asset: { _ref: string } }[];
    price: number;
    quantity: number;
  }


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body)

    try {

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1NYTx1ES6bGARFv6ikjIeFRD'},
                { shipping_rate: 'shr_1NYTxaES6bGARFv6TiS7vClS'},
            ],
            line_items: (req.body as CartItem[]).map((item) => {
                const img = (item.image[0]).asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/ze3b1q5i/production/').replace('-webp', '.webp');

                return {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: item.price * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
            automatic_tax: {enabled: true},
          }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}