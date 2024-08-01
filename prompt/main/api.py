from flask import make_response
from flask_restful import Api
from werkzeug.wrappers import Response
from prompt.main.prompt_database import (
    UploadDocResource
)
from prompt.main.prompt_generation import (
    GeneratingTestCasesWithLLM,
    PromptGenerationForTestCases,
    SimilaritySearchPromptGenerate
)
# from prompt.main.base import org_scoped_rule


class ApiExt(Api):
    def add_org_resource(self, resource, *urls, **kwargs):
        # urls = [org_scoped_rule(url) for url in urls]
        return self.add_resource(resource, *urls, **kwargs)



api = ApiExt()

api.add_org_resource(UploadDocResource, "/api/upload_documents", endpoint="upload")
api.add_org_resource(GeneratingTestCasesWithLLM, "/api/generate_test_cases", endpoint="testcases")
api.add_org_resource(PromptGenerationForTestCases, "/api/prompt_generation_for_user_input", endpoint="candidate")
api.add_org_resource(SimilaritySearchPromptGenerate, "/api/prompt_candidate_generation", endpoint="similarity")




