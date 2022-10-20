import { clientLogger } from '@/utils/crossFilesVariables';

export default function validateEnv(requiredEnvVariables: string[]) {
  for (const requiredVariable of requiredEnvVariables) {
    if (!process.env[requiredVariable]) {
      clientLogger.fatal(`Missing ${requiredVariable} environment variable`);
      process.exit(1);
    }
  }
}
