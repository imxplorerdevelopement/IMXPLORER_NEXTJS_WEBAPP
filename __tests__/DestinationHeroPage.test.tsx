import { render, screen, act } from "@testing-library/react";
import { describe, expect, test, it, vi, beforeEach, afterEach } from "vitest";

import DestinationHeroPage from "@/components/destinations/DestinationHeroPage";

// ─── Shared fixture ───────────────────────────────────────────────────────────

const BASE_PROPS = {
  name: "India",
  description: "Luxury travel planning across India's most iconic destinations.",
  backgrounds: ["https://example.com/bg1.jpg", "https://example.com/bg2.jpg"],
  cards: [
    { title: "North India", body: "Culture and heritage." },
    { title: "South India", body: "Temples and backwaters." },
  ],
  seoIntro: "A broad travel overview for India.",
  highlights: ["Luxury stays", "Private guided tours", "Airport transfers"],
  facts: [
    { label: "Best Time", value: "October to March" },
    { label: "Currency", value: "INR" },
  ],
  itinerary: [
    { day: "Day 1", plan: "Arrival and city exploration." },
    { day: "Day 2", plan: "Temple visits and cultural immersion." },
  ],
  faqs: [
    { question: "What is included?", answer: "Hotels and concierge support." },
    { question: "Is visa required?", answer: "Depends on your passport." },
  ],
};

// ─── Section headings ─────────────────────────────────────────────────────────

describe("DestinationHeroPage — core sections", () => {
  test("renders destination name as H1", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByRole("heading", { level: 1, name: "India" }).length).toBeGreaterThanOrEqual(1);
  });

  test("renders description paragraph", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText(BASE_PROPS.description).length).toBeGreaterThanOrEqual(1);
  });

  test("renders 'Why Visit {name}' heading", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Why Visit India").length).toBeGreaterThanOrEqual(1);
  });

  test("renders seoIntro text", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText(BASE_PROPS.seoIntro).length).toBeGreaterThanOrEqual(1);
  });

  test("renders Top Highlights heading", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByRole("heading", { level: 2, name: "Top Highlights" }).length).toBeGreaterThanOrEqual(1);
  });

  test("renders Travel Snapshot heading", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Travel Snapshot").length).toBeGreaterThanOrEqual(1);
  });

  test("renders Sample Itinerary heading", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Sample Itinerary").length).toBeGreaterThanOrEqual(1);
  });

  test("renders Frequently Asked Questions heading", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Frequently Asked Questions").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Cards ────────────────────────────────────────────────────────────────────

describe("DestinationHeroPage — intro cards", () => {
  test("renders all card titles", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("North India").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("South India").length).toBeGreaterThanOrEqual(1);
  });

  test("renders all card body text", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Culture and heritage.").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Temples and backwaters.").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Highlights ───────────────────────────────────────────────────────────────

describe("DestinationHeroPage — highlights", () => {
  test("renders all highlight items", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Luxury stays").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Private guided tours").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Airport transfers").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Facts ────────────────────────────────────────────────────────────────────

describe("DestinationHeroPage — travel snapshot facts", () => {
  test("renders fact labels", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Best Time").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Currency").length).toBeGreaterThanOrEqual(1);
  });

  test("renders fact values", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("October to March").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("INR").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Itinerary ────────────────────────────────────────────────────────────────

describe("DestinationHeroPage — itinerary", () => {
  test("renders all itinerary day labels", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Day 1").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Day 2").length).toBeGreaterThanOrEqual(1);
  });

  test("renders all itinerary plan descriptions", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Arrival and city exploration.").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Temple visits and cultural immersion.").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── FAQs ─────────────────────────────────────────────────────────────────────

describe("DestinationHeroPage — FAQs", () => {
  test("renders all FAQ questions", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("What is included?").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Is visa required?").length).toBeGreaterThanOrEqual(1);
  });

  test("renders all FAQ answers", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Hotels and concierge support.").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Depends on your passport.").length).toBeGreaterThanOrEqual(1);
  });
});

// ─── Background images ────────────────────────────────────────────────────────

describe("DestinationHeroPage — background image cycling", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders first background as active (opacity-100) initially", () => {
    const { container } = render(<DestinationHeroPage {...BASE_PROPS} />);
    // Background divs are direct children of the pointer-events-none wrapper
    const wrapper = container.querySelector(".pointer-events-none.absolute.inset-0");
    const bgDivs = wrapper?.children;
    expect(bgDivs).toBeDefined();
    expect(bgDivs![0].className).toContain("opacity-100");
    expect(bgDivs![1].className).toContain("opacity-0");
  });

  it("does not start a timer when only one background image is provided", () => {
    const setIntervalSpy = vi.spyOn(window, "setInterval");
    render(<DestinationHeroPage {...BASE_PROPS} backgrounds={["https://example.com/only.jpg"]} />);
    expect(setIntervalSpy).not.toHaveBeenCalled();
  });

  it("advances to second background after 5200ms", () => {
    const { container } = render(<DestinationHeroPage {...BASE_PROPS} />);
    act(() => { vi.advanceTimersByTime(5200); });
    const wrapper = container.querySelector(".pointer-events-none.absolute.inset-0");
    const bgDivs = wrapper?.children;
    expect(bgDivs).toBeDefined();
    expect(bgDivs![1].className).toContain("opacity-100");
    expect(bgDivs![0].className).toContain("opacity-0");
  });

  it("wraps back to first background after cycling through all", () => {
    const { container } = render(<DestinationHeroPage {...BASE_PROPS} />);
    act(() => { vi.advanceTimersByTime(5200 * 2); });
    const wrapper = container.querySelector(".pointer-events-none.absolute.inset-0");
    const bgDivs = wrapper?.children;
    expect(bgDivs).toBeDefined();
    expect(bgDivs![0].className).toContain("opacity-100");
  });
});

// ─── Edge cases ───────────────────────────────────────────────────────────────

describe("DestinationHeroPage — edge cases", () => {
  it("renders with empty arrays without crashing", () => {
    expect(() =>
      render(
        <DestinationHeroPage
          {...BASE_PROPS}
          cards={[]}
          highlights={[]}
          facts={[]}
          itinerary={[]}
          faqs={[]}
        />,
      ),
    ).not.toThrow();
  });

  it("renders with a single background without crashing", () => {
    expect(() =>
      render(<DestinationHeroPage {...BASE_PROPS} backgrounds={["https://example.com/only.jpg"]} />),
    ).not.toThrow();
  });

  it("shows 'Destination' label above the h1", () => {
    render(<DestinationHeroPage {...BASE_PROPS} />);
    expect(screen.getAllByText("Destination").length).toBeGreaterThanOrEqual(1);
  });
});
