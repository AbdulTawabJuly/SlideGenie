import { Noto_Nastaliq_Urdu } from 'next/font/google';
import localFont from 'next/font/local';

// Your existing Geist fonts
export const geist = localFont({
  src: [
    {
      path: '../fonts/GeistVF.woff', // Adjust the path based on where your fonts folder is
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-geist',
});

export const geistMono = localFont({
  src: [
    {
      path: '../fonts/GeistMonoVF.woff', // Adjust the path based on where your fonts folder is
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
});

// Adding Noto Nastaliq Urdu for Urdu text
export const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'] as const,
  weight: ['700'] as const,
  display: 'swap',
  variable: '--font-noto-nastaliq-urdu',
});
