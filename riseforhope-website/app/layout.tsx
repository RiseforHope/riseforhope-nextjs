import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

// 1. Sans-Serif (Lato)
const lato = Lato({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    variable: '--font-sans',
});

// 2. Custom Serif (Your Brand Font)
const customSerif = localFont({
    src: [
        {
            path: './fonts/MyBrandFont-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: './fonts/MyBrandFont-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/MyBrandFont-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/MyBrandFont-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
    ],
    variable: '--font-serif',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Rise for Hope - Inspiring Hope',
    description: 'Empowering communities through support and care.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${lato.variable} ${customSerif.variable}`}>
        {children}
        </body>
        </html>
    );
}