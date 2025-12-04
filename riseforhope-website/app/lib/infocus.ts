import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the 'infocus' folder at the root of your project
const infocusDirectory = path.join(process.cwd(), 'infocus');

export interface InFocusPost {
    slug: string;
    title: string;
    buttonText: string;
    excerpt: string;
    image: string;
    imageCaption?: string;
    content: string;
}

// --- FUNCTION 1: GET ALL POSTS (This was missing) ---
export function getAllInFocus(): InFocusPost[] {
    // Safety check: if folder doesn't exist, return empty list
    if (!fs.existsSync(infocusDirectory)) return [];

    const fileNames = fs.readdirSync(infocusDirectory);

    const allPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(infocusDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            buttonText: data.buttonText || 'Read More',
            excerpt: data.excerpt,
            image: data.image,
            imageCaption: data.imageCaption || null,
            content: content,
        };
    });

    return allPosts;
}

// --- FUNCTION 2: GET SINGLE POST ---
export function getInFocusBySlug(slug: string): InFocusPost | null {
    const fullPath = path.join(infocusDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        title: data.title,
        buttonText: data.buttonText || 'Read the story',
        excerpt: data.excerpt,
        image: data.image,
        imageCaption: data.imageCaption || null,
        content: content,
    };
}