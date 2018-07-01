import {
	$
} from './util.js'
import {
	addLinkToPage,
	addWebRingMemberToPage,
	setGlobalError
} from './ui.js'
import * as config from './config.js'


async function readPortalLinks(archive) {
	try {
		var json = await archive.readFile('/portal.json', 'utf8')
		var portal = JSON.parse(json)
		portal.forEach(link => {
			link.date = new Date(link.date)
		})
		return portal
	} catch (e) {
		console.error('Failed to load portal.json', archive.url, e)
		return []
	}
}

async function readWebRing(archive) {
	try {
		var json = await archive.readFile('/web-ring.json', 'utf8')
		var webRing = JSON.parse(json)
		return webRing
	} catch (e) {
		console.error('Failed to load web-ring.json', archive.url, e)
		return []
	}
}

async function readPortal(archive, sourceName, maxDepth = 0, depth = 0) {
	// fetch the portal's data
	var webRing = await readWebRing(archive)
	var links = await readPortalLinks(archive)

	// attach the origin archive to each
	links.forEach(link => {
		link.archive = archive
		link.webRingName = sourceName
		link.webRingDepth = depth
	})

	if (depth < maxDepth) {
		for (var webRingMember of webRing) {
			let wrmArchive = new DatArchive(webRingMember.url)
			let res = await readPortal(wrmArchive, webRingMember.name, maxDepth, depth + 1)
			links = links.concat(res.links)
		}
	}

	// return
	return {
		webRing,
		links
	}
}

function onChangeHops(e) {
	config.setHops(e.target.value)
	window.location.reload()
}

async function onPageLoad() {
	var archive = new DatArchive(window.location)
	var archiveInfo = await archive.getInfo()
	document.title = archiveInfo.title
	$('#page-title').textContent = archiveInfo.title

	// attach UI events
	$('#hops-config').value = config.getHops()
	$('#hops-config').addEventListener('change', onChangeHops)

	// load data
	var {
		webRing,
		links
	} = await readPortal(archive, 'Paul', config.getHops())
	if (links.length === 0) {
		setGlobalError('Sorry! We had trouble loading the content for the page. Try refreshing.')
	}
	links.sort((a, b) => {
		var dateDiff = (b.date.getTime() - a.date.getTime())
		if (dateDiff !== 0) return dateDiff
		return b.webRingDepth < a.webRingDepth ? 1 : 0
	})

	// render
	webRing.forEach(addWebRingMemberToPage)
	links.forEach(addLinkToPage)
}
onPageLoad()

window.onload = checkBrowser();
function checkBrowser() {
	var str = "" + window.location.href;
	if (str.includes("https")) {
		document.getElementById("main").style.visibility = 'hidden';
		window.location.href = "dat://datportal.hashbase.io";
		document.body.innerHTML = '<p class="alert">Please use the Beaker Browser to get full access to the page!</p>';
	}
}

