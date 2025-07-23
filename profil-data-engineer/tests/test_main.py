from fastapi.testclient import TestClient

from src.main import app

def test_sait_dire_bonjour():
    client = TestClient(app)
    reponse = client.get("/bonjour")

    assert reponse.status_code == 200
    assert reponse.json() == "Bonjour le candidat"
