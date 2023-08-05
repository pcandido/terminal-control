const { window, commands } = require('vscode')

function activate(context) {
	function register(command, fn) {
		const disposable = commands.registerCommand(command, fn)
		context.subscriptions.push(disposable)
	}

	for (let i = 1; i <= 9; i++) {
		register(`terminal-control.focus-${i}`, () => focusTerminal(i - 1))
	}

	register(`terminal-control.hide`, () => hidePanel())
	register(`terminal-control.add`, () => addTerminal())
	register(`terminal-control.close`, () => removeTerminal())
}

function focusTerminal(index) {
	const terminal = window.terminals[index]
	if (terminal) {
		terminal.show(false)
	}
}

function hidePanel() {
	window.activeTerminal.hide()
}

async function addTerminal() {
	window.createTerminal().show(false)
}

function removeTerminal() {
	window.activeTerminal.dispose()
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
