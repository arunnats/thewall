import requests
from datetime import date
import random
import time

API_URL = "http://127.0.0.1:8000/thewall/"
NUM_POSTS = 90

recipients = [
    "alice",
    "bob",
    "charlie",
    "dave",
    "eve",
    "frank",
    "grace",
    "heidi"
]

for i in range(1, NUM_POSTS + 1):
    payload = {
        "date": date.today().isoformat(),
        "recipient": random.choice(recipients),
        "contents": f"demo_post_content_{i}_{random.randint(1000,9999)}"
    }
    try:
        resp = requests.post(API_URL, json=payload)
        if resp.status_code == 200:
            print(f"Posted {i}: {payload['contents']} ✔")
        else:
            print(f"Error {i}: {resp.status_code} — {resp.json().get('detail')}")
        # Sleep a tiny bit to avoid any burst issues (especially if you lower the rate limit)
        time.sleep(0.05)
    except Exception as e:
        print(f"Exception for post {i}: {e}")
