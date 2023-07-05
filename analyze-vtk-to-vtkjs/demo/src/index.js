// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkPolyDataReader from '@kitware/vtk.js/IO/Legacy/PolyDataReader';
import vtk from "@kitware/vtk.js/vtk";

const fileName = 'sphere.vtk'; // 'uh60.vtk'; // 'luggaBody.vtk';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

const resetCamera = renderer.resetCamera;
const render = renderWindow.render;

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

const reader = vtkPolyDataReader.newInstance();

//url for the vtk file
// var filename = 'blast.vtk';
// var vtkUrl = `http://${location.host}/modules/${filename}`;
const sphereUrl = 'modules/sphere.vtk'
const furnaceUrl = 'modules/blast-furnace.vtk'



reader.setUrl(furnaceUrl).then(() => {

    const polydata = reader.getOutputData(0);
    const mapper = vtkMapper.newInstance();
    const actor = vtkActor.newInstance();

    actor.setMapper(mapper);
    mapper.setInputData(polydata);

    renderer.addActor(actor);

    resetCamera();
    render();
});

// -----------------------------------------------------------
// Make some variables global so that you can inspect and
// modify objects in your browser's developer console:
// -----------------------------------------------------------

global.reader = reader;
global.fullScreenRenderer = fullScreenRenderer;
