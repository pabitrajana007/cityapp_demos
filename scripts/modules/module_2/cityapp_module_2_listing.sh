#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 1.0
# CityApp module
# This module is to list available maps for module_2
#
# 2020. április 14.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

#
#-- Initial settings -------------------
#

cd ~/cityapp

MODULES=~/cityapp/scripts/modules
MODULE=~/cityapp/scripts/modules/module_2
MODULE_NAME=cityapp_module_2_listing
VARIABLES=~/cityapp/scripts/shared/variables
GRASS=~/cityapp/grass/global
MAPSET=PERMANENT

# -- processing -----

Running_Check start
rm -f $MODULE/temp_maps
touch $MODULE/temp_maps
for i in $(g.list mapset=PERMANENT type=vector | grep -vE 'lines_osm|lines|points_osm|polygons_osm|polygons|relations_osm|relations|selection'); do
    if [[ $(db.describe -c table=$i | grep -vE 'CAT|cat') ]]
        then
            echo $i >> $MODULE/temp_maps
    fi
done
Running_Check stop
exit 
