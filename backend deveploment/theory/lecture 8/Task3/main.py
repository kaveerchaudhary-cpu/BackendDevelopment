from datetime import datetime

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
from starlette.requests import Request

app = FastAPI()

templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    now = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

    return templates.TemplateResponse(
        request=request,
        name="home.html",
        context={
            "now": now,
        },
    )