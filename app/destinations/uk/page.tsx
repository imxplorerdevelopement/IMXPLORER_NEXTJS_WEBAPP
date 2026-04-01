import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

const backgrounds = [
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=2200&q=80",
  "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=2200&q=80",
];

export default function UkDestinationPage() {
  return (
    <DestinationHeroPage
      name="United Kingdom"
      description="This page is now live as a destination entry point. We can expand this into a full itinerary experience across London, countryside estates, and private cultural circuits."
      backgrounds={backgrounds}
      cards={[
        { title: "London", body: "Design hotels, theatres, and curated city access." },
        { title: "Countryside", body: "Manor stays, scenic drives, and private estates." },
        { title: "Scotland", body: "Castles, whisky trails, and highland rail routes." },
      ]}
    />
  );
}
