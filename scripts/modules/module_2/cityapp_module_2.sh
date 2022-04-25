#! /bin/bash
. ~/cityapp/scripts/shared/functions.sh

# version 1.4
# CityApp module
# This module is to query any existing map by a user-defined area
# 2020. szeptember 9.
# Author: BUGYA Titusz, CityScienceLab -- Hamburg, Germany

#
#-- Initial settings -------------------
#

cd ~/cityapp

MODULES=~/cityapp/scripts/modules;
MODULE=~/cityapp/scripts/modules/module_2;
MODULE_NAME=module_2;
VARIABLES=~/cityapp/scripts/shared/variables;
BROWSER=~/cityapp/data_from_browser;
LANGUAGE=$(cat ~/cityapp/scripts/shared/variables/lang);
MESSAGE_TEXT=~/cityapp/scripts/shared/messages/$LANGUAGE/module_2;
MESSAGE_SENT=~/cityapp/data_to_client;
GEOSERVER=~/cityapp/geoserver_data;
GRASS=~/cityapp/grass/global;
MAPSET=module_2;
DATE_VALUE=$(date +%Y-%m-%d" "%H":"%M);
DATE_VALUE_2=$(date +%Y_%m_%d_%H_%M);

QUERY_RESOLUTION=0.00002;

Running_Check start

