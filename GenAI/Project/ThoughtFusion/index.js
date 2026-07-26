import "./config/dotenv.js";
import readline from "readline/promises";
import chalk from "chalk";
import ora from "ora";

import openAIResponse from "./ai-models/open-ai.js";
import geminiAIResponse from "./ai-models/google-ai.js";
import nvidiaAIResponse from "./ai-models/nvidia-ai.js";
import openrouterAIResponse from "./ai-models/openrouter-ai(evaluator).js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();

console.log(
  chalk.cyan.bold(`
╔════════════════════════════════════════════════════╗
║          THOUGHT FUSION v1.0                       ║
╚════════════════════════════════════════════════════╝
`)
);

async function main() {
  try {
    const prompt = await rl.question(chalk.yellow.bold("❯ YOU > "));

    const spinner = ora("Generating responses from AI models...").start();

    const [openai, gemini, nvidia] = await Promise.all([
      openAIResponse(prompt),
      geminiAIResponse(prompt),
      nvidiaAIResponse(prompt),
    ]);

    spinner.succeed("Responses Generated");

    console.log(chalk.blue.bold("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
    console.log(chalk.blue.bold("📦 Candidate Responses"));
    console.log(chalk.blue.bold("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));

    const models = [openai, gemini, nvidia];

    models.forEach((m, i) => {
      console.log(chalk.green(`Model ${i + 1}: ${m.model_name}`));
      console.log(chalk.white(m.response));
      console.log(chalk.gray("──────────────────────────────────────"));
    });

    const evaluateSpinner = ora("Evaluating Responses...").start();

    const finalAnswer = await openrouterAIResponse({
      user_query: prompt,
      candidate_answers: models,
    });

    evaluateSpinner.succeed("Evaluation Complete");

    console.log(
      chalk.magenta.bold("\n══════════════════════════════════════")
    );
    console.log(chalk.magenta.bold("🏆 FINAL ANSWER"));
    console.log(
      chalk.magenta.bold("══════════════════════════════════════\n")
    );

    console.log(chalk.green.bold("Best Model : "), finalAnswer.best_model);

    console.log("\nScores:");

    finalAnswer.models.forEach((m) => {
      console.log(
        `${chalk.cyan(m.model_name.padEnd(12))} ⭐ ${m.score}/10`
      );
    });

    console.log(
      chalk.yellow.bold("\nFinal Response:\n")
    );

    console.log(chalk.white(finalAnswer.response));

    console.log(
      chalk.green.bold("\n✔ Self Consistency Completed Successfully\n")
    );
  } catch (err) {
    console.log(chalk.red.bold("\n❌ Error\n"));
    console.error(err);
  } finally {
    rl.close();
  }
}

main();