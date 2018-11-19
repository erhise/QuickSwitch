'use strict';
import { commands, ExtensionContext } from 'vscode';
import { QuickSwitch } from './quick-switch';

export function activate(ctx: ExtensionContext): void {

    const quickSwitch = new QuickSwitch();
    const toggleFiles = commands.registerCommand('extension.ngQuickSwitchToggle', () => {
        quickSwitch.toggleComponentFiles();
    });
    const openClassFile = commands.registerCommand('extension.ngQuickSwitchOpenClass', () => {
        quickSwitch.openFile('ts');
    });
    const openTemplateFile = commands.registerCommand('extension.ngQuickSwitchOpenTemplate', () => {
        quickSwitch.openFile('html');
    });
    const openStyleFile = commands.registerCommand('extension.ngQuickSwitchOpenStyle', () => {
        quickSwitch.openFile('scss');
    });

    ctx.subscriptions.push(toggleFiles);
    ctx.subscriptions.push(openClassFile);
    ctx.subscriptions.push(openTemplateFile);
    ctx.subscriptions.push(openStyleFile);
}