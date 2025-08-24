// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// export default function HealthCheck() {
// 	const [healthData, setHealthData] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		const checkHealth = async () => {
// 			try {
// 				const response = await fetch('/api/health');
// 				const data = await response.json();
// 				setHealthData(data);
// 				setError(null);
// 			} catch (err) {
// 				setError('Failed to fetch health status');
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		checkHealth();
// 		const interval = setInterval(checkHealth, 30000);

// 		return () => clearInterval(interval);
// 	}, []);

// 	if (loading) {
// 		return (
// 			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
// 				<div className="bg-white p-8 rounded-lg shadow-lg">
// 					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
// 					<p className="text-gray-600">Checking system health...</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	if (error) {
// 		return (
// 			<div className="min-h-screen bg-red-50 flex items-center justify-center">
// 				<div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-red-500">
// 					<h1 className="text-2xl font-bold text-red-600 mb-4">
// 						❌ Health Check Failed
// 					</h1>
// 					<p className="text-gray-700">{error}</p>
// 				</div>
// 			</div>
// 		);
// 	}

// 	const isHealthy =
// 		healthData?.status === 'ok' && healthData?.database?.connected;

// 	return (
// 		<div className="min-h-screen bg-gray-100 py-8">
// 			<div className="max-w-4xl mx-auto px-4">
// 				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
// 					{/* Header */}
// 					<div
// 						className={`px-6 py-4 ${
// 							isHealthy ? 'bg-green-500' : 'bg-red-500'
// 						}`}>
// 						<h1 className="text-2xl font-bold text-white flex items-center gap-2">
// 							{isHealthy ? '✅' : '❌'} System Health Check
// 						</h1>
// 						<p className="text-green-100">
// 							Last updated: {new Date().toLocaleString()}
// 						</p>
// 					</div>

// 					{/* Content */}
// 					<div className="p-6">
// 						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 							{/* Overall Status */}
// 							<div className="bg-gray-50 p-4 rounded-lg">
// 								<h2 className="text-lg font-semibold text-gray-800 mb-2">
// 									Overall Status
// 								</h2>
// 								<div className="flex items-center gap-2">
// 									<span
// 										className={`inline-block w-3 h-3 rounded-full ${
// 											isHealthy
// 												? 'bg-green-500'
// 												: 'bg-red-500'
// 										}`}></span>
// 									<span className="font-medium">
// 										{healthData.status.toUpperCase()}
// 									</span>
// 								</div>
// 							</div>

// 							{/* Database Status */}
// 							<div className="bg-gray-50 p-4 rounded-lg">
// 								<h2 className="text-lg font-semibold text-gray-800 mb-2">
// 									Database
// 								</h2>
// 								<div className="space-y-1">
// 									<div className="flex justify-between">
// 										<span>Status:</span>
// 										<span
// 											className={`font-medium ${
// 												healthData.database.connected
// 													? 'text-green-600'
// 													: 'text-red-600'
// 											}`}>
// 											{healthData.database.status}
// 										</span>
// 									</div>
// 									<div className="flex justify-between">
// 										<span>Name:</span>
// 										<span className="font-medium">
// 											{healthData.database.name}
// 										</span>
// 									</div>
// 									<div className="flex justify-between">
// 										<span>Connected:</span>
// 										<span
// 											className={`font-medium ${
// 												healthData.database.connected
// 													? 'text-green-600'
// 													: 'text-red-600'
// 											}`}>
// 											{healthData.database.connected
// 												? 'Yes'
// 												: 'No'}
// 										</span>
// 									</div>
// 								</div>
// 							</div>

// 							{/* Environment Info */}
// 							<div className="bg-gray-50 p-4 rounded-lg">
// 								<h2 className="text-lg font-semibold text-gray-800 mb-2">
// 									Environment
// 								</h2>
// 								<div className="flex justify-between">
// 									<span>Mode:</span>
// 									<span className="font-medium">
// 										{healthData.environment}
// 									</span>
// 								</div>
// 							</div>

// 							{/* Timestamp */}
// 							<div className="bg-gray-50 p-4 rounded-lg">
// 								<h2 className="text-lg font-semibold text-gray-800 mb-2">
// 									Timestamp
// 								</h2>
// 								<p className="text-sm text-gray-600">
// 									{new Date(
// 										healthData.timestamp
// 									).toLocaleString()}
// 								</p>
// 							</div>
// 						</div>

// 						{/* Raw JSON Data */}
// 						<div className="mt-6">
// 							<h2 className="text-lg font-semibold text-gray-800 mb-2">
// 								Raw Health Data
// 							</h2>
// 							<pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
// 								{JSON.stringify(healthData, null, 2)}
// 							</pre>
// 						</div>

// 						{/* Navigation */}
// 						<div className="mt-6 pt-4 border-t border-gray-200">
// 							<Link
// 								href="/"
// 								className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
// 								← Back to Registration
// 							</Link>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
