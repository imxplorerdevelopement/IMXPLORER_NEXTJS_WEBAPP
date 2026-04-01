import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

const backgrounds = [
  "https://images.unsplash.com/photo-1496588152823-86ff7695ed1d?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=2200&q=80",
];

export default function UsaDestinationPage() {
  return (
    <DestinationHeroPage
      name="United States"
      description="This page is now live as a destination entry point. We can expand this into a full itinerary experience with East Coast cities, national parks, and luxury rail-drive combinations."
      backgrounds={backgrounds}
      cards={[
        { title: "New York", body: "Iconic stays, Broadway access, and private city curation." },
        { title: "West Coast", body: "California coastlines, wine country, and design hotels." },
        { title: "National Parks", body: "Private nature journeys with lodge-style comfort." },
      ]}
    />
  );
}
