import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";
import { CosmicBackground } from "@/components/CosmicBackground";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amrutha — AI & Data Science Engineer" },
      { name: "description", content: "Portfolio of Amrutha S — AI/DS engineer building intelligent, secure, human-centred systems. Research, hackathon wins, and open-source projects." },
      { property: "og:title", content: "Amrutha — AI & Data Science Engineer" },
      { property: "og:description", content: "Research, hackathon wins, and human-centred AI systems." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <CosmicBackground />
      <Portfolio />
    </>
  );
}