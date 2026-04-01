import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

const backgrounds = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=2200&q=80",
];

export default function IndiaDestinationPage() {
  return (
    <DestinationHeroPage
      name="India"
      description="This page is now live as a destination entry point. We can expand this into a full itinerary experience with regions, luxury stays, seasonal highlights, and curated routes."
      backgrounds={backgrounds}
      cards={[
        { title: "North", body: "Palaces, Himalayas, and heritage circuits." },
        { title: "South", body: "Coastal retreats, wellness, and temple trails." },
        { title: "West & East", body: "Culture, wildlife, and design-forward stays." },
      ]}
    />
  );
}
