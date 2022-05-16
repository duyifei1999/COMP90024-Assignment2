# COMP90024-Assignment2
# Melbourne Livability Analysis

An cloud based application on the MRC for harvesting tweets through twitter API.

## User guide

### Prerequisites
1. Login to [https://dashboard.cloud.unimelb.edu.au](https://dashboard.cloud.unimelb.edu.au)
2. Download openrc.sh with the correct project from Dashboard
3. Reset API password to get new password for openrc.sh
4. replace 'ansible/team-34-openrc.sh' with just downloaded one
5. Create your own pair key and replace it with 'ansible/config/SSH.pem'
6. Connect to the Unimelb Cisco Anyconnect VPN


### Install Ansible

```
sudo pip install ansible
```
### Create instance

```
sudo ./nectar.sh
```
### Deploy services
Change the key-file name to your own key in 'one_click_deployment.sh' file

```
sudo ./one_click_deployment.sh
```
### Web frontend:
please go to 172.26.135.7:5000
### CouchDB master: 
please go to 172.26.129.154:5984/_utils
