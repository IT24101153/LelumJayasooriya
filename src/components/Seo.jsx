import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/siteConfig';
import { socialLinks } from '../data/siteContent';

export function Seo() {
  const pageUrl = siteConfig.websiteUrl;
  const imageUrl = `${siteConfig.websiteUrl}/uploads/images/hero.webp`;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.websiteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    sameAs: socialLinks.map((link) => link.href)
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.websiteUrl
  };

  return (
    <Helmet>
      <html lang="en" />
      <title>{siteConfig.title}</title>
      <meta name="description" content={siteConfig.description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={siteConfig.title} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="2655" />
      <meta property="og:image:height" content="2593" />
      <meta property="og:image:alt" content={`${siteConfig.name} portrait`} />
      <meta property="og:locale" content={siteConfig.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteConfig.title} />
      <meta name="twitter:description" content={siteConfig.description} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
    </Helmet>
  );
}
