/* eslint-disable no-undef */


//  This map script containes Bhubaneshwar local layers too. Therefore it is not for generick purposes.

const map = new L.Map('map', {
    center: new L.LatLng(lat, lon),
    zoom: 13,
    minZoom: 4,
    zoomControl: false 
})



// Base layers 


const waterLines = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
layers: 'vector:water_lines_osm',
format: 'image/png',
transparent: true,
maxZoom: 20,
minZoom: 1
});

const roads = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
layers: 'vector:lines_osm',
format: 'image/png',
transparent: true,
maxZoom: 20,
minZoom: 1
});

const buildings = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
layers: 'vector:polygons_osm',
format: 'image/png',
transparent: true,
maxZoom: 20,
minZoom: 1
});


const Dem = L.tileLayer.wms(geoserverUrl + 'geoserver/raster/wms', {
layers: 'raster:odisha_dem',
format: 'image/png',
transparent: true,
legend_yes: false,
maxZoom: 20,
minZoom: 1,
});

const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const selection = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
  layers: 'vector:selection',
  format: 'image/png',
  transparent: true,
  maxZoom: 20,
  minZoom: 1
});

const satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 18,
            });
  

const drawnItems = L.featureGroup().addTo(map);


//Extension layers
    const query_area_1 = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:query_area_1',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
    });

    const query_result_area_1 = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:query_result_area_1',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
    });

    const query_result_point_1 = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:query_result_point_1',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 1
    });

    
// Time map layers
    const Module_1_Stricken_Area = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_stricken_area',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
    });

    const Module_1_TimeMap = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_time_map',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 1
    });

    const Module_1_FromPoints = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_from_points',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
    });

    const Module_1_ViaPoints = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1_via_points',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
    });

    const AccessibilityMap = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1b_accessibility_map',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 3
    });
    
    const AccessibilityPoints = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:m1b_points',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
    });
    
// Module10 layers
    
    const Module_10_Roads= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:module_10_calculated_roads',
    format: 'image/png',
    transparent: true,
    legend_yes: true,
    maxZoom: 20,
    minZoom: 3
    });

    const Module_10_Endpoints= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:module_10_endpoints',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
    });    

    const Module_10_Area= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
    layers: 'vector:module_10_project_area',
    format: 'image/png',
    transparent: true,
    maxZoom: 20,
    minZoom: 3
    });    
        
