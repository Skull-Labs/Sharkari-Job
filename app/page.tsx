import { HomeView } from "@/components/home/HomeView";
import { posts } from "@/data/posts";
import { getClosingSoon, getLatestByCategory, getUpcomingEvents, getUrgent } from "@/lib/filters";

export default function Home() {
  return (
    <HomeView
      jobs={getLatestByCategory(posts, "jobs", 8)}
      results={getLatestByCategory(posts, "results", 8)}
      closingSoon={getClosingSoon(posts, 6)}
      urgent={getUrgent(posts)}
      upcoming={getUpcomingEvents(posts, new Date(), 8)}
    />
  );
}
