# /ZOCXZ2R6eN2q5VpD/

import requests
from dotenv import load_dotenv
import os
import pymongo

load_dotenv() # use dotenv to hide sensitive credential as environment variables
DATABASE_URL=os.environ.get('DATABASE_URL') # get connection url from environment

client=pymongo.MongoClient(DATABASE_URL) # establish connection with database

launches_url='https://api.spacexdata.com/v3/launches'
response=requests.get(launches_url)
if str(response.status_code)[0]=='2': # check for success
	data=response.json() # get content in json format
	client.mongo_db.launches.drop() # clear collection 
	client.mongo_db.launches.insert(data) # insert all records
	print('SUCCESS')
else: # output for fail
	print('FAILED')



# from flask import Flask, jsonify, render_template, redirect
# import os
# from dotenv import load_dotenv
# import requests
# import pymongo

# load_dotenv()

# app=Flask(__name__)

# DATABASE_URL=os.environ.get('DATABASE_URL') or 'mongodb://localhost:27017'

# client = pymongo.MongoClient(DATABASE_URL)

# @app.route('/')
# def home():
# 	return render_template('index.html')

# @app.route('/refresh')
# def refresh():
# 	client.mongo_db.launches.drop()
# 	launches_url='https://api.spacexdata.com/v3/launches'
# 	response=requests.get(launches_url)
# 	data=response.json()
# 	client.mongo_db.launches.insert(data)
# 	client.mongo_db.launchpads.drop()
# 	launchpads_url='https://api.spacexdata.com/v3/launchpads'
# 	response=requests.get(launchpads_url)
# 	data=response.json()
# 	client.mongo_db.launchpads.insert(data)
# 	# return 'SUCCESS'
# 	print('SUCCESS')
# 	return redirect('/')


# if __name__=='__main__': 
# 	app.run()