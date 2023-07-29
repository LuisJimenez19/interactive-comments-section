"use client";
import "./globals.css";
import CommentsSection from "./components/CommentsSection";
import Context from "./context/Context";
export const config = { unstable_runtimeJS: false };
function HomePage() {
  return (
    <div className="app">
      <Context>
        <CommentsSection />
      </Context>
    </div>
  );
}

export default HomePage;
