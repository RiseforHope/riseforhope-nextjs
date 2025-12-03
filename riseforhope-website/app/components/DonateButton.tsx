import Link from 'next/link';

interface DonateButtonProps {
    className?: string;
    label?: string;
    href?: string;
}

export default function DonateButton({
                                         className = '',
                                         label = 'Donate Now',
                                         href = '/donate' // Default to your internal page
                                     }: DonateButtonProps) {
    return (
        <Link
            href={href}
            // Removed target="_blank" to keep users on your site
            className={`btn-donate ${className}`}
            style={{ textDecoration: 'none' }}
        >
            {label}
        </Link>
    );
}