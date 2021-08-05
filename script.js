var modelHasLoaded = false;
var model = undefined;

cocoSsd.load().then((loadedModel) => {
	model = loadedModel;
	modelHasLoaded = true;
});

const holderOfImage = document.getElementsByClassName('skyNet');

const handleClick = (e) => {
	if (!modelHasLoaded) { return; }
	
	model.detect(e.target).then((predictions) => {
		for (let x = 0; x < predictions.length; x++) {
			const p = document.createElement('p');
			p.innerText =
			predictions[x].class +
			' - with ' +
			Math.round(parseFloat(predictions[x].score) * 100) +
			'% confidence.';
			p.style =
			'margin-left: ' +
			predictions[x].bbox[0] +
			'px; margin-top: ' +
			(predictions[x].bbox[1] - 10) +
			'px; width: ' +
			(predictions[x].bbox[2] - 10) +
			'px; top: 0; left: 0;';
			
			const innerSquare = document.createElement('div');
			innerSquare.setAttribute('class', 'innerSquare');
			innerSquare.style =
			'left: ' +
			predictions[x].bbox[0] +
			'px; top: ' +
			predictions[x].bbox[1] +
			'px; width: ' +
			predictions[x].bbox[2] +
			'px; height: ' +
			predictions[x].bbox[3] +
			'px;';
			
			e.target.parentNode.appendChild(innerSquare);
			e.target.parentNode.appendChild(p);
		}
	});
}

for (let i = 0; i < holderOfImage.length; i++) {
	holderOfImage[i].children[0].addEventListener('click', handleClick);
}