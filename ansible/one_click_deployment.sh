#!/bin/bash

. ./team-34-openrc.sh; ansible-playbook -i hosts -u ubuntu --key-file=config/SSH.pem one_click_deployment.yaml -i inventory/hosts.ini