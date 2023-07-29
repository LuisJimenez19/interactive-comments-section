"use client";
import "./globals.css";
import CommentsSection from "./components/CommentsSection";
import Context from "./context/Context";
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const revalidate = 5
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
