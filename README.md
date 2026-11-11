# SwasthyaLink — SIH Prototype

**Connecting Healthcare. Saving Lives.**

SwasthyaLink is an AI-powered **healthcare resource coordination platform** for verified healthcare facilities, especially in rural and underserved areas.

The patient is **not the direct user**. A verified healthcare worker uses SwasthyaLink to find and coordinate a resource for a patient.

## Our final scope

### Six resources
1. Blood Bank
2. Milk Bank
3. Oxygen
4. Ambulance
5. Medicine
6. Specialist

**Hospital/ICU bed tracking is intentionally not included.**

### Main web/mobile app
Verified healthcare workers can:
- Log in
- Register/verify a facility
- See a facility dashboard
- Update/view resources
- Search for a resource
- See AI-ranked nearby facilities
- Contact a facility
- Send a coordination request
- Track a request
- Upload a hospital receipt/coordination document
- Receive notifications
- View analytics and demand prediction

### Separate rural access channels

**Phone call:** A healthcare worker can call a dedicated helpline. An IVR/AI service can understand the request, search the same backend, and read the best match back over the call.

**SMS:** A healthcare worker can send a simple resource + quantity + location message and receive a result by SMS.

> Phone and SMS are separate access channels. There is intentionally **no voice-assistant page inside the web app**.

## Example SIH demo

A patient reaches a rural PHC and needs **2 units of O+ blood**.

1. Healthcare worker logs into SwasthyaLink.
2. Searches: `2 units of O+ blood`.
3. Selects `Blood Bank` and `Emergency`.
4. SwasthyaLink checks verified facilities.
5. AI ranking considers availability, distance, travel time and urgency.
6. The best blood bank is shown.
7. Worker views the facility, calls it or sends a request.
8. The blood bank accepts the request.
9. The PHC tracks the coordination.
10. A hospital receipt/coordination document can be uploaded.
11. Analytics can show future demand/shortage risk.

## AI modules

- **Request Classification:** turns free text into resource type + quantity.
- **Smart Resource Matching:** explainable scoring using availability, distance, travel time and urgency.
- **Emergency Priority:** emergency requests are surfaced first.
- **Demand Prediction:** prototype trend predictions for resource demand.
- **Multilingual NLP:** prepared for English, Hindi and Telugu phone/SMS flows.

AI only supports coordination. Medical decisions remain with healthcare professionals.

## Tech stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Recharts

### Backend
- Python
- FastAPI
- Motor / PyMongo

### Database
- MongoDB Atlas

### Security
- JWT
- Password hashing
- Role-based access
- Facility verification
- Environment variables for secrets
- No full patient medical records

## Folder structure

```text
healthcare-resource-platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   └── pages/
│   └── package.json
├── backend/
│   ├── ai/
│   ├── routers/
│   ├── database.py
│   ├── auth_utils.py
│   ├── models.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── data/
├── run-backend.bat
├── run-frontend.bat
└── README.md
```

## Windows — easiest way to run

### Option A: use the batch files

From the project folder:

**Double-click `run-backend.bat`**

Then open another terminal and run/double-click:

**`run-frontend.bat`**

Frontend:
`http://localhost:5173`

Backend:
`http://127.0.0.1:8000`

API docs:
`http://127.0.0.1:8000/docs`

### Option B: terminal commands

#### Backend

```powershell
cd healthcare-resource-platform\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

For MongoDB Atlas, copy:

```text
backend/.env.example
```

to:

```text
backend/.env
```

and replace the MongoDB placeholders with your Atlas connection string.

Then:

```powershell
uvicorn main:app --reload --port 8000
```

Check:

```text
http://127.0.0.1:8000/health
```

A healthy response shows whether MongoDB is configured and connected.

#### Frontend

Open a second terminal:

```powershell
cd healthcare-resource-platform\frontend
npm install
npm run dev
```

Open the URL Vite displays, normally:

```text
http://localhost:5173
```

## Demo login

The current frontend is intentionally **prototype/demo mode** so the UI can be explored before connecting every screen to the backend.

You can select:
- Hospital / PHC
- Blood Bank
- Milk Bank
- Pharmacy
- Diagnostic Centre
- Ambulance Service
- System Admin

Any non-empty demo login values can be used in the prototype.

When backend authentication is connected, replace the demo login with real JWT authentication.

## MongoDB note

Never paste your real MongoDB password into source code.

Use:

```text
backend/.env
```

and keep it out of Git.

The included `.gitignore` already ignores `backend/.env`.

## Important safety boundary

SwasthyaLink does not diagnose patients, prescribe treatment, or make medical decisions. It helps verified healthcare workers **find and coordinate resources faster**.
