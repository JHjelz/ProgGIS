# ProgGis

## What is ProgGIS?

ProgGIS is the result from the project in subject TBA4251 Programming in Geomatics with the purpose of developing a webapplication that uses map and geographic information.

ProgGIS is a basic GIS-platform suitable for learning what a GIS is and how it works. The platform is web-based and does not need any pre-installations if you only want to learn how GIS works - therefor suitable for anyone with map interests!

## How does it work?

The platform is reached through the link: https://jhjelz.github.io/ProgGIS/

The webpage consists of a header with several buttons and a large map covering almost the whole page. Around the page do there exist a lot of buttons with different functionality, including a tutorial that describes all functionality of the page. The GIS functions arranged on the webpage is as follow:

- Buffer
- Difference
- Dissolve
- Extract
- Intersection
- Suitability
- Union

The webpage has also an user interface intended for point analyzes. This part of the application is reached via the pin at bottom left and it reorganizes the webpage. On this page can you either import some pre-defined points, upload your own point files, or add your own points manually. In addition, the following analysis tools are provided:

- TIN
- Voronoi-diagram
- Heatmap

Further instructions are described in a separate tutorial box.

Everything of navigation and file management on the webpage works via buttons and click events from the user. Data is saved in own buttons, select- or input-tags, something that makes the page very predictable and easy to use. There are no database or server connected to the webpage, so you cannot save something to further work - everything are reset if you refresh the page.

### Data

It is some pre-defined / arranged data in the applications that are customized the correct format to the page. This means that the geographic data is on geojson-format with latitude and longditude as coordinate system. This data can easily be opened via a button in the sidebar.

Else is it possible to add your own geojson files to the webpage via  a button in the sidebar that opens the file explorer for the user. This presupposes that the user has files in the correct format. This could be obtained through the following procedure for data from Norway:

- Download desired data sets from geonorge.no in SOSI-format
- Use SOSI2Shape to convert SOSI files to shape files
- Open the shape files in QGIS and define the coordinate system to the map to the same as the data sets (UTM 32N, 33N or 35N in Norway)
- Clip out a section of the data if desired
- Export the data layers to geojson with CRS: 4326 - global latitude and longditude system

The file you now obtaine can be uploaded to ProgGIS via a button in the sidebar.

## Possible errors

With large or complex data sets can some operations take some time, or maybe do not work at all. The functions of the webpage have a lot of checks to provide that all the data always are valid in the whole application. These tests should take care of most of the cases, but possibly not all.

Some values on parametres in some of the functions mentioned under 'How does it work?' can result in error messages or no response in the system, but this occurs very rarely.

##

Then I only wish you good fun, and good luck!

Jakob S. S. Hjelseth
