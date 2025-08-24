import RegistrationForm from '../components/Registration.jsx';
import Hero from '../components/Hero.jsx';
import Footer from '@/components/Footer.jsx';
import Domains from '../components/Domains.jsx';

export default function Home() {
	return (
		<>
			<Hero />
			<Domains />
			<RegistrationForm />
			<Footer />
		</>
	);
}
