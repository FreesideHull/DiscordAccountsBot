# TODO
# ssh to machine - (sorted through ssh config and inventory.py)
# cd to /home/
# create x users home directory
# chown xuser:xuser home directory

# but do that through pyinfra rather than typical bash
import os

from pyinfra.operations import server, files

username = os.environ.get("PYINFRA_USERNAME")

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