// Local layers (Dhenkanal)
    
        const Ind_Or_Dknl_Municipal_Boundary = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_municipal_boundary',
            format: 'image/png',
            transparent: true,
            legend_yes: false,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Ward_Boundary = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_ward_boundaries',
            format: 'image/png',
            transparent: true,
            legend_yes: false,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Road_Network = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_road_network',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });
        
        
        const Ind_Or_Dknl_Landuse = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_landuse_landcover',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });    
        
        const Ind_Or_Dknl_Water_Pipelines = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_water_pipeline', 
            format: 'image/png',
            transparent: true,
            legend_yes: false,
            maxZoom: 20,
            minZoom: 1,
            });
    
        const Ind_Or_Dknl_Water_Supply_Infrastucture = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_water_supply_infrastructure',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });  
        
        const Ind_Or_Dknl_Drinking_Water_Souces = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_drinking_water_sources',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Stormwater_Infrastructure = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_storm_water_infrastructure',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });
    
        const Ind_Or_Dknl_Solid_Waste_Hotspot = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_solid_waste_hotspot',
            format: 'image/png',
            transparent: true,
            legend_yes: false,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Waste_Water_Treatment_Hotspot = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_waste_water_treatment_hotspot',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Public_Toilets = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_public_toilets',
            format: 'image/png',
            transparent: true,
            legend_yes: false,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Solid_Waste_Infrastucture = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_solid_waste_infrastucture',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Educational_Institutions = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_educational_institutions',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Marketplaces = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_marketplaces',
            format: 'image/png',
            transparent: true,
            legend_yes: false,
            maxZoom: 20,
            minZoom: 1,
            });
        
        // Dhenkanal slum layers or slum-related layers
        
        const Ind_Or_Dknl_Jaga_Slum_Boundary = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_jaga_slum_boundary',
            format: 'image/png',
            transparent: true,
            legend_yes: false,
            maxZoom: 20,
            minZoom: 1,
            });

        
        const Ind_Or_Dknl_Slum_House_Wall_Types = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_jaga_slum_house_wall_types',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });

        const Ind_Or_Dknl_Slum_House_Avg_Income = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_jaga_slum_households_average_income',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });
        
        const Ind_Or_Dknl_Slum_House_EWS_Proof = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_jaga_slum_households_EWS_proof',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });        
        
        const Ind_Or_Dknl_Revenue_Land_Tenancy_Status = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_lands_tenancy_status',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });        
        
        const Ind_Or_Dknl_Revenue_Land_Tenancy_Types = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_lands_tenancy_types',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });    
        
        const Ind_Or_Dknl_Revenue_Land_Definite_Tenancy_Areas = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_definite_areas',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });    
        
        const Ind_Or_Dknl_Slum_Houses_By_Tenancy = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
            layers: 'vector:ind_or_dknl_slum_houses_by_tenancy',
            format: 'image/png',
            transparent: true,
            legend_yes: true,
            maxZoom: 20,
            minZoom: 1,
            });    
        
        
        
        // Local layers for Dhenkanal District

            const Ind_Or_District_Dknl_Panchs = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                layers: 'vector:ind_or_district_dknl_panchs',
                format: 'image/png',
                transparent: true,
                legend_yes: false,
                maxZoom: 20,
                minZoom: 1,
                });
            
            const Ind_Or_Dknl_District_Sanit_Survey = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                layers: 'vector:ind_or_district_dknl_sanitation_survey',
                format: 'image/png',
                transparent: true,
                legend_yes: true,
                maxZoom: 20,
                minZoom: 1,
                });

        
    // Local layers (Bhubaneshwar)
    // Watch out the property 'legend_yes'. It must be  true if you want to allow a second checckbox to display (refer to views/launch/legend.js and views/index.pug)   
        
                const Ind_Or_Bbswr_City_Area = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_city_area',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                
                const Ind_Or_Bbswr_Municipal_Area = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_municipal_area', 
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
        
                const Ind_Or_Bbswr_Slum_Areas = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slums',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                const Ind_Or_Bbswr_Slum_Total_Population = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_total_population_households',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slum_Female_Population = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_female_population_households',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slum_Male_Population = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_male_population_households',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                const Ind_Or_Bbsawr_Empty_Place_Types = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_empty_places_types',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Empty_Place_Category= L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_empty_places_category',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Land_Ownership = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_land_owners',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Empty_Places_Ownership = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_empty_places_ownership',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slum_Houses_Ownerhip = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: '	vector:ind_or_bbswr_slum_household_ownership',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slum_Religions = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_households_religions',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slums_Monthly_Incomes = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_households_average_incomes',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });            
                    
                const Ind_Or_Bbswr_Slums_Animals = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_households_animals',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slums_Bathrooms = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_households_bathrooms',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slums_Tapwater = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_households_tapwater',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
                    
                const Ind_Or_Bbswr_Slums_Toilettes = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_bbswr_slum_households_toilettes',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1,
                    });
            
    // Odisha-wide  layers


                    const Ind_Or_Population_1_sq_km = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_population_1_sq_km',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1
                    });

                    const Ind_Or_Groundwater_Level_3m = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_groundwater_3m',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1
                    });

                    const Ind_Or_Groundwater_level_Orig = L.tileLayer.wms(geoserverUrl + 'geoserver/vector/wms', {
                    layers: 'vector:ind_or_original_groundwater_map',
                    format: 'image/png',
                    transparent: true,
                    legend_yes: true,
                    maxZoom: 20,
                    minZoom: 1
                    });
                            
//Control for map legends. For those item, where the linked map has a "legend_yes: true," property, a second checkbox will displayed.
            
    L.control.legend(
        {
            position:'bottomleft'
            
        }
    ).addTo(map);

// Control panel of base layers 
        L.control.layers(
        {},
        {
            'Satellite view': satellite,
            'OpenStreetMap': osm,
            'Elevation':Dem,
            'Odisha water lines': waterLines,
            'Odisha roads': roads,
            'Odisha buildings': buildings,
            'Current selection': selection,
            'Drawings on the map': drawnItems
        },
        {position: 'topleft', collapsed: true}
        ).addTo(map);


