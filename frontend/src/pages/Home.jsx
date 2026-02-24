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

        // Debounce resize to prevent breaking mobile on URL bar show/hide
        let resizeTimer;

        // Setup initial canvas dimensions properly with devicePixelRatio for sharpness
        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            // using window.innerWidth and innerHeight for accurate mobile dimensions
            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            // scale the context to match DPR
            context.scale(dpr, dpr);

            // set CSS size
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            return { width, height };
        };

        let dims = setCanvasSize();

        const frameCount = 163;
        const currentFrame = index => `/serum_video/${(index + 30).toString().padStart(5, '0')}.png`;

        const images = [];
        const serum = { frame: 0 };

        let loadedImages = 0;
        let animationTrigger = null;

        const render = () => {
            if (!images[serum.frame] || !images[serum.frame].complete) return;

            context.clearRect(0, 0, dims.width, dims.height);
            const img = images[serum.frame];

            // Scale correctly for responsive viewports
            const scale = Math.max(dims.width / img.width, dims.height / img.height);

            // Calculate center
            const x = (dims.width / 2) - (img.width / 2) * scale;
            const y = (dims.height / 2) - (img.height / 2) * scale + (window.innerWidth < 768 ? 40 : 80);

            context.drawImage(img, x, y, img.width * scale, img.height * scale);
        };

        // Advanced progressive image loading
        // Load first frame instantly
        const img0 = new Image();
        img0.src = currentFrame(0);
        images.push(img0);

        img0.onload = () => {
            loadedImages++;
            render(); // draw frame 0 immediately

            // Start loading the rest sequentially so browser doesn't block
            for (let i = 1; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                img.onload = () => {
                    loadedImages++;
                    // If we have loaded enough initial images, start the GSAP animation
                    if (loadedImages === 10 && !animationTrigger) {
                        initGSAP();
                    }
                };
                images.push(img);
            }
        };

        const initGSAP = () => {
            animationTrigger = gsap.to(serum, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                scrollTrigger: {
                    trigger: "#hero-section",
                    start: "top top",
                    end: "+=3000",
                    scrub: 1, // Smooth scrub vs instant
                    pin: true,
                    // Use fastScrollEnd on mobile to prevent staggering
                    fastScrollEnd: window.innerWidth < 768,
                },
                onUpdate: () => requestAnimationFrame(render) // RequestAnimationFrame optimizes rendering
            });
        };

        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Only resize if width actually changed (prevents mobile bug)
                if (dims.width !== window.innerWidth) {
                    dims = setCanvasSize();
                    render();
                    ScrollTrigger.refresh();
                }
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);
            ScrollTrigger.getAll().forEach(t => t.kill());
            if (animationTrigger) animationTrigger.kill();
        };
    }, []);

    return (
        <div className="bg-blush min-h-[100dvh]">
            {/* Hero Section with Canvas */}
            <section id="hero-section" className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} style={{ willChange: 'transform' }} className="absolute inset-0 z-0"></canvas>

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
