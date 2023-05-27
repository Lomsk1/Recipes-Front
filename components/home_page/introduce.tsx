"use client";

import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CoffeeAnimation from "../loading/coffee";
import searchIcon from "../../assets/icons/search-white.png";
import SearchProductBox from "../searchResults/product";

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
        scale: window.innerWidth > 600 ? 1 : 2,
        duration: 1.5,
      });
      tl.to(".starter_filter", { display: "none", duration: 0.01 });
      tl.to("#introduction_title", { x: 0, opacity: 1, duration: 1 });
      tl.to("#introduction_text", { x: 0, opacity: 1, duration: 1 });
      tl.to(".slogan", { x: 0, opacity: 1, duration: 1 });
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
      <aside className="introduction">
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
        <span className="slogan">
          გსურთ საჭმლის მომზადება, მაგრამ არ იცით როგორ?
        </span>
        <span className="slogan">უბრალოდ გადაეშვით რეცეპტების სამყაროში!</span>
        <Link href={"/recipes-by-ingredients"} id="start_">
          მოგზაურობის დაწყება
        </Link>
      </aside>

      {/* Image Animation */}
      <aside className="side_image">
        {/* Title */}
        <h2>ინგრედიენტის მოძებნა</h2>
        {/* Search Form */}
        <form>
          <label htmlFor="search_all_recipe"></label>
          <input
            type="search"
            id="search_all_recipe"
            placeholder="შეიყვანეთ რეცეპტის სახელი"
          />
          <button>
            <Image src={searchIcon} alt="search" width={25} height={25} />
          </button>
        </form>
        <div className="search_results">
          <SearchProductBox />
        </div>
      </aside>
    </section>
  );
}

export default HomeIntroduce;
