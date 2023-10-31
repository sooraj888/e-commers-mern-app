import React from "react";
import Helmet from "react-helmet";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}
