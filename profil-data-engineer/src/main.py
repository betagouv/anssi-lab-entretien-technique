from typing import Annotated
from fastapi import Depends, FastAPI

app = FastAPI()


class FournisseurDeServices():
    def dis_bonjour(self):
        return "Bonjour le monde"


def instancie_les_services():
    return FournisseurDeServices()


@app.get("/bonjour")
def bonjour(services: Annotated[str, Depends(instancie_les_services)]):
    message = services.dis_bonjour()
    return message
