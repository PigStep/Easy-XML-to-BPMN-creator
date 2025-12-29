from pydantic import BaseModel


class SExampleBPMN(BaseModel):
    status: bool = True
    xml: str


class SUserInputData(BaseModel):
    user_input: str


class SAgentOutput(BaseModel):
    status: bool = True
    output: str
