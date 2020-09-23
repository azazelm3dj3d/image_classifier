var modelHasLoaded = false;
var model = undefined;

cocoSsd.load().then(function (loadedModel) {
	model = loadedModel;
	modelHasLoaded = true;
});

const holderOfImage = document.getElementsByClassName('skyNet');

for (let i = 0; i < holderOfImage.length; i++) {
	holderOfImage[i].children[0].addEventListener('click', handleClick);
}

function handleClick(event) {
	if (!modelHasLoaded) {
		return;
	}

	model.detect(event.target).then(function (predictions) {
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

			event.target.parentNode.appendChild(innerSquare);
			event.target.parentNode.appendChild(p);
		}
	});
}
