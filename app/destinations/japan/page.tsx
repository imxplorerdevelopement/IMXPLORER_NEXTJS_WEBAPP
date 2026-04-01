import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

const backgrounds = [
  "https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=2200&q=80",
];

export default function JapanDestinationPage() {
  return (
    <DestinationHeroPage
      name="Japan"
      description="This page is now live as a destination entry point. We can expand this into a full itinerary experience with city culture, ryokan retreats, and seasonal routes."
      backgrounds={backgrounds}
      cards={[
        { title: "Tokyo", body: "Contemporary luxury, culinary depth, and design-forward stays." },
        { title: "Kyoto", body: "Temple districts, private tea ceremonies, and heritage access." },
        { title: "Hokkaido", body: "Nature escapes, winter experiences, and hot-spring retreats." },
      ]}
    />
  );
}
