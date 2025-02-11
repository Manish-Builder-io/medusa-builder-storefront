import { Metadata } from "next"
import { builder } from "@builder.io/sdk"
import { RenderBuilderContent } from "@modules/common/components/builder"

import FeaturedProducts from "@modules/home/components/featured-products"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

// Initialize Builder.io with your Public API Key
builder.init("e49353dd3063449e9d4dc86b6a2c9d36")

export const metadata: Metadata = {
  title: "Builder.io + Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

interface HomeProps {
  params: {
    countryCode: string
  }
}

export default async function Home({ params }: HomeProps) {
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const { collections } = await listCollections({ fields: "id, handle, title" })

  if (!collections || !region) {
    return null
  }

  const content = await builder
    .get("page", {
      userAttributes: { urlPath: "/" },
      options: {countryCode},
      locale: countryCode,
      prerender: false,
    })
    .toPromise()

  return (
    <>
      <RenderBuilderContent content={content} model="page"  locale={countryCode} />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
