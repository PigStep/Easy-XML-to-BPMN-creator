from pydantic import BaseModel


class SExampleBPMN(BaseModel):
    status: bool = True
    xml: str
