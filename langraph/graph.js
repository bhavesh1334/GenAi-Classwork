import 'dotenv/config';
import { StateGraph, Annotation } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage } from '@langchain/core/messages';


const llm = new ChatOpenAI({
    model: 'gpt-4o-mini',
});

const GraphAnnotation = Annotation.Root({
    messages: Annotation({
        reducer: (x, y) => x.concat(y),
        default: () => []
    })
})


//Create Node
async function callOpenAI(state) {
    console.log(`Inside callOpenAI`, state);
    const response = await llm.invoke(state.messages)
    return {
        messages: [response],
    };
}

const workflow = new StateGraph(GraphAnnotation)
    .addNode('callOpenAI', callOpenAI)
    .addEdge('__start__', 'callOpenAI')
    .addEdge('callOpenAI', '__end__');

const graph = workflow.compile();

async function runGraph() {
    const userQuery = "hey , How you doing?"
    const updatedState = await graph.invoke({
        messages: [new HumanMessage(userQuery)]
    })
    console.log(updatedState, "updatedState")
}

runGraph()