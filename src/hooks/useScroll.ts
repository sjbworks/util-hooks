import { useEffect, useRef, useState, useCallback } from "react";
import { SECTION_ID } from "../constants";

type SectionIdType = (typeof SECTION_ID)[keyof typeof SECTION_ID];

interface Sections {
  overview: HTMLElement | null;
  topSong: HTMLElement | null;
  badge: HTMLElement | null;
}

export const useScroll = () => {
  // 🔧 修正1: sectionsはuseRefで保持（setStateを使わない）
  const sectionsRef = useRef<Sections>({
    overview: null,
    topSong: null,
    badge: null,
  });

  const setSectionRefs = useCallback(
    (key: keyof Sections) => (el: HTMLElement | null) => {
      if (sectionsRef.current[key] !== el) {
        sectionsRef.current[key] = el;
      }
    },
    []
  );
  const [activeTab, setActiveTab] = useState<SectionIdType>(
    SECTION_ID.overview
  );
  const isManualScroll = useRef(false);

  const scrollToSection = (id: SectionIdType) => {
    const ref = Object.entries(SECTION_ID).find(
      ([, value]) => value === id
    )?.[0] as keyof Sections;
    const el = sectionsRef.current[ref];
    if (el) {
      isManualScroll.current = true;
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({
        top,
        behavior: "smooth",
      });

      // 500ms後にmanual scroll終了とみなす（調整可）
      setTimeout(() => {
        isManualScroll.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScroll.current) return;

      // ページ下部に近い場合は例外的に最後のセクションをアクティブにする
      if (
        window.innerHeight + window.scrollY >=
        document.body.scrollHeight - 50
      ) {
        setActiveTab(SECTION_ID.badge);
        return;
      }

      let current: SectionIdType = SECTION_ID.overview;
      let closestToCenter = Infinity;

      Object.entries(sectionsRef.current).forEach(([key, el]) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distanceToCenter = Math.abs(
            window.innerHeight / 2 - sectionCenter
          );

          if (distanceToCenter < closestToCenter) {
            closestToCenter = distanceToCenter;
            current = SECTION_ID[key as keyof typeof SECTION_ID];
          }
        }
      });

      setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    console.log("Active tab changed:", activeTab);
  }, [activeTab]);

  return { setSectionRefs, activeTab, scrollToSection };
};
