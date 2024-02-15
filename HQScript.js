var _loaded = {};
var downloadCancel = false;
var formLaitStep = 1;

function addScript(url) {
	if (!_loaded[url]) {
		var s = document.createElement("script");
		s.onload = function () {};

		s.src = url;
		document.head.appendChild(s);
		_loaded[url] = true;
	}
}

function CustomHQStyle() {
	if (!window.jQuery) {
		var s = document.createElement("script");
		s.onload = function () {
			if ($(".hq-checkmark").length == 0) {
				CustomCheckboxes();
			}
			if ($(".hq-radio-mark").length == 0) {
				CustomRadioButtons();
			}
		};

		s.src = "https://code.jquery.com/jquery-3.7.1.min.js";
		document.head.appendChild(s);
	} else {
		if ($(".hq-checkmark").length == 0) {
			CustomCheckboxes();
		}
		if ($(".hq-radio-mark").length == 0) {
			CustomRadioButtons();
		}
	}
}

function CustomCheckboxes() {
	$(".hq-checkbox-form > .form-check.checkbox > label > input").after(
		'<div class="hq-checkmark"></div>'
	);
}

function CustomRadioButtons() {
	$(".hq-radio-form > div > .radio.form-check-inline > label > input").each(
		function () {
			$(this).after('<div class="hq-radio-mark"></div>');
		}
	);
}

function FormLaitSteps(step) {
	if (step != undefined) {
		formLaitStep = step;
	}

	switch (formLaitStep) {
		case 1:
			$("div[ref='nested-qualificationPanel'")
				.parent()
				.parent()
				.css("display", "block");
			break;
		case 2:
			$("div[ref='nested-qualificationPanel'")
				.parent()
				.parent()
				.css("display", "block");
			break;
			break;
	}
}

async function downloadFormData(form) {
	addScript("https://code.jquery.com/jquery-3.7.1.min.js");
	addScript("https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js");
	addScript("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js");
	addScript(
		"https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js"
	);

	var urls = [];
	downloadCancel = false;
	$("#cancelDownload").click(function () {
		StopDownload();
	});
	progress(2, 100);
	var progressModal = $("#progressModal").modal({
		backdrop: "static",
		keyboard: false,
	});
	var progressBar = $("#formDownloadProgress");

	const formio = new Formio(
		"https://devformioapi.hema-quebec.qc.ca/api-dev/laitmaternel"
	);

	var submissions = await formio.loadSubmissions({
		params: {
			sort: "-created",
			limit: 100,
		},
	});
	progress(0, submissions.length);

	progressModal.modal("show");
	if (downloadCancel) {
		return;
	}
	for (let i = 0; i < submissions.length; i++) {
		if (downloadCancel) {
			return;
		}
		progress(i + 1, submissions.length);
		const subm = new Formio(
			"https://devformioapi.hema-quebec.qc.ca/api-dev/laitmaternel/submission/" +
				submissions[i]._id
		);
		var url = await subm.getDownloadUrl();
		var response = await axios.get(url, { responseType: "blob" });
		var fileName = `${submissions[i].data.nom}_${submissions[i].data.prenom}_${
			submissions[i].created.split(".")[0]
		}`;

		var subObj = {};
		subObj.data = response.data;
		subObj.fileName = fileName;
		subObj.csv = submissions[i].data.nom + "," + submissions[i].data.prenom;
		urls.push(subObj);
	}
	if (downloadCancel) {
		return;
	}
	const zip = JSZip();
	urls.forEach((blob, i) => {
		zip.file(blob.fileName + ".pdf", blob.data);
		zip.file(blob.fileName + ".csv", blob.csv);
	});
	if (downloadCancel) {
		return;
	}
	zip.generateAsync({ type: "blob" }).then((zipFile) => {
		const currentDate = new Date().getTime();
		const fileName = `lait_maternel-${currentDate}.zip`;
		const element = document.createElement("a");
		element.setAttribute("href", window.URL.createObjectURL(zipFile));
		element.setAttribute("download", fileName);
		element.style.display = "none";
		document.body.appendChild(element);
		element.click();
		progressModal.modal("hide");
		document.body.removeChild(element);
	});
}

function progress(val, max) {
	var prog = Math.round((val / max) * 100);
	var progressBar = $("#formDownloadProgress");

	if (max != 100) {
		progressBar.html(val + "/" + max);
	}

	progressBar.attr("aria-valuenow", prog);
	progressBar.css("width", prog + "%");
}

function StopDownload() {
	var progressModal = $("#progressModal").modal({
		backdrop: "static",
		keyboard: false,
	});
	downloadCancel = true;
	progressModal.modal("hide");
}
