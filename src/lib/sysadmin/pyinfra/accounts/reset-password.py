import os
from pyinfra.operations import server
# ipa seems to want the old password to change the password
# there doesnt seem to be a reset password if you forget yours
# https://github.com/larrabee/freeipa-password-reset may be promising? take a look at that
# fork it maybe? resetting passwords might not be viable in pyinfra, `server.shell` can be weird.
# we'll have to see. but if pyinfra cant handle it well then having a website do the work isnt the end of the world