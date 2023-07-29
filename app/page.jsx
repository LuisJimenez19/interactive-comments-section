
"use client"
import "./globals.css";
import CommentsSection from "./components/CommentsSection";
import Context from "./context/Context";

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
