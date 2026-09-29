import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { CollectionPage } from "@/components/collection-page"
import { COLLECTIONS, getCollection } from "@/lib/collections"

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const collection = getCollection((await params).slug)
  if (!collection) return {}
  return {
    title: `Shop ${collection.name} — Winterman Parfums`,
    description: `${collection.description} Free shipping on ₹1,999+ and COD across India.`,
  }
}

export default async function CollectionRoute({ params }: Props) {
  const { slug } = await params
  if (slug === "classics") redirect("/shop")
  const collection = getCollection(slug)
  if (!collection) notFound()
  return <CollectionPage collection={collection} />
}
