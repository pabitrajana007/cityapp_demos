#! /bin/bash

. ~/cityapp/scripts/shared/functions.sh

# version 0.4
# CityApp module
# This module is to launch module_2b_query_process.sh, and process user communication
# 2020. július 26.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

#
#-- Initial settings -------------------
#

cd ~/cityapp

CITYAPP=~/cityapp
MODULES=$CITYAPP/scripts/modules
MODULE=$CITYAPP/scripts/modules/module_2c
MODULE_NAME=module_2c
VARIABLES=$CITYAPP/scripts/shared/variables
BROWSER=$CITYAPP/data_from_browser
LANGUAGE=$(cat $CITYAPP/scripts/shared/variables/lang)
MESSAGE_TEXT=$CITYAPP/scripts/shared/messages/$LANGUAGE/module_2c
MESSAGE_SENT=$CITYAPP/data_to_client
GEOSERVER=$CITYAPP/geoserver_data
GRASS=$CITYAPP/grass/global
MAPSET=module_2
DATE_VALUE=$(date +%Y-%m-%d" "%H":"%M)
DATE_VALUE_2=$(date +%Y_%m_%d_%H_%M)


for i in $(ls $GEOSERVER/ind/or/dknl/*.gpkg );do
    v.import -o --overwrite input=$i
done
