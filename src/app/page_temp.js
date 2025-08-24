import Image from 'next/image';
import RegistrationForm from '../components/Registration.jsx';

export default function Home() {
	return (
		<div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="max-w-4xl mx-auto">
				<div className="text-center mb-8">
					<Image
						className="dark:invert mx-auto mb-4"
						src="/next.svg"
						alt="Next.js logo"
						width={180}
						height={38}
						priority
					/>
					<h1 className="text-3xl font-bold text-gray-800 mb-2">
						GCSRM Recruitment System
					</h1>
					<p className="text-gray-600"></p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-800">
							Health Check
						</h2>
						<div className="bg-gray-100 p-4 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">
								Check system health:
							</p>
							<a
								href="/api/health"
								target="_blank"
								className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
								View Health Status
							</a>
						</div>

						<div className="bg-gray-100 p-4 rounded-lg">
							<h3 className="font-semibold text-gray-800 mb-2">
								Instructions:
							</h3>
							<ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
								<li>Fill out all required fields</li>
								<li>Use a valid email address</li>
								<li>Registration number should be unique</li>
								<li>Select appropriate year and domain</li>
							</ul>
						</div>
					</div>

					<div>
						<RegistrationForm />
					</div>
				</div>
			</main>
		</div>
	);
}
