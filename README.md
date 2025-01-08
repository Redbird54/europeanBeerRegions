Run express server by using 'node main.js' or 'npm start'.
Can run tests using 'npm test'.

Values for connecting to Database (DB\_HOST, DB\_USER, DB\_PASSWORD, DB\_NAME) and tokens (e.g. SECRET_TOKEN) are within .env file.

Gathering geoJSON instructions:
1) Search online for a file that generally matches the correct shapes 
2) Reduce the size of the file using mapshaper.org. Generally want the size of each file between 500KB and 2MB.
3) Add in "name" and "country" fields into each feature.
4) Use QGIS-LTR application to combine previous borders. I.e. if adding in a new country Y that borders old country X, then must add in countries X and Y into the application (Layer -> Add Layer -> Add Vector Layer then select files one at a time in source box, don't worry about the settings).
    a) With country Y, make sure to fix it so that it has valid geometry. Use "Fix geometries" in the toolbox (under Processing -> Toolbox).
    b) With new fixed geometry snap borders together. Use "Snap geometries to layer" in the toolbox. Select the newly fixed layer as Input layer and country X as Reference layer. Currently I am using 0.1 degrees as the tolerance, do not save this yet!
    c) Double check this snapped together correctly, especially along the ends of the border. If there are errors they must be fixed. To do this right click on snapped layer and select "Toggle Editing". Then select "Vertex Tool" from the Data Source Manager Toolbar (if not seen, open it under View -> Toolbars -> Advanced Digitizing Toolbar). Use this tool to adjust the the off points.
    d) Repeat set 4a) with the newly snapped geometry.
    e) Finally, repeat step 4b with the newly edited geometry. This can be saved!!
5) Finally, check the new shape on the edges of borders. This can be done using geojson.io to see the shape and google maps to find specific coordinates.
6) The country is done and ready to move onto the next country!