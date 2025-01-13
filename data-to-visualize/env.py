import os
import subprocess
import sys

def create_virtualenv():
    # Check if virtualenv already exists
    if not os.path.exists('venv'):
        print("Creating virtual environment...")
        subprocess.check_call([sys.executable, '-m', 'venv', 'venv'])
    else:
        print("Virtual environment already exists.")

def install_requirements():
    # Install packages from requirements.txt
    if os.path.exists('requirements.txt'):
        print("Installing required packages from requirements.txt...")
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
    else:
        print("requirements.txt not found.")

if __name__ == "__main__":
    create_virtualenv()
    install_requirements()
    print("Setup complete. Now you can activate your virtual environment.")
