# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

import requests
from flask_cors import CORS
import json



app = initialize_app()


@https_fn.on_request()
def requestAccountFromRiotAPI(req: https_fn.Request) -> https_fn.Response:
    # Add CORS headers for all responses
    headers = {
        'Access-Control-Allow-Origin': 'https://riftgg-4c815.web.app/, http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '3600'
    }

    # Handle preflight request
    if req.method == 'OPTIONS':
        return https_fn.Response('', status=204, headers=headers)

    try:
        params = req.args.to_dict()
        
        # First API call to get account info
        accountResp = requests.get(
            f'https://{params["RealmRouter"]}/riot/account/v1/accounts/by-riot-id/{params["summonerName"]}/{params["targetline"]}',
            params={'api_key': params["API_KEY"]}
        )
        
        # Check if first request was successful
        if accountResp.status_code != 200:
            return https_fn.Response(
                accountResp.text,
                status=accountResp.status_code,
                headers=headers
            )
        
        # Get PUUID from first response
        account_data = accountResp.json()
        puuid = account_data.get("puuid")
        
        if not puuid:
            return https_fn.Response(
                '{"error": "PUUID not found in response"}',
                status=400,
                headers=headers
            )
        
        # Second API call using PUUID
        summonerResp = requests.get(
            f'https://{params["regionRouter"]}/lol/summoner/v4/summoners/by-puuid/{puuid}',
            params={'api_key': params["API_KEY"]}
        )
        
        # Check if second request was successful
        if summonerResp.status_code != 200:
            return https_fn.Response(
                summonerResp.text,
                status=summonerResp.status_code,
                headers=headers
            )
        
        # Return the summoner data
        return https_fn.Response(
            summonerResp.text,
            status=200,
            headers=headers,
            content_type='application/json'
        )

    except Exception as e:
        print(f"Error: {str(e)}")  # Add logging
        return https_fn.Response(
            json.dumps({"error": str(e)}),
            status=500,
            headers=headers,
            content_type='application/json'
        )



