'use strict';
import { commands, ExtensionContext } from 'vscode';
import { QuickSwitch } from './quick-switch';

export function activate(ctx: ExtensionContext): void {

    const quickSwitch = new QuickSwitch();

    const toggleFiles = commands.registerCommand('extension.ngQuickSwitchToggle', () => {
        quickSwitch.toggleComponentFiles();
    });
    const openClassFile = commands.registerCommand('extension.open.class', () => {
        quickSwitch.openFile('ts');
    });    
    const openTemplateFile = commands.registerCommand('extension.open.template', () => {
        quickSwitch.openFile('html');
    });
    const openStyleFile = commands.registerCommand('extension.open.style', () => {
        quickSwitch.openFile('scss');
    });
    const openTestFile = commands.registerCommand('extension.open.test', () => {
        quickSwitch.openFile('spec.ts');
    });

    ctx.subscriptions.push(
        toggleFiles,
        openClassFile,
        openTemplateFile,
        openStyleFile,
        openTestFile,
    );
}

export function deactivate() {}