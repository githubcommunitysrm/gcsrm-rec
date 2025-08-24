import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GitHub Community SRM is Recruiting! | Join the Open Source Revolution at SRMIST",
  description:
    "GitHub Community SRM is now recruiting! Join the official student-led open-source community at SRM Institute of Science and Technology. Apply now to be part of our next chapter.",
  keywords:
    "GitHub Community SRM recruitment, join GitHub SRM, open source recruitment SRMIST, SRMIST club recruitment, open source community, student developer recruitment, join open source SRM, GitHub SRMIST recruitment, SRMIST opportunities, tech club recruitment, developer community SRMIST",
  authors: [{ name: "GitHub Community SRM" }],
  openGraph: {
    title: "We're Recruiting! | GitHub Community SRM | Open Source at SRMIST",
    description:
      "Apply now to join GitHub Community SRM, the official student-led open-source community at SRM Institute of Science and Technology. Be part of our mission!",
    url: "https://githubsrmist.tech",
    siteName: "GitHub Community SRM",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "GitHub Community SRM Recruitment Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Community SRM is Recruiting! | Join Us at SRMIST",
    description:
      "We're looking for passionate students to join GitHub Community SRM. Apply now and be part of the open-source movement at SRMIST!",
    site: "@GithubSrm",
    images: ["/logo.png"],
    creator: "@GithubSrm",
  },
  metadataBase: new URL("https://githubsrmist.tech"),
  alternates: {
    canonical: "https://githubsrmist.tech",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(
              function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TXXTQDRC');`
          }}
        />
        {/* End Google Tag Manager */}
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="US;IN" />
        <meta name="geo.placename" content="New York;Mumbai" />
        <meta name="theme-color" content="#000000" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="msnbot" content="index, follow" />
        <meta name="alexabot" content="index, follow" />
        <meta name="slurp" content="index, follow" />
        <meta name="yahoobot" content="index, follow" />
        <meta name="webcrawlers" content="index, follow" />
        <meta name="spiders" content="index, follow" />
        <meta name="google" content="index, follow" />
        <meta name="google-site-verification" content="google-site-verification= " />
        <meta property="og:site_name" content="GitHub Community SRM - The Official student-led community affiliated with GitHub, spearheading the open-source revolution at SRMIST." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://githubsrmist.tech" />
        <link rel="canonical" href="https://githubsrmist.tech" />
        <meta property="image" content="/favicon.ico" />
        <meta
          name="description"
          content="GitHub Community SRM is now recruiting! Join the official student-led open-source community at SRM Institute of Science and Technology. Apply now to be part of our next chapter."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta name="keywords" content="GitHub Community SRM recruitment, join GitHub SRM, open source recruitment SRMIST, SRMIST club recruitment, open source community, student developer recruitment, join open source SRM, GitHub SRMIST recruitment, SRMIST opportunities, tech club recruitment, developer community SRMIST" />
        <meta name="author" content="GitHub Community SRM" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GitHub Community SRM is Recruiting! | Join Us at SRMIST" />
        <meta
          name="twitter:description"
          content="We're looking for passionate students to join GitHub Community SRM. Apply now and be part of the open-source movement at SRMIST!"
        />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:site" content="@GithubSrm" />
        <meta
          name="twitter:url"
          content="https://www.twitter.com/GithubSrm"
        />
        <meta property="og:site_name" content="GitHub Community SRM" />
        <meta property="og:title" content="We're Recruiting! | GitHub Community SRM | Open Source at SRMIST" />
        <meta property="og:description" content="Apply now to join GitHub Community SRM, the official student-led open-source community at SRM Institute of Science and Technology. Be part of our mission!" />
        <meta property="og:url" content="https://githubsrmist.tech" />
        <meta property="og:image" content="/Logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:see_also" content="https://github.com/SRM-IST-KTR" />
        <meta property="og:see_also" content="https://www.instagram.com/githubsrm/" />
        <meta property="og:see_also" content="https://www.linkedin.com/company/githubsrm" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GitHub Community SRM",
              "url": "https://githubsrmist.tech",
              "logo": "https://githubsrmist.tech/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "community@githubsrmist.tech",
                "contactType": "Recruitment",
                "url": "https://githubsrmist.tech/recruitment"
              },
              "sameAs": [
                "https://www.instagram.com/githubsrm/",
                "https://github.com/SRM-IST-KTR",
                "https://www.linkedin.com/company/githubsrm"
              ],
              "description": "GitHub Community SRM is recruiting! Join the student-led open-source community at SRM Institute of Science and Technology. Apply now to be part of our next chapter.",
              "location": {
                "@type": "Place",
                "name": "SRM Institute of Science and Technology",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "SRM Nagar",
                  "addressLocality": "Kattankulathur",
                  "addressRegion": "TN",
                  "postalCode": "603203",
                  "addressCountry": "IN"
                }
              }
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TXXTQDRC"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
