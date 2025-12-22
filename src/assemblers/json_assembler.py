import json
import os
import logging
from typing import List

logger = logging.getLogger(__name__)


class JSONAssembler:
    def __init__(self, unified_schema: dict | None = None):
        self.schemas = None
        self.unified_schema = (
            {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Unified BPMN Project Schema",
                "description": "Schema that unifies process, markup, streams, and validation",
                "type": "object",
                "properties": {},
                "definitions": {},
            }
            if unified_schema is None
            else unified_schema
        )

    def create_unified_schema(self, shemas: List[dict]) -> dict:
        # Fill definitions and properties
        for schema_content in shemas:
            # Definition name (e.g., Process, Layout)
            def_name = schema_content["schema_name"].capitalize()

            # Add to definitions
            self.unified_schema["definitions"][def_name] = schema_content

            # Add reference in root object's properties
            self.unified_schema["properties"][schema_content["schema_name"]] = {
                "$ref": f"#/definitions/{def_name}"
            }

        return self.unified_schema

    def save_unified_schema(self, output_file: str) -> bool:
        if not self.unified_schema:
            logger.error("Unable to save empty schema.")
            return False
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(self.unified_schema, f, indent=4, ensure_ascii=False)

        return True
