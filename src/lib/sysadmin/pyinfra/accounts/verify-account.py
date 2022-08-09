# TODO
# ssh to machine - (sorted through ssh config and inventory.py)
# cd to /home/
# create x users home directory
# chown xuser:xuser home directory

# but do that through pyinfra rather than typical bash


import os # to grab environment vars

from time import sleep # to pause for some time

from pyinfra.operations import server, files # modules pyinfra needs


# @sbrl need to import more env vars for name etc for actual account creation

username = os.environ.get("PYINFRA_USERNAME") # grabs the username that is going to be validated

from python_freeipa import ClientMeta



client = ClientMeta('ipa.freeside.co.uk')
client.login("an-admin-username", "woah-super-secret-password")
user = client.user_add('test3', 'John', 'Doe', 'John Doe', o_preferredlanguage='EN')
                    # it is unclear what this first option actually  is???
                    # how do we set their password??

sleep(10) # wait so that we can make sure the account is made before freeipa tries to verify it or we're gonna have a bad time

server.user(
    name="Validate user", # or create them if they somehow don't exist
    user=username,
    home="/home/"+username,
    _sudo=True,
)

files.directory(
    name="Ensure /home/username exists", # create the folder, if its a new user it is unlikely to exist
    path="/home/"+username,
    user=username,
    group=username,
    _sudo=True,
)

# sudo is needed for both commands, please use the sudo passwoed of the account you are connecting as