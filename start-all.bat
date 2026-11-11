@echo off
set ROOT=%~dp0
start "SwasthyaLink Backend" cmd /k "cd /d %ROOT%backend && if not exist venv python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt && uvicorn main:app --reload --port 8000"
start "SwasthyaLink Frontend" cmd /k "cd /d %ROOT%frontend && if not exist node_modules npm install && npm run dev"
echo SwasthyaLink is starting in two terminal windows.
pause
