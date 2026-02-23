import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const frameCount = 163; // based on 00030 to 00192 (163 frames)
        const currentFrame = index => `/serum_video/${(index + 30).toString().padStart(5, '0')}.png`;

        const images = [];
        const serum = {
            frame: 0
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = currentFrame(i);
            images.push(img);
        }

        const render = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Draw image covering center
            const img = images[serum.frame];
            if (img && img.complete) {
                const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width / 2) - (img.width / 2) * scale;

                // Calculate vertically centered Y, then push it down by 80px to clear the Navbar
                const y = (canvas.height / 2) - (img.height / 2) * scale + 80;

                context.drawImage(img, x, y, img.width * scale, img.height * scale);
            }
        };

        images[0].onload = render;

        gsap.to(serum, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: "#hero-section",
                start: "top top",
                end: "+=3000",
                scrub: 1,
                pin: true,
            },
            onUpdate: render
        });

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            render();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="bg-blush min-h-screen">
            {/* Hero Section with Canvas */}
            <section id="hero-section" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0"></canvas>

                <div className="z-10 text-center text-white mix-blend-difference pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-6xl md:text-8xl font-serif mb-4"
                    >
                        Her Glowing Aura
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="uppercase tracking-[0.3em] text-sm md:text-lg"
                    >
                        Radiance Serum
                    </motion.p>
                </div>
            </section>

            {/* Rest of home page content */}
            <section className="py-24 px-8 max-w-7xl mx-auto text-center" style={{ marginTop: '50px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-dark">The Secret to Luminescence</h2>
                    <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed mb-12">
                        Infused with 24k gold flakes and rare botanical extracts, our Radiance Serum absorbs instantly to deliver deep hydration and unparalleled glow. Discover the essence of luxury skincare.
                    </p>
                    <a href="/product" className="inline-block border text-center uppercase border-dark py-4 px-12 tracking-widest hover:bg-rosegold hover:text-white hover:border-rosegold transition-all duration-300">
                        Discover More
                    </a>
                </motion.div>
            </section>

            {/* Ingredients Section */}
            <section className="py-24 px-8 bg-surface w-full">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-gold uppercase tracking-[0.3em] text-sm">Purest Elements</span>
                        <h2 className="text-4xl md:text-5xl font-serif mt-4 text-dark">The Science of Glow</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="p-8 border border-blush hover:shadow-xl transition-shadow duration-300 bg-white"
                        >
                            <div className="w-16 h-16 rounded-full bg-blush mx-auto flex items-center justify-center mb-6 text-2xl">✨</div>
                            <h3 className="text-xl font-serif mb-4 text-dark">24K Pure Gold</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Enhances skin elasticity, stimulates cell production, and provides an immediate radiant complexion.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="p-8 border border-blush hover:shadow-xl transition-shadow duration-300 bg-white"
                        >
                            <div className="w-16 h-16 rounded-full bg-blush mx-auto flex items-center justify-center mb-6 text-2xl">🌿</div>
                            <h3 className="text-xl font-serif mb-4 text-dark">White Truffle Extract</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Rich in amino acids and minerals, it deeply repairs and nourishes fatigued skin.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="p-8 border border-blush hover:shadow-xl transition-shadow duration-300 bg-white"
                        >
                            <div className="w-16 h-16 rounded-full bg-blush mx-auto flex items-center justify-center mb-6 text-2xl">💧</div>
                            <h3 className="text-xl font-serif mb-4 text-dark">Hyaluronic Acid</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">Multi-molecular weights penetrate various skin layers for intense, long-lasting hydration.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Ritual Section */}
            <section className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        src="/aurielle-serum.png"
                        alt="Applying Aurielle Serum"
                        className="w-full h-[600px] object-cover rounded-sm shadow-2xl"
                    />
                </div>
                <div className="w-full md:w-1/2 space-y-8">
                    <span className="text-gold uppercase tracking-[0.3em] text-sm">Application</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-dark">The Aurielle Ritual</h2>
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex gap-4"
                        >
                            <span className="text-2xl font-serif text-rosegold">01</span>
                            <div>
                                <h4 className="font-serif text-xl text-dark mb-2">Cleanse</h4>
                                <p className="text-gray-600 text-sm">Begin with freshly cleansed and toned skin for optimal absorption.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex gap-4"
                        >
                            <span className="text-2xl font-serif text-rosegold">02</span>
                            <div>
                                <h4 className="font-serif text-xl text-dark mb-2">Apply</h4>
                                <p className="text-gray-600 text-sm">Dispense 2-3 drops of the Radiance Serum into the palm of your hand.</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex gap-4"
                        >
                            <span className="text-2xl font-serif text-rosegold">03</span>
                            <div>
                                <h4 className="font-serif text-xl text-dark mb-2">Massage</h4>
                                <p className="text-gray-600 text-sm">Gently press and massage into face and neck using upward strokes.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-24 px-8 bg-dark text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-serif mb-6">Join The Inner Circle</h2>
                    <p className="text-gray-400 mb-10 text-sm leading-relaxed">
                        Subscribe to receive exclusive access to new launches, private sales, and expert skincare advice.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-6 py-4 w-full sm:w-96 bg-transparent border border-gray-600 text-white focus:outline-none focus:border-gold transition-colors"
                        />
                        <button type="button" className="bg-gold text-dark px-8 py-4 uppercase tracking-widest text-sm hover:bg-white transition-colors duration-300">
                            Subscribe
                        </button>
                    </form>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
