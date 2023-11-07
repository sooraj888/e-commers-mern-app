import React from "react";
import { Helmet } from "react-helmet-async";

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <Helmet>
      <title data-rh="true">{children}</title>
    </Helmet>
  );
}
