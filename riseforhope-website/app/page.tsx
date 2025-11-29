import Header from './components/Header'; // <--- Added back
import Hero from './components/Hero';
import Mission from './components/Mission';
import ImpactQuote from './components/ImpactQuote';
import Pathways from './components/Pathways';
import InFocus from './components/InFocus';
import NewsEvents from './components/NewsEvents';
import Social from './components/Social';
import Footer from './components/Footer';

export default function Home() {
    return (
        <main>
            <Header /> {/* <--- Placed at the top */}
            <Hero />
            <Mission />
            <ImpactQuote />
            <Pathways />
            <InFocus />
            <NewsEvents />
            <Social />
            <Footer />
        </main>
    );
}