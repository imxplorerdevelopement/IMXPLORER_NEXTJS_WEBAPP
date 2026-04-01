import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

const backgrounds = [
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1582672060674-bc2bd808a8a6?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1598359715568-12c8f7d9fcb4?auto=format&fit=crop&w=2200&q=80",
];

export default function DubaiDestinationPage() {
  return (
    <DestinationHeroPage
      name="Dubai"
      description="This page is now live as a destination entry point. We can expand this into a full itinerary experience with luxury stays, signature experiences, and curated city-desert routes."
      backgrounds={backgrounds}
      cards={[
        { title: "City", body: "Skyline views, retail districts, and fine dining." },
        { title: "Desert", body: "Private camps, dune drives, and sunset experiences." },
        { title: "Coast", body: "Beach clubs, marinas, and yacht-ready itineraries." },
      ]}
    />
  );
}
