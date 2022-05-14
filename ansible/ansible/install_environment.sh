#!/bin/bash

. ./team-34-openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=config/SSH.pem install_environment.yaml -i inventory/hosts.ini 