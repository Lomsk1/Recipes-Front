"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function HomeIntroduce() {
  const componentRef = useRef<HTMLInputElement | null>(null);
  const [splatText, setSplatText] = useState<HTMLInputElement | any>([]);

  useEffect(() => {
    let text = "მოგესალმებით რეცეპტების სამყაროში";
    setSplatText(text.split(""));
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let tl = gsap.timeline();
      tl.to(".inner", {
        scale: 1,
        duration: 1.5,
      });
      tl.to(".starter_filter", { display: "none", duration: 0.01 });
      tl.to("#introduction_title", { x: 0, opacity: 1, duration: 1 });
      tl.to("#introduction_text", { x: 0, opacity: 1, duration: 1 });
      tl.to("#start_", { y: 0, opacity: 1, duration: 1 });
    }, componentRef);
    return () => ctx.revert();
  }, []);
  return (
    <section className="home_introduce" ref={componentRef}>
      {/* Filter */}
      <div className="starter_filter">
        <div className="inner"></div>
      </div>
      {/* Information */}
      <div className="introduction">
        <h1 id="introduction_title">
          {splatText &&
            splatText.map((data: string, i: number) => (
              <span key={i}>{data}</span>
            ))}
        </h1>
        <p id="introduction_text">
          ეს არის პლატფორმა, სადაც შეგიძლიათ სასურველი რეცეპტის მოძიება
          შეზღუდული იგრედიენტებით!
        </p>
        <Link href={"/choose_ingredients"} id="start_">
          დაწყება
        </Link>
      </div>
    </section>
  );
}

export default HomeIntroduce;
