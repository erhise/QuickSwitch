# Angular QuickSwitch

This extension for Visual Studio Code lets you quickly switch between your associated component files. Enables you to quickly reach your template file for better productivity.

## How to use
The default keybindings to all commands are

* Open component class file (.ts) : `Ctrl + NumPad1`
* Open component template file (.html) : `Ctrl + NumPad2`
* Open component class file (.scss | .css) : `Ctrl + NumPad3`
* Open component class file (.spec.ts) : `Ctrl + NumPad4`

## Change to your own keybindings
To change default settings open up Keyboard Shortcuts (CTRL K + CTRL S), or your keybindings.json. Replace keybinding to something of your own preference.

* Commands for opening component ( class | template | style | test ) file
```json
"extension.open.class": "ctrl+numpad1",
"extension.open.template": "ctrl+numpad2",
"extension.open.style": "ctrl+numpad3"
"extension.open.test": "ctrl+numpad4"
```
* Command to toggle between (.ts) and (.html) file
```json
"extension.ngQuickSwitchToggle": "ctrl+alt+t"
```

## Invoke via Command Palette
If you don't want to use keybindings at all you can always open *Command Palette* with `Ctrl+Shift+P` and search for:
* Workspace: Toggle associated component files
* Workspace: Open component class file
* Workspace: Open component template file
* Workspace: Open component style file
* Workspace: Open component test file


## Release notes

* See the CHANGELOG for the latest release information.
