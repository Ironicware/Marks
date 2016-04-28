const Electron = nodeRequire('electron');
const remote = Electron.remote;
const ipcRenderer = Electron.ipcRenderer;

const fs = nodeRequire('fs');
const path = nodeRequire('path');

$(document).ready(function()
{
	$('#splitter-sidebar').css('left', $('#sidebar').outerWidth() + 30 - 2 + 'px');
	$('#splitter-sidebar').draggable({
		containment: 'document',
		axis: 'x',
		drag: (event, ui) => {
			$('#sidebar').width(ui.position.left - 30 + 2);
			$('.class-view').css('margin-left', ui.position.left + 2 + 'px');
		}
	});
	var sensor = new ResizeSensor($('#sidebar')[0], () => {
		$('#splitter-sidebar').css('left', $('#sidebar').outerWidth() + 30 - 2 + 'px');
	});
	
	$('.tree').treegrid();
});

ipcRenderer.on('shortcutActivated', (event, shortcut) => {
	if (shortcut === 'reload') location.reload();
	else if (shortcut === 'devtools') remote.getCurrentWindow().toggleDevTools();
});