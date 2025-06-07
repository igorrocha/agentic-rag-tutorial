import { runMemoryAgent, runAiSupportAgent } from './agents';

async function main() {
    const query = 'Qual é a diferença entre CRPID e CRID?';
    const chunks = await runMemoryAgent(query);

    const completion = await runAiSupportAgent({
        chunks,
        query,
    });

    console.log('Query:', query);
    console.log('Completion:', completion);
}

main();