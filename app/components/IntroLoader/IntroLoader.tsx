"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import "./style.scss";

const LOADER_DURATION = 3500; // ms

const IntroLoader = () => {
    const [isComplete, setIsComplete] = useState(false);
    const [hasRun, setHasRun] = useState(false);

    const loaderRef = useRef<HTMLDivElement>(null);
    const logoBaseRef = useRef<HTMLDivElement>(null);
    const logoFillRef = useRef<HTMLDivElement>(null);
    const progressTrackRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLDivElement>(null);

    /* Only run once per session */
    useEffect(() => {
        if (typeof window !== "undefined") {
            const seen = sessionStorage.getItem("tsol-intro-done");
            if (seen) {
                setIsComplete(true);
                setHasRun(true);
            }
        }
    }, []);

    useLayoutEffect(() => {
        if (isComplete || hasRun) return;
        setHasRun(true);

        // Lock body scroll during the animation
        document.body.style.overflow = "hidden";

        const tl = gsap.timeline({
            onComplete: () => {
                setIsComplete(true);
                document.body.style.overflow = "";
                sessionStorage.setItem("tsol-intro-done", "1");
            },
        });

        // Setup initial states
        tl.set(logoFillRef.current, { clipPath: "inset(0 100% 0 0)" })
            .set(progressBarRef.current, { scaleX: 0 })
            .set(progressTextRef.current, { opacity: 0, y: 10 })
            .set(logoBaseRef.current, { opacity: 0, scale: 0.95 });

        // Step 1: Fade in base logo and progress assets gently
        tl.to(
            [logoBaseRef.current, progressTrackRef.current],
            {
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.1,
            }
        ).to(
            progressTextRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            },
            "-=1"
        );

        // Custom object to tween the progress percentage
        const progressCount = { val: 0 };

        // Step 2: The actual loading sequence
        tl.to(
            progressBarRef.current,
            {
                scaleX: 1,
                duration: 2.2,
                ease: "expo.inOut",
            },
            "-=0.2"
        )
            .to(
                logoFillRef.current,
                {
                    clipPath: "inset(0 0% 0 0)", // Reveal the bright logo from left to right matching progress
                    duration: 2.2,
                    ease: "expo.inOut",
                },
                "<" // Run exactly parallel with the progress bar
            )
            .to(
                progressCount,
                {
                    val: 100,
                    duration: 2.2,
                    ease: "expo.inOut",
                    onUpdate: function () {
                        if (progressTextRef.current) {
                            progressTextRef.current.innerHTML =
                                Math.round(progressCount.val) + "<span>%</span>";
                        }
                    },
                },
                "<" // Run parallel
            );

        // Step 3: Hold momentarily when full
        tl.to({}, { duration: 0.3 });

        // Step 4: Explosive/Stunning exit
        tl.to(
            [progressTrackRef.current, progressTextRef.current],
            {
                opacity: 0,
                y: -10,
                duration: 0.6,
                ease: "power3.in",
            }
        )
            .to(
                [logoBaseRef.current, logoFillRef.current],
                {
                    scale: 1.15,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power4.inOut",
                },
                "-=0.4"
            )
            .to(
                loaderRef.current,
                {
                    yPercent: -100, // Slide the whole black wrapper up
                    duration: 1.2,
                    ease: "power4.inOut",
                },
                "-=0.5"
            );

    }, [isComplete, hasRun]);

    if (isComplete) return null;

    return (
        <div className="new-intro-loader" ref={loaderRef} aria-hidden="true">
            <div className="new-intro-loader-content">
                <div className="new-intro-logo-container">
                    {/* Dimmed Base Logo */}
                    <div className="new-intro-logo-base" ref={logoBaseRef}>
                        <Image
                            src="/images/TSOL-black-logo.png"
                            alt="TSOL"
                            width={320}
                            height={76}
                            priority
                            className="new-intro-logo-image"
                        />
                    </div>
                    {/* Bright Filled Logo that gets revealed by clipping */}
                    <div className="new-intro-logo-fill" ref={logoFillRef}>
                        <Image
                            src="/images/TSOL-black-logo.png"
                            alt="TSOL"
                            width={320}
                            height={76}
                            priority
                            className="new-intro-logo-image filler"
                        />
                    </div>
                </div>
            </div>

            <div className="new-intro-loader-bottom">
                <div className="new-intro-progress-text" ref={progressTextRef}>
                    0<span>%</span>
                </div>
                <div className="new-intro-progress-track" ref={progressTrackRef}>
                    <div className="new-intro-progress-bar" ref={progressBarRef} />
                </div>
            </div>
        </div>
    );
};

export default IntroLoader;
