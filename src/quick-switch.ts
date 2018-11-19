import { window, workspace } from 'vscode';
import * as fs from 'fs';

export class QuickSwitch {

    static fileExists(file: string): boolean {
        return fs.existsSync(file);
    }

    public toggleComponentFiles(): void {
        const file = this.checkFile();

        if (!file) {
            return;
        }

        const { fileName, extension } = file;

        let newExtension: string = '';
        if (extension === 'ts' && QuickSwitch.fileExists(fileName + 'html')) {
            newExtension = 'html';
        }
        else if (extension === 'html' && QuickSwitch.fileExists(fileName + 'ts')) {
            newExtension = 'ts';
        }

        if (newExtension.length > 0) {
            workspace.openTextDocument(fileName + newExtension).then(
                document => window.showTextDocument(document)
            );
        } else {
            window.showErrorMessage('No matching file found');
        }
    }

    public openFile(withExtension: string): void {
        const file = this.checkFile();
        
        if (!file) {
            return;
        }
        
        const { fileName } = file;
        
        let newExtension: string = '';
        if (QuickSwitch.fileExists(fileName + withExtension)) {
            newExtension = withExtension;
        }
        
        if (newExtension.length > 0) {
            workspace.openTextDocument(fileName + newExtension).then(
                document => window.showTextDocument(document)
            );
        } else {
            window.showErrorMessage('No matching file found');
        }
    }
    
    private checkFile(): { fileName: string, extension: string } | undefined {
        const editor = window.activeTextEditor;

        if (!editor) {
            return undefined;
        }

        const file: string = editor.document.fileName;
        const extension: string = file.substr(file.lastIndexOf('.') + 1).toLowerCase();
        const fileName: string = file.substr(0, file.lastIndexOf('.') + 1);

        if (extension !== 'ts' && extension !== 'html') {
            return undefined;
        }

        return { fileName, extension };
    }

    public dispose(): void {}
}