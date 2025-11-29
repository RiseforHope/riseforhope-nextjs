import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 1. Point to the new 'events' folder
const eventsDirectory = path.join(process.cwd(), 'events');

export interface EventPost {
    slug: string;
    title: string;
    date: string;
    location: string;
    category: string;
    excerpt: string;
    image?: string;
    content: string;
}

export function getUpcomingEvents(): EventPost[] {
    if (!fs.existsSync(eventsDirectory)) return [];

    const fileNames = fs.readdirSync(eventsDirectory);
    const today = new Date().toISOString().split('T')[0]; // Get "YYYY-MM-DD"

    const allEvents = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(eventsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            location: data.location || 'TBD',
            category: data.category || 'General',
            excerpt: data.excerpt,
            image: data.image,
            content: content,
        };
    });

    // FILTER: Only show events equal to or after "Today"
    const upcoming = allEvents.filter((event) => event.date >= today);

    // SORT: Ascending (Closest date first)
    return upcoming.sort((a, b) => (a.date > b.date ? 1 : -1));
}

export function getPastEvents(): EventPost[] {
    if (!fs.existsSync(eventsDirectory)) return [];

    const fileNames = fs.readdirSync(eventsDirectory);
    const today = new Date().toISOString().split('T')[0];

    const allEvents = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(eventsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            title: data.title,
            date: data.date,
            location: data.location || 'TBD',
            category: data.category || 'General',
            excerpt: data.excerpt,
            image: data.image,
            content: content,
        };
    });

    // FILTER: Only show events BEFORE today
    const past = allEvents.filter((event) => event.date < today);

    // SORT: Descending (Newest past event first)
    return past.sort((a, b) => (a.date < b.date ? 1 : -1));
}