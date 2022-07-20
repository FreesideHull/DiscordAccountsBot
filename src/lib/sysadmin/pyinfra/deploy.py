# TODO
# ssh to machine - (sorted through ssh config and inventory.py)
# cd to /home/
# create x users home directory
# chown xuser:xuser home directory

# but do that through pyinfra rather than typical bash


from pyinfra.operations import server, files

username = "test"

server.user(
    name="Validate user", # or create them if they somehow don't exust
    user=username,
    home="/home/"+username,
)
files.file(
    name="Create pyinfra log file",
    path="/home/"+username"/",
    user=useraname,
    group=username,
    # add `chown` command equivalent here
    _sudo=True,
)