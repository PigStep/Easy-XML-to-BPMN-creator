from src.ai_generation.llm_client import get_settings
from ..state import getBpmnClient, BPMNState
from src.ai_generation.llm_client import LLMClient

# Plan the task


def plan(
    state: BPMNState, prompt: str, settings: dict = None, llm: LLMClient = None
) -> BPMNState:
    if settings is None:
        settings = get_settings()
    if llm is None:
        llm = getBpmnClient()

    response = llm.generate_response_text_based()
    return {**state, "messages": response}
