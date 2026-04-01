import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

const backgrounds = [
  "https://images.unsplash.com/photo-1531168556467-80aace4d30f8?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1484788984921-03950022c9ef?auto=format&fit=crop&w=2200&q=80",
];

export default function NorwayDestinationPage() {
  return (
    <DestinationHeroPage
      name="Norway"
      description="This page is now live as a destination entry point. We can expand this into a full itinerary experience with fjord journeys, northern lights windows, and scenic rail-cruise combinations."
      backgrounds={backgrounds}
      cards={[
        { title: "Fjords", body: "Private cruising, waterfront stays, and mountain routes." },
        { title: "Arctic", body: "Aurora-chasing plans and winter expedition design." },
        { title: "Cities", body: "Oslo and Bergen culture circuits with premium logistics." },
      ]}
    />
  );
}
