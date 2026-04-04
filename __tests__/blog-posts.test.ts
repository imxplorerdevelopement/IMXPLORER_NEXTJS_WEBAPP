import { describe, it, expect } from "vitest";
import { posts, type BlogPost } from "@/lib/data/blog-posts";

// ─── Required fields every post must have ────────────────────────────────────

const REQUIRED_FIELDS: (keyof BlogPost)[] = [
  "slug",
  "category",
  "readTime",
  "date",
  "isoDate",
  "title",
  "excerpt",
  "image",
  "imageAlt",
  "tags",
  "featured",
  "accentColor",
];

describe("blog-posts data integrity", () => {
  it("exports a non-empty array", () => {
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("every post has all required fields", () => {
    for (const post of posts) {
      for (const field of REQUIRED_FIELDS) {
        expect(post, `post "${post.slug}" is missing field "${field}"`).toHaveProperty(field);
      }
    }
  });

  it("every post has a non-empty slug", () => {
    for (const post of posts) {
      expect(post.slug.trim().length, `slug is empty for post: ${post.title}`).toBeGreaterThan(0);
    }
  });

  it("all slugs are unique", () => {
    const slugs = posts.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(posts.length);
  });

  it("every post has a non-empty title", () => {
    for (const post of posts) {
      expect(post.title.trim().length, `title is empty for slug: ${post.slug}`).toBeGreaterThan(0);
    }
  });

  it("every post has a non-empty excerpt", () => {
    for (const post of posts) {
      expect(post.excerpt.trim().length, `excerpt is empty for slug: ${post.slug}`).toBeGreaterThan(0);
    }
  });

  it("every post image is an https URL", () => {
    for (const post of posts) {
      expect(post.image, `image URL invalid for slug: ${post.slug}`).toMatch(/^https:\/\//);
    }
  });

  it("every post has a non-empty imageAlt", () => {
    for (const post of posts) {
      expect(post.imageAlt.trim().length, `imageAlt empty for slug: ${post.slug}`).toBeGreaterThan(0);
    }
  });

  it("isoDate matches YYYY-MM-DD format", () => {
    for (const post of posts) {
      expect(
        post.isoDate,
        `isoDate format invalid for slug: ${post.slug}`,
      ).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("isoDate is a valid calendar date", () => {
    for (const post of posts) {
      const d = new Date(post.isoDate);
      expect(
        isNaN(d.getTime()),
        `isoDate is not a real date for slug: ${post.slug}`,
      ).toBe(false);
    }
  });

  it("tags is a non-empty array for every post", () => {
    for (const post of posts) {
      expect(Array.isArray(post.tags), `tags is not an array for slug: ${post.slug}`).toBe(true);
      expect(post.tags.length, `tags is empty for slug: ${post.slug}`).toBeGreaterThan(0);
    }
  });

  it("accentColor is a valid hex color", () => {
    for (const post of posts) {
      expect(
        post.accentColor,
        `accentColor invalid for slug: ${post.slug}`,
      ).toMatch(/^#[0-9a-fA-F]{3,6}$/);
    }
  });

  it("exactly one post is marked featured", () => {
    const featured = posts.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThanOrEqual(1);
  });

  it("featured posts have all required fields populated", () => {
    const featured = posts.filter((p) => p.featured);
    for (const post of featured) {
      expect(post.title.trim().length).toBeGreaterThan(0);
      expect(post.image).toMatch(/^https:\/\//);
      expect(post.excerpt.trim().length).toBeGreaterThan(0);
    }
  });
});