#############################
# Preprocess, selecting mode
#############################

    # It would great to make a distinction if the queried map is point, line, or polygon type?
    # If points > 0 AND lines = 0 AND centroids = 0: point
    # If points = 0 AND lines > 0 AND centroids = 0: line
    # If points = 0 AND lines = 0 AND centroids > 0: area (polygon)

    # If line type map, only lenght in meters can be queryed
    # for point and area map any other value can be queryed
    # What if to query topology data too? (area, lenght?)

    rm -f $MESSAGE_SENT/*

    # First overwrite the region of module_2 mapset. If no such mapset exist, create it
        if [ -d $GRASS/$MAPSET ]
            then
                cp $GRASS/PERMANENT/WIND $GRASS/$MAPSET/WIND
            else
                mkdir $GRASS/$MAPSET
                cp -r ~/cityapp/grass/skel/* $GRASS/$MAPSET
                cp $GRASS/PERMANENT/WIND $GRASS/$MAPSET/WIND
        fi

        RUNNING_MODE=$(cat $MODULE/mode)
############################################################################################################
# Load parameters: area to query, map, critrias. 
# Loading process is not the same for the defferent modes, tehrefore a "case" is applyed to manage the modes.
############################################################################################################

    # Message 1 Draw an area to query
        Send_Message m 1 module_2.1 question actions [\"OK\"]
            Request_Map geojson
                QUERY_AREA_1=$REQUEST_PATH
                
                # copy for archiving -- later, when a saving is not requested, it will deleted
                cp $REQUEST_PATH $MODULE/temp_storage/query_area_1

                Process_Check start add_map
                    Add_Vector $QUERY_AREA_1 query_area_1
                    QUERY_AREA_1="query_area_1"
                    Gpkg_Out query_area_1 query_area_1
                Process_Check stop add_map
                
    # CHANGED!
    # Message 2 What is the map you want to query? This is the "Query Map" (see manual). Default maps and "selection" map is not included in the list. Available maps are:
        grass -f $GRASS/$MAPSET --exec $MODULE/cityapp_module_2_listing.sh
        Send_Message l 2 module_2.x select actions [\"OK\"] $MODULE/temp_maps
            Request
                    case $REQUEST_CONTENT in
                            "cancel")
                                Send_Message m x module_1b.x question action [\"Ok\"]
                                    Request
                                        Running_Check stop
                                        # Close_Process
                                        exit
                                ;;
                            "*")
                                    QUERY=1
                                    MAP_FOR_QUERY_1=$REQUEST_CONTENT
                                    # copy for achiving
                                    echo $MAP_FOR_QUERY_1 > $MODULE/temp_map_to_query_1

                                    # Now it is possible to check if the map to query is in the default mapset (set in the header as MAPSET), or not. If not, the map has to be copied into the module_2 mapset and the further processes will taken in this mapset.
                                    
                                    if [ grass -f $GRASS/$MAPSET --exec g.list type=vector mapset=module_2 | grep "$MAP_FOR_QUERY_1" ]
                                        then
                                            echo ""
                                        else
                                            grass -f $GRASS/$MAPSET --exec g.copy vector=$MAP_FOR_QUERY_1"@"PERMANENT,$MAP_FOR_QUERY_1
                                    fi
                                    
                                    # query map topology
                                    Topology $GRASS/$MAPSET $MAP_FOR_QUERY_1
                                    # Topology is now stored in variable MAP_TOPOLOGY -- later this would useful.
                                ;;

                    esac
                    
        # CHANGED
        # Do you want to use a selection map? (for "Selection Map" see manual). If yes, select a map from the list then click OK. If you do not want to use a selection map, then click Cancel
            Send_Message l 2 module_2.x select actions [\"OK\"] $MODULE/temp_maps
                Request
                    case $REQUEST_CONTENT in
                            "cancel")
                                Send_Message m x module_1b.x question action [\"Ok\"]
                                    Request
                                        Running_Check stop
                                        # Close_Process
                                        exit
                                ;;
                            "*")
                                    SELECTION=1
                                    MAP_FOR_SELECTION=$REQUEST_CONTENT
                                ;;
                    esac
        
    # CHANGED
    # Message 3 Fill the form and press save.
        
        case $SELECTION in
            0)
                grass -f $GRASS/$MAPSET --exec db.describe -c table=$MAP_FOR_QUERY_1 | grep -E 'DOUBLE\ PRECISION|INTEGER' | grep -vE 'CAT|cat' > $MODULE/temp_columns_1
                Send_Message l 3 module_2.3 select actions [\"OK\"] $MODULE/temp_columns_1
                    Request
                        echo $REQUEST_CONTENT > $MODULE/temp_query_request_1
                        Json_To_Text $MODULE/temp_query_request_1 $MODULE/query_request_1_temp
                        WHERE_QUERY=$(cat $MODULE/query_request_1_temp | head -n1)
                
                ;;
            1)
                grass -f $GRASS/$MAPSET --exec db.describe -c table=$MAP_FOR_QUERY_1 | grep -E 'DOUBLE\ PRECISION|INTEGER' | grep -vE 'CAT|cat' > $MODULE/temp_columns_1
                    Send_Message l 3 module_2.3 select actions [\"OK\"] $MODULE/temp_columns_1
                        Request
                            echo $REQUEST_CONTENT > $MODULE/temp_query_request_1
                            Json_To_Text $MODULE/temp_query_request_1 $MODULE/query_request_1_temp
                            WHERE_QUERY=$(cat $MODULE/query_request_1_temp | head -n1)
                            SELECTION_QUERY=$(cat $MODULE/query_request_1_temp | tail -n1)
                ;;
        esac
        
        

    # EVALUATION
    


#####################################################################################
#  Processing -- processing is not the same for the "simple" and the "compare" cases.
#####################################################################################

    Process_Check start calculations
    # Set region to query area, set resolution
        grass -f $GRASS/$MAPSET --exec g.region vector=$MAP_FOR_QUERY_1 res=$QUERY_RESOLUTION --overwrite

    # Set MASK to query area
        grass -f $GRASS/$MAPSET --exec r.mask vector=$QUERY_AREA_1 --overwrite

    # Clip the basemep map by query area
        grass -f $GRASS/$MAPSET --exec v.select ainput=$MAP_FOR_QUERY_1 atype=point,line,boundary,centroid,area binput=$QUERY_AREA_1  btype=area output=clipped_1 operator=overlap --overwrite

    # Applying the query request
        grass -f $GRASS/$MAPSET --exec v.extract  input=clipped_1 where="$WHERE" output=query_result_area_1 --overwrite

    #Query statistics
        grass -f $GRASS/$MAPSET --exec v.db.univar -e -g map=query_result_area_1 column=$QUERY_COLUMN_1 | cut -d"=" -f2 > $MODULE/temp_statistics_1

    # Data output
        Gpkg_Out query_result_area_1 query_result_area_1

        rm -f $MODULE/temp_statistics_output_1
        touch $MODULE/temp_statistics_output_1
            
            echo $(cat $MESSAGE_TEXT | head -n19 | tail -n1) > $MODULE/temp_statistics_output_1
            cat $MESSAGE_TEXT | head -n20 | tail -n1 >> $MODULE/temp_statistics_output_1
            echo $DATE_VALUE >> $MODULE/temp_statistics_output_1
            echo " " >> $MODULE/temp_statistics_output_1
            
            cat $MESSAGE_TEXT | head -n21 | tail -n1 >> $MODULE/temp_statistics_output_1
            echo $QUERY_COLUMN_1 >> $MODULE/temp_statistics_output_1
            echo " " >> $MODULE/temp_statistics_output_1
            
            cat $MESSAGE_TEXT | head -n22 | tail -n1  >> $MODULE/temp_statistics_output_1
            echo $WHERE >> $MODULE/temp_statistics_output_1
            echo " " >> $MODULE/temp_statistics_output_1
            
            cat $MESSAGE_TEXT | head -n23 | tail -n1 >> $MODULE/temp_statistics_output_1
            echo " " >> $MODULE/temp_statistics_output_1
            
            echo "$(head -n4 < $MESSAGE_TEXT | tail -n1)" "$(head -n1 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n5 < $MESSAGE_TEXT | tail -n1)" "$(head -n10 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1 
            echo "$(head -n6 < $MESSAGE_TEXT | tail -n1)" "$(head -n2 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1 
            echo "$(head -n7 < $MESSAGE_TEXT | tail -n1)" "$(head -n3 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1 
            echo "$(head -n8 < $MESSAGE_TEXT | tail -n1)" "$(head -n4 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n9 < $MESSAGE_TEXT | tail -n1)" "$(head -n5 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n10 < $MESSAGE_TEXT | tail -n1)" "$(head -n12 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n11 < $MESSAGE_TEXT | tail -n1)" "$(head -n6 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n12 < $MESSAGE_TEXT | tail -n1)" "$(head -n8 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n13 < $MESSAGE_TEXT | tail -n1)" "$(head -n7 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n14 < $MESSAGE_TEXT | tail -n1)" "$(head -n9 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n15 < $MESSAGE_TEXT | tail -n1)" "$(head -n11 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n17 < $MESSAGE_TEXT | tail -n1)" "$(head -n13 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
            echo "$(head -n18 < $MESSAGE_TEXT | tail -n1)" "$(head -n14 < $MODULE/temp_statistics_1 | tail -n1)" >> $MODULE/temp_statistics_output_1
        Process_Check stop calculations
        
        rm -f $MESSAGE_SENT/*.message
        Send_Message m 24 module_2.4 question actions [\"close\"]

        cp $MODULE/temp_statistics_output_1 $MESSAGE_SENT/module_2.1.info
        
            cat $MODULE/temp_statistics_output_1 | sed s'/"//'g | sed s'/{//'g | sed s'/}//'g > $MODULE/temp_statistics_text_1
            enscript -p $MODULE/temp_statistics_1.ps $MODULE/temp_statistics_text_1
            ps2pdf $MODULE/temp_statistics_1.ps $MODULE/temp_statistics_1.pdf
        
            grass -f $GRASS/$MAPSET --exec ps.map input=$MODULE/ps_param_1 output=$MODULE/temp_query_map_1.ps --overwrite
            ps2pdf $MODULE/temp_query_map_1.ps $MODULE/temp_query_map_1.pdf

            gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile=$MODULE/temp_query_results_$DATE_VALUE_2".pdf" $MODULE/temp_statistics_1.pdf $MODULE/temp_query_map_1.pdf
            
            mv $MODULE/temp_query_results_$DATE_VALUE_2".pdf" ~/cityapp/saved_results/query_results_$DATE_VALUE_2".pdf"
        
            Request
    Running_Check stop
    Close_Process
exit
