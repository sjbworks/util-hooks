import { Link } from "react-router";
export const Home = () => {
  return (
    <>
      <h2>Home</h2>
      <ul
        style={{
          listStyleType: "disc",
          paddingLeft: "1.5rem",
          textAlign: "left",
        }}
      >
        <li>
          <Link to="/nav-guard">Navigation Guard</Link>
        </li>
        <li>
          <Link to="/scroll-tab">Scroll Tabs</Link>
        </li>
      </ul>
    </>
  );
};
