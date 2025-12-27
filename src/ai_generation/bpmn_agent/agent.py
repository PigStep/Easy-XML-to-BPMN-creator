from langgraph.graph import StateGraph, START, END
from functools import partial
from src.ai_generation.managers.promt import get_prompt_manager
from src.ai_generation.managers.json_schema import get_json_schema_namager
from .state import BPMNState, getBpmnClient
from .nodes.plan import plan

promt_manager = get_prompt_manager()
schema_manager = get_json_schema_namager()
llm = getBpmnClient()


plan_with_config = partial(
    plan, prompt_manager=promt_manager, llm=llm, schema_manager=schema_manager
)


# Build workflow
agent_builder = StateGraph(BPMNState)

# Add nodes
agent_builder.add_node("plan", plan_with_config)

# Define edges
agent_builder.add_edge(START, "plan")
agent_builder.add_edge("plan", END)

# Compile the agent
agent = agent_builder.compile()


def get_agent():
    return agent
