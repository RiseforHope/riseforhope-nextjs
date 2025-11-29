import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    image?: string;
    content: string;
}

// 1. Get all posts for the list
export function getAllPosts(): BlogPost[] {
    // If content folder doesn't exist, return empty
    if (!fs.existsSync(contentDirectory)) return [];

    const fileNames = fs.readdirSync(contentDirectory);

    const allPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(contentDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            image: data.image,
            content: content,
        };
    });

    // Sort posts by date (newest first)
    return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 2. Get a specific post by slug (e.g., "welcome")
export function getPostBySlug(slug: string): BlogPost | null {
    const fullPath = path.join(contentDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        image: data.image,
        content: content,
    };
}