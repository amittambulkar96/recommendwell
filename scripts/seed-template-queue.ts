/**
 * Seed script to populate the Redis template queue from data/template-keywords.json
 * Run with: bun scripts/seed-template-queue.ts
 */
import "dotenv/config";
import {
  seedTemplateQueueFromKeywords,
  getTemplateQueueSize,
  getCompletedTemplateJobs,
} from "@/lib/upstash";

async function main() {
  console.log("Starting template queue seed...\n");

  await seedTemplateQueueFromKeywords();

  const queueSize = await getTemplateQueueSize();
  const completedJobs = await getCompletedTemplateJobs();

  console.log(`\n--- Template Queue Status ---`);
  console.log(`Pending template jobs: ${queueSize}`);
  console.log(`Completed template jobs: ${completedJobs.length}`);

  if (queueSize > 0) {
    console.log(`\nQueue is ready for automated generation.`);
  } else {
    console.log(`\nAll template jobs have been generated!`);
  }
}

main()
  .then(() => {
    console.log("\nDone!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
