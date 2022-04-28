#!/bin/bash

. ./unimelb-COMP90024-2022-grp-54-openrc.sh; ansible-playbook nectar.yaml -i inventory.ini --ask-become-pass