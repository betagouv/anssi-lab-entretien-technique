from fastapi.testclient import TestClient

from src.main import app, instancie_les_services


def test_sait_dire_bonjour_au_monde():
    client = TestClient(app)

    reponse = client.get("/bonjour")

    assert reponse.status_code == 200
    assert reponse.json() == "Bonjour le monde"


def xtest_sait_dire_bonjour_au_candidat():
    client = TestClient(app)

    app.dependency_overrides[instancie_les_services] = lambda: FournisseurDeServicesDeTests()

    reponse = client.get("/bonjour")

    assert reponse.status_code == 200
    assert reponse.json() == "Bonjour le candidat"
