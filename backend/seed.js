require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const seedProducts = [
    {
        name: "Premium Wireless Headphones",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
        description: "Experience premium sound quality with active noise cancellation.",
        longDescription: "These premium wireless over-ear headphones deliver high-fidelity audio, featuring advanced active noise cancellation to block out distractions. Enjoy up to 30 hours of battery life and extreme comfort for all-day listening.",
        specs: ["Active Noise Cancellation", "30-Hour Battery Life", "Bluetooth 5.2", "High-Resolution Audio"]
    },
    {
        name: "Minimalist Smartwatch",
        price: 199.50,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600",
        description: "A sleek, minimalist smartwatch with health tracking and elegant design.",
        longDescription: "Stay connected in style. This minimalist smartwatch offers continuous heart rate monitoring, sleep tracking, and smartphone notifications wrapped in a beautifully crafted stainless steel body.",
        specs: ["Heart Rate Monitor", "Water Resistant", "7-Day Battery", "OLED Display"]
    },
    {
        name: "Mechanical Keyboard",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600",
        description: "Tactile mechanical keyboard designed for maximum typing efficiency.",
        longDescription: "Elevate your typing and gaming experience with custom tactile switches, per-key RGB backlighting, and a premium aluminum frame for unmatched durability and performance.",
        specs: ["Tactile Switches", "Per-Key RGB", "Aluminum Frame", "USB-C Connectivity"]
    },
    {
        name: "4K Action Camera",
        price: 349.00,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600",
        description: "Capture your adventures in stunning 4K detail.",
        longDescription: "Built for the extreme, this rugged action camera records crystal-clear 4K video at 60fps. It features advanced image stabilization, waterproofing up to 33ft without a case, and voice control.",
        specs: ["4K@60fps Video", "HyperSmooth Stabilization", "Waterproof 33ft", "Voice Control"]
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_practical');
        console.log('MongoDB Connected to seed db');
        
        await Product.deleteMany({});
        console.log('Old products removed');
        
        await Product.insertMany(seedProducts);
        console.log('Dummy products with descriptions seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB();
