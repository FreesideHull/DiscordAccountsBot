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


server.user(
    name="Validate user", # or create them if they somehow don't exist, but they really should
    user=username,
    home="/home/"+username,
)

files.directory(
    name="Ensure /home/username exists", # create the folder, if its a new user it is unlikely to exist
    path="/home/"+username,
    user=username,
    group=username,
)

