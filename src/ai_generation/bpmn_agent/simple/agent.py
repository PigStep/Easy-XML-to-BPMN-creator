from langgraph.graph import START, END, StateGraph
from functools import partial

from ...llm_client import get_llm_client
from .state import SimpleBPMNAgent
from .get_bpmn_node import generate_bpmn
from ....schemas import SUserInputData


llm = get_llm_client()
agent_builder = StateGraph(SimpleBPMNAgent)


generate_bpmn_with_config = partial(generate_bpmn, llm=llm)


agent_builder.add_node("generate", generate_bpmn_with_config)


agent_builder.add_edge(START, "generate")
agent_builder.add_edge("generate", END)

agent = agent_builder.compile()


def get_agent_answer(initial_state: dict) -> dict:
    result = agent.invoke(initial_state)
    return result


def invoke_agent(user_input: SUserInputData) -> str:
    initial_state = {
        "user_input": user_input.user_input,
        "previous_stage": "",
    }
    return get_agent_answer(initial_state)
