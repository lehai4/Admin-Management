import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
});

const configClient = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
if (!configClient.success) {
  console.error(configClient.error.issues);
  throw new Error("The values ​​declared in env are invalid");
}

const envConfig = configClient.data;
export default envConfig;
