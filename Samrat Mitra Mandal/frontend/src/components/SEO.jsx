import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, path = '/' }) {
  const siteTitle = title ? `${title} | Samrat Mitra Mandal` : 'सम्राट मित्र मंडळ | गणपती बाप्पा मोरया';
  const metaDescription = description || 'सम्राट मित्र मंडळाचे लाईव्ह दर्शन, गणेशोत्सव वेळापत्रक, देणगी, गॅलरी, स्वयंसेवक नोंदणी आणि सामाजिक उपक्रम.';
  const url = `https://samratmitramandal.org${path}`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content="/images/mandal/closeup-blessing.jpg" />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
