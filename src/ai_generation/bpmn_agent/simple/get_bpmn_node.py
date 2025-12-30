from .state import SimpleBPMNAgent
from ...llm_client import LLMClient
from ...promts import XML_PROMPT


def generate_bpmn(state: SimpleBPMNAgent, llm: LLMClient) -> SimpleBPMNAgent:
    user_prompt = state["user_input"]
    result = llm.generate_response_text_based(user_prompt, XML_PROMPT, "high")

    return {**state, "previous_answer": result}
