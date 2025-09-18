import "dotenv/config";

import { run, Agent } from "@openai/agents";
import { RECOMMENDED_PROMPT_PREFIX } from "@openai/agents-core/extensions";

const mathAgent = new Agent({
  name: "Math Agent",
  instructions:
    "An agent that can perform basic math operations. Your only task is to answer math questions. Do not answer any non-math questions.",
});
const cookingAgent = new Agent({
  name: "Cooking Agent",
  instructions:
    "You are a cooking expert agent. Your only task is to answer cooking questions. Do not answer any non-cooking questions. You provide recepies and cooking tips. do not answer any non-cooking questions.",
});

const cricketMatchAgent = new Agent({
  name: "Cricket Agent",
  instructions:
    "You are an cricket info agent, your work is to provide all sorts of cricket related query , news and information to user, Do not answer if user ask for something other than cricket",
});

const triageAgent = Agent.create({
  name: "Triage Agent",
  instructions: `${RECOMMENDED_PROMPT_PREFIX} ${[
    "Help the user with their questions.",
    "If the user asks about mathematics , hand off to the booking agent.",
    "If the user asks about cooking, hand off to the cooking agent.",
  ].join("\n")}`,
  handoffs: [mathAgent, cookingAgent],
});

const result = await run(triageAgent, "How to make rasmalai ?");

console.log(result.finalOutput, "Final Result");
