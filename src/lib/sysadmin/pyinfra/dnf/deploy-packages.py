from pyinfra.operations import dnf

pkgs = input("Enter package names seperated by comma")
pkgs = pkgs.split(",")

dnf.packages(
    name="Install selected packages",
    packages=pkgs,
    latest=True,
    _sudo=True,
)

