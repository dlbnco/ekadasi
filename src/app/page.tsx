import EkadasiSummary from '@/ekadasi/components/Summary';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="h-dvh flex flex-col">
      <header>
        <div className="container mx-auto py-8">
          <h1 className="text-2xl text-center">
            ēkādaśī
            <br />
            एकादशी
          </h1>
        </div>
      </header>
      <div className="flex-1 flex flex-col justify-center text-center">
        <div className="text-xl mb-4">next</div>
        <EkadasiSummary date={new Date()} />
      </div>
      <footer className="p-10">
        <div className="max-w-[480px] mx-auto text-slate-400 text-sm font-serif">
          Ekadashi (Sanskrit: एकादशी, romanized: Ēkādaśī, lit. &apos;The
          eleventh day&apos;) is the eleventh lunar day (tithi) of the waxing
          (Shukla Pakṣa) and waning (Kṛṣṇa Pakṣa) lunar cycles in a Vedic
          calendar month. Ekadashi is popularly observed within Vaishnavism one
          of the major paths within Sanatan Dharma. Followers offer their
          worship to the god Vishnu by fasting or just symbolically; the idea
          was always to receive self-discipline and the benefits of fasting and
          it was connected to the way of life via Sanatam Dharma practices.
          <br />
          <br />
          <Link
            href="https://github.com/dlbnco/ekadasi"
            className="block text-center text-foreground"
          >
            github
          </Link>
        </div>
      </footer>
    </div>
  );
}
