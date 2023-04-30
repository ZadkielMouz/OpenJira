

interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries: [
        {
            description: "Pending: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat fuga nostrum aliquid ullam inventore. Doloribus consequuntur dolore amet sit quis illo nobis perferendis pariatur, expedita autem nulla quidem illum beatae?",
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: "In Progress: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, soluta enim. Hic placeat provident nulla, eligendi optio, consectetur quo recusandae enim necessitatibus dolore, mollitia architecto commodi blanditiis rerum delectus debitis.",
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: "Finished: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat fuga nostrum aliquid ullam inventore. Doloribus consequuntur dolore amet sit quis illo nobis perferendis pariatur, expedita autem nulla quidem illum beatae?",
            status: 'finished',
            createdAt: Date.now() - 100000
        }
    ]
}