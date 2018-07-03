import {
	daysAgo
} from './time.js'
import {
	$,
	clone
} from './util.js'


export function addLinkToPage(link, index) {

	var el = clone($('#links-list-item-template'))
	$(el, '.index').textContent = `${index + 1}.`
	$(el, '.origin').textContent = link.webRingName
	$(el, '.link').textContent = link.title
	$(el, '.link').setAttribute('href', link.href)
	$(el, '#bg-image').setAttribute('src', link.href)
	$(el, '.link').setAttribute('title', link.title)
	$(el, '.date').textContent = daysAgo(link.date)
	$(el, '.domain').textContent = link.href
	$('#links-list').appendChild(el)
		
}

 export function addWebRingMemberToPage(webRingMember) {
	var el = clone($('#web-ring-member-template'))
	$(el, '.link').textContent = webRingMember.name + " / "
	$(el, '.link').setAttribute('href', webRingMember.url)
	//$('#web-ring').appendChild(el)
} 

export function setGlobalError(err) {
	var el = clone($('#global-error-template'))
	$(el, '.error').textContent = err.toString()
	$('#global-error').innerHTML = ''
	$('#global-error').appendChild(el)
}

$('#forkPage').addEventListener("click", onFork);

function onFork(e) {
	e.preventDefault()
	var originalPortal = "https://portal-pfrazee.hashbase.io/"
	DatArchive.resolveName(originalPortal).then(url => {
		return DatArchive.fork(url, {
			title: 'Your own Portal',
			description: 'This is a template of the original portal by Paul Frazee.',
		})
	}).then(fork => {
		window.location = fork.url
	})
}

$('#aboutbtn').addEventListener("click", about);

function about() {
	swal({
		title: '',
		html: '<p class="swal-about"> <b class="swal-title">About the Dat Portal</b> <br /><br />The Dat Portal is a way to discover content on dat:// . <br /> It is a copy of the livestream project from Paul Frazee. I just changed it a bit. A full description and explanation of how it works can be found on GitHub.</p> <br /><br /> <p class="swal-about"><b class="swal-title">Add your own portal to the web ring</b> <br /><br /> Just contact me via GitHub or Twitter and I will add your URL. Please make sure you have uploaded your portal to Hashbase.io. Thus, it is always available. :D</p> <p class="swal-about"><a href="https://github.com/mpweber/Dat-Portal" target="_blank" class="swal-link">Dat Portal on Github</a> <br /> <a href="https://twitter.com/mp_weber" class="swal-link" target="_blank">mpweber on Twitter</a></p>',
		showCloseButton: false,
		showCancelButton: false,
		showConfirmButton: false,
		focusConfirm: false,
	})
}
