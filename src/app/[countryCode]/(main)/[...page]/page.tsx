import { Metadata } from "next";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@modules/common/components/builder";

// Initialize Builder.io with your Public API Key
builder.init("e49353dd3063449e9d4dc86b6a2c9d36");

export const metadata: Metadata = {
  title: "Builder.io + Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
};

interface BuilderPageProps {
  params: {
    page?: string[]; // Optional in case it's undefined
    countryCode: string;
  };
}

export default async function BuilderPage({ params }: BuilderPageProps) {
  const { countryCode, page = [] } = params;

  // Ensure clean URL path formatting
  const urlPath = `/${countryCode}/${page.join("/")}`.replace(/\/$/, ""); // Prevent trailing slashes

  const content = await builder
    .get("page", {
      userAttributes: { urlPath },
      options: { countryCode },
      locale: countryCode,
      prerender: false,
    })
    .toPromise();

  return (
    <>
      <RenderBuilderContent content={content} model="page" locale={countryCode} />
    </>
  );
}
