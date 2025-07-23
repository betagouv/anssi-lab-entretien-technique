from fastapi import FastAPI

app = FastAPI()

@app.get("/bonjour")
def bonjour():
    return "Bonjour le monde"
