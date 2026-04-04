import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Nav from "@/components/Nav";

// ─── Mocks ────────────────────────────────────────────────────────────────────

// next/navigation — control pathname per test
const mockUsePathname = vi.fn(() => "/");
vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

// next/image — render a plain <img> so jsdom doesn't complain
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// next/link — render a plain <a>
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}));

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Nav", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders the logo image", () => {
    render(<Nav />);
    const logo = screen.getByAltText("IMxplorer - The Travel Co.");
    expect(logo).toBeDefined();
  });

  it("renders all desktop nav links", () => {
    render(<Nav />);
    // Nav renders links in both desktop and mobile menus — use getAllBy
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Services").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Blogs").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("LUXE").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Enquire CTA link pointing to /contact", () => {
    render(<Nav />);
    // "Enquire" appears once in desktop nav; "Contact" appears in mobile menu
    const enquireLinks = screen.getAllByText("Enquire");
    expect(enquireLinks.length).toBeGreaterThanOrEqual(1);
    expect((enquireLinks[0] as HTMLAnchorElement).href).toContain("/contact");
  });

  it("renders Philosophy and Journey as buttons on homepage", () => {
    mockUsePathname.mockReturnValue("/");
    render(<Nav />);
    const buttons = screen.getAllByRole("button");
    const buttonTexts = buttons.map((b) => b.textContent);
    expect(buttonTexts).toContain("Philosophy");
    expect(buttonTexts).toContain("Journey");
  });

  it("renders Philosophy and Journey as links off homepage", () => {
    mockUsePathname.mockReturnValue("/about");
    render(<Nav />);
    const philosophyLinks = screen.getAllByRole("link", { name: "Philosophy" });
    expect(philosophyLinks.length).toBeGreaterThanOrEqual(1);
    expect((philosophyLinks[0] as HTMLAnchorElement).href).toContain("/#philosophy");
  });

  it("mobile menu is closed by default", () => {
    render(<Nav />);
    const mobileMenu = document.getElementById("mobile-menu");
    expect(mobileMenu?.className).not.toContain("open");
  });

  it("opens mobile menu when hamburger button is clicked", () => {
    render(<Nav />);
    // In strict mode there may be two "Open menu" buttons — pick the first
    const hamburgers = screen.getAllByLabelText("Open menu");
    fireEvent.click(hamburgers[0]);
    const mobileMenus = document.querySelectorAll("#mobile-menu");
    expect(mobileMenus[0]?.className).toContain("open");
  });

  it("closes mobile menu when close button is clicked", () => {
    render(<Nav />);
    const hamburgers = screen.getAllByLabelText("Open menu");
    fireEvent.click(hamburgers[0]);
    const closeButtons = screen.getAllByLabelText("Close menu");
    fireEvent.click(closeButtons[0]);
    const mobileMenus = document.querySelectorAll("#mobile-menu");
    expect(mobileMenus[0]?.className).not.toContain("open");
  });

  it("closes mobile menu when backdrop is clicked", () => {
    render(<Nav />);
    const hamburgers = screen.getAllByLabelText("Open menu");
    fireEvent.click(hamburgers[0]);
    const backdrops = screen.getAllByLabelText("Close menu backdrop");
    fireEvent.click(backdrops[0]);
    const mobileMenus = document.querySelectorAll("#mobile-menu");
    expect(mobileMenus[0]?.className).not.toContain("open");
  });

  it("mobile menu contains a WhatsApp link", () => {
    render(<Nav />);
    const waLinks = screen.getAllByText("WhatsApp Us");
    const waLink = waLinks[0].closest("a");
    expect(waLink?.href).toContain("wa.me");
  });

  it("nav is hidden on legal pages", () => {
    mockUsePathname.mockReturnValue("/privacy-policy");
    const { container } = render(<Nav />);
    // On legal pages the nav element gets display:none via inline style
    // The nav may be a direct child of the container div (fragment root)
    const nav = container.querySelector("nav") as HTMLElement | null;
    expect(nav).not.toBeNull();
    expect(nav!.style.display).toBe("none");
  });

  it("nav is visible on non-legal pages", () => {
    mockUsePathname.mockReturnValue("/about");
    const { container } = render(<Nav />);
    const nav = container.querySelector("nav") as HTMLElement | null;
    expect(nav).not.toBeNull();
    expect(nav!.style.display).not.toBe("none");
  });
});
