import { runMemoryAgent, runAiSupportAgent } from './agents';
import { createInterface } from 'readline';
import { Langbase } from 'langbase';

const langbase = new Langbase({
    apiKey: process.env.LANGBASE_API_KEY!,
});

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function startConversation() {
    console.log('🤖 Starting conversational AI agent...');
    console.log('Type "quit" or "exit" to end the conversation.\n');

    let threadId: string | undefined;

    const askQuestion = () => {
        rl.question('You: ', async (query) => {
            if (query.toLowerCase() === 'quit' || query.toLowerCase() === 'exit') {
                console.log('\n👋 Goodbye!');
                rl.close();
                return;
            }

            if (!query.trim()) {
                askQuestion();
                return;
            }

            try {
                console.log('\n🔍 Searching knowledge base...');
                const chunks = await runMemoryAgent(query);

                console.log('🤔 Generating response...');
                const result = await runAiSupportAgent({
                    chunks,
                    query,
                    threadId,
                });

                // Use threadId from response for subsequent messages
                if (!threadId && result.threadId) {
                    threadId = result.threadId;
                    console.log(`💬 Conversation thread created (ID: ${threadId})`);
                }

                console.log('\nAI:', result.completion);
                console.log('\n' + '─'.repeat(50) + '\n');
            } catch (error) {
                console.error('Error:', error);
            }

            askQuestion();
        });
    };

    askQuestion();
}

startConversation();