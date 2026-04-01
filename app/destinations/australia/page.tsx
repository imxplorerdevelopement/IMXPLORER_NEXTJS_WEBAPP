import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

const backgrounds = [
  "https://images.unsplash.com/photo-1506973035872-a4f23ad2b9b8?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=2200&q=80",
];

export default function AustraliaDestinationPage() {
  return (
    <DestinationHeroPage
      name="Australia"
      description="This page is now live as a destination entry point. We can expand this into a full itinerary experience with coastlines, reef access, and premium outback routes."
      backgrounds={backgrounds}
      cards={[
        { title: "Sydney", body: "Harbour stays, city culture, and private coastal experiences." },
        { title: "Queensland", body: "Great Barrier Reef journeys and tropical luxury retreats." },
        { title: "Outback", body: "Remote landscapes with curated premium expedition comfort." },
      ]}
    />
  );
}
