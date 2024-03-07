import { Helmet } from "react-helmet";

export const Meta = ({ title, description, keywords, url }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
