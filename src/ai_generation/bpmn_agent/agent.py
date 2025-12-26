from langgraph.graph import StateGraph, START, END
from .state import BPMNState
from .nodes.plan import plan

# Build workflow
agent_builder = StateGraph(BPMNState)

# Add nodes
agent_builder.add_node("plan", plan)

# Define edges
agent_builder.add_edge(START, "plan")
agent_builder.add_edge("plan", END)

# Compile the agent
agent = agent_builder.compile()


def get_agent():
    return agent
