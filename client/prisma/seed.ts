import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const mockProducts = [
  {
    name: "Premium 3D Chair",
    price: 299.99,
    image: "/api/placeholder/300/300",
    description: "Ergonomic design with 3D visualization. This premium chair offers exceptional comfort and style for your workspace.",
    category: "Furniture",
    inStock: true,
    rating: 4.5,
    reviews: 128,
    features: JSON.stringify(["Ergonomic Design", "3D Visualization", "Premium Materials", "Adjustable Height"])
  },
  {
    name: "Smart Watch Pro",
    price: 399.99,
    image: "/api/placeholder/300/300",
    description: "Advanced smartwatch with health monitoring capabilities and seamless connectivity.",
    category: "Electronics",
    inStock: true,
    rating: 4.8,
    reviews: 256,
    features: JSON.stringify(["Health Monitoring", "GPS Tracking", "Water Resistant", "Long Battery Life"])
  },
  {
    name: "3D Gaming Headset",
    price: 199.99,
    image: "/api/placeholder/300/300",
    description: "Immersive 3D audio experience for gaming and entertainment.",
    category: "Electronics",
    inStock: false,
    rating: 4.3,
    reviews: 89,
    features: JSON.stringify(["3D Audio", "Noise Cancellation", "Comfortable Fit", "RGB Lighting"])
  },
  {
    name: "Designer Lamp",
    price: 149.99,
    image: "/api/placeholder/300/300",
    description: "Modern LED lamp with customizable colors and smart home integration.",
    category: "Home & Garden",
    inStock: true,
    rating: 4.2,
    reviews: 67,
    features: JSON.stringify(["LED Technology", "Color Customization", "Smart Home Compatible", "Energy Efficient"])
  },
  {
    name: "Wireless Speaker",
    price: 129.99,
    image: "/api/placeholder/300/300",
    description: "High-quality wireless speaker with exceptional sound clarity.",
    category: "Electronics",
    inStock: true,
    rating: 4.6,
    reviews: 194,
    features: JSON.stringify(["Wireless Connectivity", "High-Quality Sound", "Portable Design", "Long Battery"])
  },
  {
    name: "Office Desk",
    price: 449.99,
    image: "/api/placeholder/300/300",
    description: "Modern office desk with built-in storage and cable management.",
    category: "Furniture",
    inStock: true,
    rating: 4.4,
    reviews: 73,
    features: JSON.stringify(["Built-in Storage", "Cable Management", "Sturdy Construction", "Modern Design"])
  }
];

async function main() {
  console.log('Start seeding...');
  
  // Clear existing products
  await prisma.product.deleteMany({});
  
  // Create products
  for (const product of mockProducts) {
    await prisma.product.create({
      data: product,
    });
  }
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });