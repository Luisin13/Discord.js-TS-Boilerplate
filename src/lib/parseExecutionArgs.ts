export function parseExecutionArgs(args: string[]): returnData {
  args = args.slice(2);

  const returnData = { shouldDeployCommandsToTestGuild: false };

  if (
    args.includes('--deployGuild') ||
    args.includes('-deployGuild') ||
    args.includes('--dg') ||
    args.includes('-dg')
  )
    returnData.shouldDeployCommandsToTestGuild = true;

  return returnData;
}

type returnData = {
  shouldDeployCommandsToTestGuild: boolean;
};
