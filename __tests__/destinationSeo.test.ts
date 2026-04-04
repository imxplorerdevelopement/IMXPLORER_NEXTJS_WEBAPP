import { describe, it, expect } from "vitest";
import {
  buildDestinationMetadata,
  buildDestinationJsonLd,
  toJsonLdString,
} from "@/app/destinations/destinationSeo";

const BASE_ARGS = {
  slug: "india",
  name: "India",
  description: "Luxury travel through India's most iconic destinations.",
  keywords: ["India luxury travel", "Taj Mahal tour"],
  image: "https://images.unsplash.com/photo-india.jpg",
};

const FAQ_ARGS = {
  ...BASE_ARGS,
  faqs: [
    { question: "Best time to visit?", answer: "October to March." },
    { question: "Visa required?", answer: "Yes, e-visa available." },
  ],
};

// ─── buildDestinationMetadata ─────────────────────────────────────────────────

describe("buildDestinationMetadata", () => {
  it("sets title in '{Name} Luxury Travel Guide | IMxplorer' format", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    expect(meta.title).toBe("India Luxury Travel Guide | IMxplorer");
  });

  it("sets description", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    expect(meta.description).toBe(BASE_ARGS.description);
  });

  it("sets canonical URL using slug", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    expect(meta.alternates?.canonical).toBe("/destinations/india");
  });

  it("sets openGraph title to match page title", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    expect(meta.openGraph?.title).toBe("India Luxury Travel Guide | IMxplorer");
  });

  it("sets openGraph type as website", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    expect(meta.openGraph?.type).toBe("website");
  });

  it("includes image in openGraph images", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    const images = meta.openGraph?.images as Array<{ url: string; alt: string }>;
    expect(images).toBeDefined();
    expect(images[0].url).toBe(BASE_ARGS.image);
  });

  it("sets openGraph image alt to '{Name} luxury travel'", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    const images = meta.openGraph?.images as Array<{ url: string; alt: string }>;
    expect(images[0].alt).toBe("India luxury travel");
  });

  it("sets twitter card as summary_large_image", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    expect(meta.twitter?.card).toBe("summary_large_image");
  });

  it("passes keywords through", () => {
    const meta = buildDestinationMetadata(BASE_ARGS);
    expect(meta.keywords).toEqual(BASE_ARGS.keywords);
  });

  it("canonical URL uses different slug correctly", () => {
    const meta = buildDestinationMetadata({ ...BASE_ARGS, slug: "dubai", name: "Dubai" });
    expect(meta.alternates?.canonical).toBe("/destinations/dubai");
    expect(meta.title).toBe("Dubai Luxury Travel Guide | IMxplorer");
  });
});

// ─── buildDestinationJsonLd ───────────────────────────────────────────────────

describe("buildDestinationJsonLd", () => {
  it("returns object with @context of https://schema.org", () => {
    const ld = buildDestinationJsonLd(FAQ_ARGS);
    expect(ld["@context"]).toBe("https://schema.org");
  });

  it("includes @graph array with two entries", () => {
    const ld = buildDestinationJsonLd(FAQ_ARGS);
    expect(Array.isArray(ld["@graph"])).toBe(true);
    expect(ld["@graph"].length).toBe(2);
  });

  it("first graph entry is a TouristDestination", () => {
    const ld = buildDestinationJsonLd(FAQ_ARGS);
    const destination = ld["@graph"][0] as { "@type": string; name: string; url: string };
    expect(destination["@type"]).toBe("TouristDestination");
    expect(destination.name).toBe("India");
    expect(destination.url).toBe("/destinations/india");
  });

  it("second graph entry is a FAQPage", () => {
    const ld = buildDestinationJsonLd(FAQ_ARGS);
    const faqPage = ld["@graph"][1] as { "@type": string };
    expect(faqPage["@type"]).toBe("FAQPage");
  });

  it("FAQPage mainEntity contains all FAQ items", () => {
    const ld = buildDestinationJsonLd(FAQ_ARGS);
    const faqPage = ld["@graph"][1] as {
      mainEntity: Array<{
        "@type": string;
        name: string;
        acceptedAnswer: { "@type": string; text: string };
      }>;
    };
    expect(faqPage.mainEntity.length).toBe(2);
    expect(faqPage.mainEntity[0]["@type"]).toBe("Question");
    expect(faqPage.mainEntity[0].name).toBe("Best time to visit?");
    expect(faqPage.mainEntity[0].acceptedAnswer["@type"]).toBe("Answer");
    expect(faqPage.mainEntity[0].acceptedAnswer.text).toBe("October to March.");
  });

  it("handles empty FAQ array without throwing", () => {
    const ld = buildDestinationJsonLd({ ...FAQ_ARGS, faqs: [] });
    const faqPage = ld["@graph"][1] as { mainEntity: unknown[] };
    expect(faqPage.mainEntity).toEqual([]);
  });
});

// ─── toJsonLdString ───────────────────────────────────────────────────────────

describe("toJsonLdString", () => {
  it("returns valid JSON string", () => {
    const str = toJsonLdString({ key: "value" });
    expect(() => JSON.parse(str)).not.toThrow();
  });

  it("escapes < to prevent XSS in script tags", () => {
    const str = toJsonLdString({ name: "<script>alert(1)</script>" });
    expect(str).not.toContain("<script>");
    expect(str).toContain("\\u003cscript");
  });

  it("serializes nested objects", () => {
    const input = { a: { b: { c: 1 } } };
    const str = toJsonLdString(input);
    expect(JSON.parse(str)).toEqual(input);
  });

  it("serializes arrays", () => {
    const input = [1, 2, 3];
    const str = toJsonLdString(input);
    expect(JSON.parse(str)).toEqual(input);
  });

  it("handles null input", () => {
    const str = toJsonLdString(null);
    expect(str).toBe("null");
  });
});
