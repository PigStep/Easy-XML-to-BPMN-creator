from ..state import getBpmnClient, BPMNState
from src.ai_generation.llm_client import LLMClient
from src.ai_generation.promt_manager import get_prompt_manager

# Plan the task


def plan(
    state: BPMNState,
    promt_manager=None,
    llm: LLMClient = None,
) -> BPMNState:
    if llm is None:
        llm = getBpmnClient()
    if promt_manager is None:
        promt_manager = get_prompt_manager()

    promt = promt_manager.get_prompt()
    response = llm.generate_response_text_based()
    return {**state, "messages": response}
