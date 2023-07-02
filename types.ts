import Stripe from "stripe";

export interface userDetail {
    id: string;
    first_name: string;
    last_name: string;
    fullname?: string;
    avatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface product{
    id: string;
    active?: boolean;
    name?: string;
    description?: string;
    image?: string;
    metadata?: Stripe.Metadata;
}
export interface price{
    id: string;
    product_id: string;
    active?: boolean;
    description?: string;
    unit_amount?: number;
    currency?: string;
    type?: Stripe.Price.Type;
    interval?: Stripe.Price.Recurring.Interval;
    interval_count?: number;
    trial_period_days?: number;
    metadata?: Stripe.Metadata;
    product?: product;
}

export interface subscriptions{
    id: string;
    user_id: string;
    status?: string;
    metadata?: Stripe.Metadata;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end?: string;
    created: string;
    current_period_start?: string;
    current_period_end?: string;
    ended_at?: string;
    cancel_at?: string;
    canceled_at?: string;
    trial_start?: string;
    trial_end?: string;
    prices?: price;
}