import { useScroll } from "../hooks/useScroll";
import { SECTION_ID } from "../constants";

export const ScrollTabsHightlight = () => {
  const { scrollToSection, activeTab, setSectionRefs } = useScroll();

  return (
    <>
      <h2>ScrollTabsHightlight</h2>
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          {(Object.keys(SECTION_ID) as (keyof typeof SECTION_ID)[]).map(
            (key) => {
              const isActive = activeTab === SECTION_ID[key];
              return (
                <button
                  key={SECTION_ID[key]}
                  onClick={() => scrollToSection(SECTION_ID[key])}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    backgroundColor: isActive ? "#3B82F6" : "#E5E7EB",
                    color: isActive ? "#FFFFFF" : "black",
                  }}
                >
                  {SECTION_ID[key]}
                </button>
              );
            }
          )}
        </div>

        <div
          style={{
            paddingTop: "5rem",
            display: "flex",
            flexDirection: "column",
            gap: "8rem",
          }}
        >
          <section
            id="section1"
            ref={setSectionRefs("overview")}
            style={{
              height: "100vh",
              backgroundColor: "#FEE2E2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ fontSize: "2.25rem" }}>Section 1</h2>
          </section>

          <section
            id="section2"
            ref={setSectionRefs("topSong")}
            style={{
              height: "100vh",
              backgroundColor: "#D1FAE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ fontSize: "2.25rem" }}>Section 2</h2>
          </section>

          <section
            id="section3"
            ref={setSectionRefs("badge")}
            style={{
              height: "10vh",
              backgroundColor: "#DBEAFE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h2 style={{ fontSize: "2.25rem" }}>Section 3</h2>
          </section>
        </div>
      </div>
    </>
  );
};
