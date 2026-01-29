/**
 * Seed script to populate the Redis example queue from data/example-keywords.json
 * Run with: bun scripts/seed-example-queue.ts
 */
import "dotenv/config";
import {
  seedExampleQueueFromKeywords,
  getExampleQueueSize,
  getCompletedExampleJobs,
} from "@/lib/upstash";

async function main() {
  console.log("Starting example queue seed...\n");

  await seedExampleQueueFromKeywords();

  const queueSize = await getExampleQueueSize();
  const completedJobs = await getCompletedExampleJobs();

  console.log(`\n--- Example Queue Status ---`);
  console.log(`Pending example jobs: ${queueSize}`);
  console.log(`Completed example jobs: ${completedJobs.length}`);

  if (queueSize > 0) {
    console.log(`\nQueue is ready for automated generation.`);
  } else {
    console.log(`\nAll example jobs have been generated!`);
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
