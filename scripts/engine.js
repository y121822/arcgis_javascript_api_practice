"use strict"

require(["esri/config","esri/Map","esri/Camera", "esri/views/SceneView", "esri/layers/FeatureLayer", "esri/widgets/Home",
        "esri/widgets/DirectLineMeasurement3D", "esri/widgets/AreaMeasurement3D", "esri/widgets/Legend",
        "esri/widgets/LayerList", "esri/widgets/ElevationProfile", "esri/widgets/LineOfSight"],
    function (esriConfig,Map, Camera, SceneView, FeatureLayer, Home, DirectLineMeasurement3D, AreaMeasurement3D, Legend,
              LayerList, ElevationProfile,LineOfSight) {
        esriConfig.apiKey = "AAPKddb5a5492ebb483d8a0920250207555bmfTH8aiszDnffsCfYAEAeME_Q1844Fs0qcQYT9bAvX82LEvgtsHRZVg-pMbK3fPz";

        const map = new Map({
            basemap: "arcgis-imagery",
            ground: "world-elevation"
        });

        const cam = new Camera (
            {
                heading:200,
                tilt:90,
                position: {
                    latitude: 39.4433,
                    longitude: 72.91,
                    z: 4500,
                    spatialReference: { wkid: 4326 }

                }
            }
        )

        const view = new SceneView({
            map: map,
            camera: cam,
            container: "myMap"
        });

        view.on('pointer-move', function(event){
            var point = view.toMap({x: event.x, y: event.y});
            if(point!=null) {
                document.querySelector("#myPosition").innerHTML = point.z.toFixed(2)
            }
            else{document.querySelector("#myPosition").innerHTML = ''}
        });

        const layer1 = new FeatureLayer({
            fields: [
                {
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "type",
                    alias: "Type",
                    type: "string"
                }, {
                    name: "Name",
                    alias: "Name",
                    type: "string"
                },
                {
                    name: "Height",
                    alias: "Height",
                    type: "integer"
                }
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            title: "Stop Ahead",
            spatialReference: { wkid: 4326 },
            renderer: {
                type:'unique-value',
                field: 'type',
                uniqueValueInfos:[
                    {value: 'Stop_soon',
                     symbol: {
                        type: 'web-style',
                         name: "Stop_Ahead",
                         styleName: "EsriRealisticSignsandSignalsStyle"
                     }
                }
                ],
            visualVariables:[
                {
                    type:'size',
                    field: 'height',
                    axis: 'height',
                    valueUnit: 'meter'
                }
            ],
            },
            source:[
                {
                    geometry: {
                        type: 'point',
                        x:72.9066,
                        y:39.4270
                    },
                    attributes:{
                        ObjectID:1,
                        type: 'Stop_soon',
                        name: 'Consider landing',
                        height: '300'
                    }
                }
            ],
            popupTemplate:{
                title:'You shouldn`t fly there',
                content:[
                    {
                        type:'fields',
                        fieldInfos:[
                            {
                                fieldName:'name',
                                label:'Inner voice:'
                            }
                        ]
                    }
                ]
            }
        });
        const layer2 = new FeatureLayer({
            fields: [
                {
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "type",
                    alias: "Type",
                    type: "string"
                }, {
                    name: "Name",
                    alias: "Name",
                    type: "string"
                },
                {
                    name: "Height",
                    alias: "Height",
                    type: "integer"
                }
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            title: "Helicopter",
            spatialReference: { wkid: 4326 },
            renderer: {
                type:'unique-value',
                field: 'type',
                uniqueValueInfos:[
                    {value: 'Helicopter',
                        symbol: {
                            type: 'web-style',
                            name: "Eurocopter_H125_-_Flying",
                            styleName: "EsriRealisticTransportationStyle"
                        }
                    }
                ],
                visualVariables:[
                    {
                        type:'size',
                        field: 'height',
                        axis: 'height',
                        valueUnit: 'meter'
                    }
                ],
            },
            source:[
                {
                    geometry: {
                        type: 'point',
                        x:72.8975,
                        y:39.42,
                        z:4500,
                    },
                    attributes:{
                        ObjectID:1,
                        type: 'Helicopter',
                        name: 'A supply flight to the Advanced Base Camp',
                        height: '300'
                    }
                }
            ],
            popupTemplate:{
                title:'The undercovered Mi-8MTV5 mimicking an Eurocopter ',
                content:[
                    {
                        type:'fields',
                        fieldInfos:[
                            {
                                fieldName:'name',
                                label:'Tail number: 45-531'
                            }
                        ]
                    }
                ]
            }
        });
        const layer3 = new FeatureLayer({
            fields: [
                {
                    name: "ObjectID",
                    alias: "ObjectID",
                    type: "oid"
                }, {
                    name: "type",
                    alias: "Type",
                    type: "string"
                }, {
                    name: "Name",
                    alias: "Name",
                    type: "string"
                },
                {
                    name: "Height",
                    alias: "Height",
                    type: "integer"
                }
            ],
            objectIdField: "ObjectID",
            geometryType: "point",
            title: "Stop",
            spatialReference: { wkid: 4326 },
            renderer: {
                type:'unique-value',
                field: 'type',
                uniqueValueInfos:[
                    {value: 'Stop_now',
                        symbol: {
                            type: 'web-style',
                            name: "Stop",
                            styleName: "EsriRealisticSignsandSignalsStyle"
                        }
                    }
                ],
                visualVariables:[
                    {
                        type:'size',
                        field: 'height',
                        axis: 'height',
                        valueUnit: 'meter'
                    }
                ],
            },
            source:[
                {
                    geometry: {
                        type: 'point',
                        x:72.8986,
                        y:39.4140
                    },
                    attributes:{
                        ObjectID:1,
                        type: 'Stop_now',
                        name: 'Land immediately!',
                        height: '300'
                    }
                }
            ],
            popupTemplate:{
                title:'Don`t fly there!',
                content:[
                    {
                        type:'fields',
                        fieldInfos:[
                            {
                                fieldName:'name',
                                label:'Inner voice: '
                            }
                        ]
                    }
                ]
            }
        });

        map.add(layer3);
        map.add(layer1);
        map.add(layer2);

        var homeWidget = new Home({
            view: view
        });
        view.ui.add(homeWidget, "top-left");

        var activeWidget = null;
        document.getElementById("distanceButton").addEventListener("click", function() {
            setActiveWidget(null);
            if (!this.classList.contains("active")) {
                setActiveWidget("distance");
            } else {
                setActiveButton(null);
            }
        });
        document.getElementById("areaButton").addEventListener("click", function() {
            setActiveWidget(null);
            if (!this.classList.contains("active")) {
                setActiveWidget("area");
            } else {
                setActiveButton(null);
            }
        });
        document.getElementById("legendButton").addEventListener("click", function() {
            setActiveWidget(null);
            if (!this.classList.contains("active")) {
                setActiveWidget("legend");
            } else {
                setActiveButton(null);
            }
        });
        document.getElementById("elevationButton").addEventListener("click", function() {
            setActiveWidget(null);
            if (!this.classList.contains("active")) {
                setActiveWidget("elevation");
            } else {
                setActiveButton(null);
            }
        });
        document.getElementById("sightButton").addEventListener("click", function() {
            setActiveWidget(null);
            if (!this.classList.contains("active")) {
                setActiveWidget("sight");
            } else {
                setActiveButton(null);
            }
        });
        function setActiveWidget(type) {
            switch (type) {
                case "distance":
                    activeWidget = new DirectLineMeasurement3D({
                        view: view
                    });
                    activeWidget.viewModel.newMeasurement();
                    view.ui.add(activeWidget, "bottom-right");
                    setActiveButton(document.getElementById("distanceButton"));
                    break;
                case "area":
                    activeWidget = new AreaMeasurement3D({
                        view: view
                    });
                    activeWidget.viewModel.newMeasurement();
                    view.ui.add(activeWidget, "bottom-right");
                    setActiveButton(document.getElementById("areaButton"));
                    break;
                case "legend":
                    activeWidget = new LayerList({
                        view: view,
                        listItemCreatedFunction: function(event) {
                            const item = event.item;
                            if (item.layer.type != "group") {
                                // don't show legend twice
                                item.panel = {
                                    content: "legend",
                                    open: true
                                };
                            }
                        }
                    });
                    view.ui.add(activeWidget, "bottom-right");
                    setActiveButton(document.getElementById("legendButton"));
                    break;
                case "elevation":
                    activeWidget = new ElevationProfile({
                    view: view,
                    profiles: [
                        {
                            type: "ground"
                        },
                        {
                            type: "view"
                        }
                    ],
                    visibleElements: {
                        selectButton: false
                    }
                   });
                    view.when(function () {
                        view.ui.add(activeWidget, "bottom-right");
                        activeWidget.viewModel.start();
                    });
                    setActiveButton(document.getElementById("elevationButton"));
                    break;
                case "sight":
                    activeWidget = new LineOfSight({
                        view: view
                    });
                    view.ui.add(activeWidget, "bottom-right");
                    setActiveButton(document.getElementById("sightButton"));
                    break;
                case null:
                    if (activeWidget) {
                        view.ui.remove(activeWidget);
                        activeWidget.destroy();
                        activeWidget = null;
                    }
                    break;
            }
        }
        function setActiveButton(selectedButton) {
            view.focus();
            var elements = document.getElementsByClassName("active");
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.remove("active");
            }
            if (selectedButton) {
                selectedButton.classList.add("active");
            }
        }

    });