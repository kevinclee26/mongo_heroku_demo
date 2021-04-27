from flask import Flask, jsonify, render_template, redirect
import os
from dotenv import load_dotenv
import requests
import pymongo

load_dotenv()

app=Flask(__name__)

DATABASE_URL=os.environ.get('DATABASE_URL') or 'mongodb://localhost:27017'

client = pymongo.MongoClient(DATABASE_URL)

@app.route('/')
def home():
	return render_template('index.html')

@app.route('/all_launches')
def launches(): 
	results=client.mongo_db.launches.aggregate([
		{'$lookup':{'from': "launchpads",
			       'localField': "launch_site.site_id", 
			       'foreignField': "site_id",
			       'as': "launch_site"}}, 
		{'$project': {'_id': 0, 
					  'launch_site': {'_id': 0}}},  
		{'$unwind': '$launch_site'}])
	return jsonify(list(results))

@app.route('/cnt_launches_per_site')
def cnt_launches_per_site(): 
	results=client.mongo_db.launches.aggregate([
		{'$group': {'_id': '$launch_site.site_id', 
					'count': {'$sum': 1}}}, 
		{'$lookup':{'from': "launchpads",
			       'localField': "_id", 
			       'foreignField': "site_id",
			       'as': "launch_site"}}, 
		{'$project': {'_id': 0, 
					  'launch_site': {'_id': 0},  
					  'launch_site': {'location': 1, 'site_id': 1}, 
					  'count': 1}}, 
		{'$unwind': '$launch_site'}])
	return jsonify(list(results))

@app.route('/all_launchpads')
def launchpads():
	results=client.mongo_db.launchpads.find({}, {'_id': 0})
	return jsonify(list(results))
	
@app.route('/get_token')
def get_token():
	return jsonify({'mapbox_token': os.environ.get('mapbox_token') or ''})

@app.route('/refresh')
def refresh():
	client.mongo_db.launches.drop()
	launches_url='https://api.spacexdata.com/v3/launches'
	response=requests.get(launches_url)
	data=response.json()
	client.mongo_db.launches.insert(data)
	client.mongo_db.launchpads.drop()
	launchpads_url='https://api.spacexdata.com/v3/launchpads'
	response=requests.get(launchpads_url)
	data=response.json()
	client.mongo_db.launchpads.insert(data)
	# return 'SUCCESS'
	print('SUCCESS')
	return redirect('/')

if __name__=='__main__': 
	app.run()