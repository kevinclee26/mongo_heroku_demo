import requests
# from dotenv import load_dotenv
# import os
import pymongo

# load_dotenv() # use dotenv to hide sensitive credential as environment variables
# DATABASE_URL=f'mongodb+srv://user:{os.environ.get('password')}'\
# 			  '@mongo-heroku-cluster-we.kyrhz.mongodb.net/myFirstDatabase?'\
# 			  'retryWrites=true&w=majority' # get connection url from environment

# client=pymongo.MongoClient(DATABASE_URL) # establish connection with database

# launches_url='https://api.spacexdata.com/v3/launches'
# response=requests.get(launches_url)
# if str(response.status_code)[0]=='2': # check for success
# 	data=response.json() # get content in json format
# 	client.mongo_db.launches.drop() # clear collection 
# 	client.mongo_db.launches.insert_many(data) # insert all records
# 	print('SUCCESS')
# else: # output for fail
# 	print('FAILED')

def refresh(mongo_db):
	launches_url='https://api.spacexdata.com/v4/launches'
	response=requests.get(launches_url)
	if str(response.status_code)[0]=='2': # check for success
		data=response.json() # get content in json format
		mongo_db.launches.drop() # clear collection 
		mongo_db.launches.insert_many(data) # insert all records
		print('SUCCESS')
	else: # output for fail
		print('FAILED')
	return None