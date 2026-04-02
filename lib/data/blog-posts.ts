export interface BlogPost {
  slug: string;
  category: string;
  readTime: string;
  date: string;
  isoDate: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  tags: string[];
  featured: boolean;
  accentColor: string;
}

export const posts: BlogPost[] = [
  {
    slug: "norway-northern-lights-guide",
    category: "Destination Guide",
    readTime: "9 min read",
    date: "March 2025",
    isoDate: "2025-03-01",
    title: "Norway in Winter: Chasing the Northern Lights Without Wasting Your Trip",
    excerpt:
      "Most people book the wrong weeks, stay in the wrong towns, and leave without seeing a single aurora. Here's what actually works — from someone who's sent dozens of clients there.",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Northern Lights over a snowy Norwegian fjord at night",
    tags: ["Norway", "Northern Lights", "Winter Travel", "Aurora Borealis"],
    featured: true,
    accentColor: "#3a6ea5",
  },
  {
    slug: "dubai-beyond-the-instagram",
    category: "Insider Perspective",
    readTime: "7 min read",
    date: "February 2025",
    isoDate: "2025-02-01",
    title: "Dubai Beyond the Instagram: What the City Actually Feels Like to Live In for a Week",
    excerpt:
      "Skip the Burj Khalifa queue on day one. Here's a seven-day rhythm for Dubai that gives you the desert, the old creek, the rooftops, and the food — in the right order.",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Dubai skyline at dusk with warm golden light over the city",
    tags: ["Dubai", "UAE", "City Guide", "Itinerary"],
    featured: false,
    accentColor: "#c8922a",
  },
  {
    slug: "japan-first-time-mistakes",
    category: "Practical Travel",
    readTime: "11 min read",
    date: "January 2025",
    isoDate: "2025-01-01",
    title: "12 Things First-Time Visitors to Japan Get Wrong (and How to Fix Each One)",
    excerpt:
      "From buying the wrong JR Pass to arriving in Kyoto during peak cherry blossom with no hotel, the mistakes are predictable. So are the fixes — if you know what to look for.",
    image:
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Traditional Japanese torii gates path through Fushimi Inari at sunrise",
    tags: ["Japan", "First Time", "Tips", "Tokyo", "Kyoto"],
    featured: false,
    accentColor: "#c0415a",
  },
];