// Control panel of extension layers 
            L.control.layers(
            {},
            {
                'Query area 1': query_area_1,
                'Query results 1': query_result_area_1,
                'Query result points': query_result_point_1,
                "Road-level time map": Module_1_TimeMap,
                "From-points": Module_1_FromPoints,
                "Via-points": Module_1_ViaPoints,
                "Stricken area": Module_1_Stricken_Area,
                "Accessibility map": AccessibilityMap,
                "Accessing points": AccessibilityPoints,
                "Calculated road network": Module_10_Roads,
                "Endpoints of calculated road network":Module_10_Endpoints,
                "Project area":Module_10_Area,
                },
            { position: 'topleft', collapsed: true }
            ).addTo(map);

        // Control panel of Odisha-wide layers 
                    L.control.layers(
                    {},
                    {

                        'Odisha population by 1 sq km': Ind_Or_Population_1_sq_km,
                        'Odisha groundwater below 3m (estimated)':Ind_Or_Groundwater_Level_3m,
                        'Odisha original groundwater map':Ind_Or_Groundwater_level_Orig,
                    },
                    { position: 'topright', collapsed: true }
                    ).addTo(map);
                    
    // Control panel for Dhenkanal-wide layers
                        
                    L.control.layers(
                        {},
                        {
                            "Dhenkanal municipal boundary":Ind_Or_Dknl_Municipal_Boundary,
                            "Dhenkanal ward boundaries":Ind_Or_Dknl_Ward_Boundary,
                            "Dhenkanal road network":Ind_Or_Dknl_Road_Network,
                            "Dhenkanal landuse":Ind_Or_Dknl_Landuse,
                            "Dhenkanal water pipelines":Ind_Or_Dknl_Water_Pipelines,
                            "Dhenkanal water supply infrastructure":Ind_Or_Dknl_Water_Supply_Infrastucture,
                            "Dhenkanal drinking water sources":Ind_Or_Dknl_Drinking_Water_Souces,
                            "Dhenkanal storm water infrastucture ":Ind_Or_Dknl_Stormwater_Infrastructure,
                            "Dhenkanal waste water treatment hotspot":Ind_Or_Dknl_Waste_Water_Treatment_Hotspot,
                            "Dhenkanal public toilets":Ind_Or_Dknl_Public_Toilets,
                            "Dhenkanal solid waste infrastucture":Ind_Or_Dknl_Solid_Waste_Infrastucture,
                            "Dhenkanal solid waste hotspot":Ind_Or_Dknl_Solid_Waste_Hotspot,
                            "Dhenkanal educational institutions":Ind_Or_Dknl_Educational_Institutions,
                            "Dhenkanal commercial- and marketplaces":Ind_Or_Dknl_Marketplaces,

                        },
                        { position: 'topright', collapsed: true }
                        ).addTo(map);

                        
    // Control panel for Dhenkanal Slum layers
                        L.control.layers(
                        {},
                        {
                            "Dhenkanal slum house wall types":Ind_Or_Dknl_Slum_House_Wall_Types,
                            "Dhenkanal slum households average yearly income":Ind_Or_Dknl_Slum_House_Avg_Income,
                            "Dhenkanal slum households with EWS proof":Ind_Or_Dknl_Slum_House_EWS_Proof,
                            "Dhenkanal revenue tenancy status": Ind_Or_Dknl_Revenue_Land_Tenancy_Status,
                            "Dhenkanal revenue tenancy types": Ind_Or_Dknl_Revenue_Land_Tenancy_Types,
                            "Dhenkanal slum houses by tenancy": Ind_Or_Dknl_Slum_Houses_By_Tenancy,
                            "Dhenkanal definite tenancy areas": Ind_Or_Dknl_Revenue_Land_Definite_Tenancy_Areas,
                            "Dhenkanal slums":Ind_Or_Dknl_Jaga_Slum_Boundary,

            
                        },
                        { position: 'topright', collapsed: true }).addTo(map);



    // Control panel for Dhenkanal district
                        L.control.layers(
                        {},
                        {
                            "Panchs of Dhenkanal District":Ind_Or_District_Dknl_Panchs,
                            "Dhenkanal district sanitation survey":Ind_Or_Dknl_District_Sanit_Survey,

                        },
                        { position: 'topright', collapsed: true }).addTo(map);

                        
                        
                        
    // Control panel for Bhubaneshwar slum layers

                            L.control.layers(
                            {},
                            {
                                "Bubaneshwar city area":Ind_Or_Bbswr_City_Area,
                                "Bubaneshwar municipal area":Ind_Or_Bbswr_Municipal_Area,
                                "Slums of Bubaneshwar":Ind_Or_Bbswr_Slum_Areas,
                                "Total population by households":Ind_Or_Bbswr_Slum_Total_Population,
                                "Female habitanst by households":Ind_Or_Bbswr_Slum_Female_Population,
                                "Male habitanst by households":Ind_Or_Bbswr_Slum_Male_Population,
                                "Open/Vacant empty places":Ind_Or_Bbsawr_Empty_Place_Types,
                                "Dry/Green empty places ":Ind_Or_Bbswr_Empty_Place_Category,
                                "Land ownership in Bubaneshwar":Ind_Or_Bbswr_Land_Ownership,
                                "Ownership of empty areas":Ind_Or_Bbswr_Empty_Places_Ownership,
                                "Ownerhips of slum houses":Ind_Or_Bbswr_Slum_Houses_Ownerhip,
                                "Religions by households":Ind_Or_Bbswr_Slum_Religions,
                                "Monthly average incomes per household":Ind_Or_Bbswr_Slums_Monthly_Incomes,
                                "Household with/without livestocks":Ind_Or_Bbswr_Slums_Animals,
                                "Bathroom facilities in the slums":Ind_Or_Bbswr_Slums_Bathrooms,
                                "Water accessibility in slums":Ind_Or_Bbswr_Slums_Tapwater,
                                "Toilette facilities in the slums":Ind_Or_Bbswr_Slums_Toilettes,
                            },
                            { position: 'topright', collapsed: true }).addTo(map);

            
// others

    map.addControl(new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        poly: { allowIntersection: false }
        },
    draw: {
        polygon: {
        allowIntersection: false,
        showArea: true,
        fill: '#FFFFFF',
            },
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: true
        }
        }));

const featureGroup = L.featureGroup().addTo(map);
    map.on('draw:created', (saving_draw) => {
    /* Creating a new item (polygon, line ... ) will be added to the feature group */
    featureGroup.addLayer(saving_draw.layer);
    });

    map.on(L.Draw.Event.CREATED, (event) => {
    drawnItems.addLayer(event.layer);
    });

/* scale bar */
    L.control.scale({ maxWidth: 150, position:'bottomright'}).addTo(map);
