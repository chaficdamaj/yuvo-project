$(function () {
    var jsondatahourly = []
    var jsondatadaily = []
    var maxRxLvl = []
    var maxRxLvld = []
    var maxTxlvl = []
    var maxTxlvld = []
    var rsldeviation = []
    var rsldeviationd = []
    var timing = []
    var timingd = []
    var link = []
    var linkd = []
    var netype = []
    var netyped = []
    var nealias = []
    var nealiasd = []

    $.getJSON("https://localhost:44313/fetch-data-hourly", function (data) { //request json data
        for (var i in data) { //fill the array
            jsondatahourly.push(data[i]);
            maxRxLvl.push(data[i].maxRXlevel)
            maxTxlvl.push(data[i].maxTXlevel)
            rsldeviation.push(data[i].RSL_DEVIATION_db)
            timing.push(data[i]._TIME)
            link.push(data[i].link)
            netype.push(data[i].netype)
        }

    })
    var data_Source = new kendo.data.DataSource({

        transport: {
            read: {
                url: "https://localhost:44313/fetch-data-hourly",
                dataType: "JSON"
                
            }
        },
        group: {
            field: "_TIME"
        },
        schema: {
            model: {
                fields: {
                    _TIME: { type: "string" },
                    nealias: { type: "string" },
                    netype: { type: "string" },
                    
                    link: { type: "string" },
                    slot: { type: "string" },
                    maxRXlevel: { type: "number" },
                    maxTXlevel: { type: "number" },
                    RSLDeviation: { type: "number" }
                }
            }
        },
        sort: {
            field: "_TIME",
            dir: "desc"
        },

    });

    data_Source.fetch(function () {
        var data = data_Source.data();
   
        $("#chart").kendoChart({

            title: {

                text: "KPI-VARIATIONS"
            },

            legend: {
                position: "bottom"
            },

            seriesDefaults: {
                type: "line"
            },

            series: [{

                name: "MaxRxLevel",
                data: maxRxLvl
            },

            {
                name: "MaxTxLevel",
                data: maxTxlvl
            },

            {
                name: "RSL_DEVIATION",
                data: rsldeviation
            }

            ],

            valueAxis: {
                labels: {
                    format: "{0:n0}"
                }

            },

            zoomable: true,

            categoryAxis: {

                categories: timing,
                type: "date",
                labels: {
                    dateFormats: {
                        days: "M-d"
                    }
                }
            },
        });

        $("#grid").kendoGrid({
            columns: [{ title: "Time", field: "_TIME" },
            
            { title: "NEALIAS", field: "nealias" },
            { title: "NETYPE", field: "netype" },
            { title: "LINK", field: "link" },
            { title: "SLOT", field: "slot" },
            { title: "MAXRXLEVEL", field: "maxRXlevel" },
            { title: "MAXTXLEVEL", field: "maxTXlevel" },
            { title: "RSL_DEVIATION_db", field: "RSLDeviation" }],

            dataSource: {
                data: jsondatahourly,
            },
            height: 400,
            pageable: {
                pageSize: 25
            },
            sortable: true,
            filterable: true,




        });

    });
})
function getValue(radio) {
    var chart = $("#chart").data("kendoChart");
    chart.refresh();
    fetcheddata = []
    fetchedmaxrxlev = []
    fetchedmaxtxlev = []
    fetchedrsldev = []
    fetchedtime = []
    $.getJSON("https://localhost:44313/fetch-" + radio.value, function (data) {
        console.log("https://localhost:44313/fetch-" + radio.value);
        for (var i in data) {
            fetcheddata.push(data[i]);
            fetchedmaxrxlev.push(data[i].maxRXlevel)
            fetchedmaxtxlev.push(data[i].maxTXlevel)
            fetchedrsldev.push(data[i].RSLDeviation)
            fetchedtime.push(data[i]._TIME)
        }
    });

    var data_Source = new kendo.data.DataSource({

        transport: {
            read: {
                url: "https://localhost:44313/fetch-" + radio.value,
                dataType: "JSON"
            }
        },

        schema: {
            model: {
                fields: {
                    _TIME: { type: "string" },
                    nealias: { type: "string" },
                    netype: { type: "string" },
                    
                    link: { type: "string" },
                    slot: { type: "string" },
                    maxRXlevel: { type: "number" },
                    maxTXlevel: { type: "number" },
                    RSLDeviation: { type: "number" }
                }
            }
        },

        sort: {
            field: "Time",
            dir: "desc"
        },
    });
    


    data_Source.fetch(function () {
        $("#chart").kendoChart({

            title: {
                text: "KPI-VARIATIONS"
            },

            legend: {
                position: "bottom"
            },

            seriesDefaults: {
                type: "line"
            },

            series: [{
                name: "MaxRxLevel",
                data: fetchedmaxrxlev
            },

            {
                name: "MaxTxLevel",
                data: fetchedmaxtxlev
            },

            {
                name: "RSL_DEVIATION",
                data: fetchedrsldev
            }],

            valueAxis: {
                labels: {
                    format: "{0:n0}"
                }

            },
            zoomable: true,

            categoryAxis: {

                categories: fetchedtime,
                type: "date",
                labels: {
                    dateFormats: {
                        days: "M-d"
                    }
                }
            },


        });
        $("#grid").kendoGrid({
            dataSource: {
                data: fetcheddata,

            },
            height: 400,
            pageable: {
                pageSize: 25
            },
    
            columns: [{
                title: "TIME",
                field: "_TIME"
            }, {
                title: "NE_ALIAS",
                field: "nealias"
            }, {
                title: "NE_TYPE",
                field: "netype"
            }, {
                title: "LINK",
                field: "link"
            },
            {
                title: "SLOT",
                field: "slot"
            },  {
                title: "MAXRXLEVEL",
                field: "maxRXlevel"
            }, {
                title: "MAXTXLEVEL",
                field: "maxTXlevel"
            }, {
                title: "RSL_DEVIATION_db",
                field: "RSLDeviation"
            }]




        });
        
    });
    
}
function getFreightColor(freight) {
    if (freight > 60) {
      return "#090";
    } else if (freight < 30) {
      return "#f00";
    } else {
      return "#00c";
    }
  }

