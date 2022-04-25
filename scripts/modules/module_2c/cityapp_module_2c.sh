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

QUERY_RESOLUTION=0.00002

Running_Check start

rm -f $MODULE/vector_map_list
rm -f $MODULE/queryable_fields
rm -f $MODULE/filter_fields
rm -f $MODULE/query_parameters.txt

#melyik térképet akarod lekérdezmi?
    grass -f $GRASS/PERMANENT --exec g.list type=vector > $MODULE/vector_map_list
    Send_Message l 1 module_2c.1 input actions [\"OK\"] $MODULE/vector_map_list
        Request
            MAP_TO_QUERY=$REQUEST_CONTENT


#a választott térkép melyik mezőjét?
    PRI_ID=$(echo $MAP_TO_QUERY | cut -d"_" -f1)
    SEC_ID=$(echo $MAP_TO_QUERY | cut -d"_" -f2)
    TERC_ID=$(echo $MAP_TO_QUERY | cut -d"_" -f3)
    cat $GEOSERVER/$PRI_ID/$SEC_ID/$TERC_ID/$MAP_TO_QUERY".txt" | grep ":y;" | cut -d":" -f2 | sed s'/ //'g > $MODULE/queryable_fields
    
    Send_Message l 2 module_2c.2 input actions [\"OK\"] $MODULE/queryable_fields
        Request
            FIELD_TO_QUERY=$REQUEST_CONTENT
            
            
#Melyik térképpel szűrjünk?
    Send_Message l 3 module_2c.3 input actions [\"OK\"] $MODULE/vector_map_list
        Request
            MAP_TO_FILTER=$REQUEST_CONTENT
            
#E térkép melyik adatával?
    PRI_ID=$(echo $MAP_TO_QUERY | cut -d"_" -f1)
    SEC_ID=$(echo $MAP_TO_QUERY | cut -d"_" -f2)
    TERC_ID=$(echo $MAP_TO_QUERY | cut -d"_" -f3)
    cat $GEOSERVER/$PRI_ID/$SEC_ID/$TERC_ID/$MAP_TO_FILTER".txt" | grep ":y;" | cut -d":" -f2 | sed s'/ //'g > $MODULE/filter_fields
    
        Send_Message l 4 module_2c.4 input actions [\"OK\"] $MODULE/filter_fields
            Request
                FIELD_TO_FILTER=$REQUEST_CONTENT
                
    echo "$MAP_TO_QUERY , $FIELD_TO_QUERY , $MAP_TO_FILTER , $FIELD_TO_FILTER" > $MODULE/query_parameters.txt


Running_Check stop
exit
