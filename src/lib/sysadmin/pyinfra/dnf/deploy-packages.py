from pyinfra.operations import dnf # imports the dnf package from pyinfra

pkgs = input("Enter package names seperated by comma") # replace with how we get the list of packages
pkgs = pkgs.split(",") # splits on comma

dnf.packages( # installs/updates the chosen packages
    name="Install selected packages",
    packages=pkgs,
    latest=True,
    _sudo=True,
)