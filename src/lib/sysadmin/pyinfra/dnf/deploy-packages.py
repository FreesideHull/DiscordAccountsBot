import os
from pyinfra.operations import dnf # imports the dnf package from pyinfra

pkgs = os.environ.get("PYINFRA_PACKAGES")
pkgs = pkgs.split(",") # splits on comma

dnf.packages( # installs/updates the chosen packages
    name="Install selected packages",
    packages=pkgs,
    latest=True,
    _sudo=True,
)
