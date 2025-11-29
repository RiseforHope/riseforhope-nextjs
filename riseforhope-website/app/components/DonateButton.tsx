import Link from 'next/link';

// 🔴 REPLACE THIS WITH YOUR STRIPE LINK
const STRIPE_URL = 'https://donate.stripe.com/28E4gz5YY5jw1xMfTD6kg00';

interface DonateButtonProps {
    className?: string;
    label?: string;
}

export default function DonateButton({ className = '', label = 'Donate Now' }: DonateButtonProps) {
    return (
        <Link
            href={STRIPE_URL}
            target="_blank"
            className={`btn-donate ${className}`}
        >
            {label}
        </Link>
    );
}