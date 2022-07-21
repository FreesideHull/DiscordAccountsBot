## Pyinfra 

> '[pyinfra](https://pyinfra.com/) automates infrastructure super fast at massive scale. It can be used for ad-hoc command execution, service deployment, configuration management and more.' [`Source code`](https://github.com/Fizzadar/pyinfra)

### installing pyinfra

You will need `pipx` to install pyinfra. You *can* use `pip` if you wish but it is recommended to use `pipx`  
You can install `pipx` through pip(v19.0 or later) via

```python
python3 -m pip install --user pipx
python3 -m pipx ensurepath
```

Once `pipx` has been installed, you can move onto pyinfra  

```pipx
pipx install pyinfra
```

### pyinfra files

There are two files associated with pyinfra

`src/lib/sysadmin/pyinfra/inventory.py`

The inventory holds the list of hosts that commands will be executed on. In our case this only needs to be a single machine; `fs-storage`.

`src/lib/sysadmin/pyinfra/deploy.py`

The deploy file holds the commands we intend to run. Most of pyinfra's commands are idempotent. This means they can be applied multiple times without changing the results if applicable. So for example when checking if a user exists, it will do so, and if it does exist then pyinfra will not change anything, but if the user does not exist then it will create them. This in theory *should* prevent the routine crashing out in case of an error, instead you will see the error log with (hopefully) some helpful information on *why* x command failed.

The contents of the current deploy file will validate if a user exists (it should because FreeIPA would have created them), and then create their home directory and give them ownership of it.

To run through the full `cookbook` (yes crimsontome just came up with that name), when in `src/lib/sysadmin/pyinfra` in your terminal type

```pyinfra
pyinfra inventory.py deploy.py
```

With any luck (**Please ensure you have a working SSH config, with a keypair added to `fs-storage`! Otherwise it is likely to fail, or at least be slower**)

