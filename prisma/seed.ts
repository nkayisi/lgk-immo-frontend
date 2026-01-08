import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Créer les 4 espaces par défaut
    const spaces = [
        {
            type: "public",
            label: "Public",
            description: "Espace pour les particuliers et visiteurs",
        },
        {
            type: "locataire",
            label: "Locataire",
            description: "Espace pour les locataires",
        },
        {
            type: "bailleur",
            label: "Bailleur",
            description: "Espace pour les propriétaires et bailleurs",
        },
        {
            type: "commissionnaire",
            label: "Commissionnaire",
            description: "Espace pour les agents immobiliers et commissionnaires",
        },
    ];

    for (const space of spaces) {
        const existing = await prisma.space.findUnique({
            where: { type: space.type as "public" | "locataire" | "bailleur" | "commissionnaire" },
        });

        if (!existing) {
            await prisma.space.create({
                data: {
                    type: space.type as "public" | "locataire" | "bailleur" | "commissionnaire",
                    label: space.label,
                    description: space.description,
                },
            });
            console.log(`✅ Created space: ${space.label}`);
        } else {
            console.log(`⏭️  Space already exists: ${space.label}`);
        }
    }

    console.log("✨ Seeding completed!");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
