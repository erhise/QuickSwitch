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
        switch (extension) {
            case 'ts':
                if (QuickSwitch.fileExists(fileName + 'html')) {
                    newExtension = 'html';
                }
                break;
        
            case 'html':
            case 'scss':
            case 'css':
            case 'spec.ts':
                if (QuickSwitch.fileExists(fileName + 'ts')) {
                    newExtension = 'ts';
                }

            default:
                break;
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
        } else if (withExtension === 'scss') {
            if (QuickSwitch.fileExists(fileName + 'css')) {
                newExtension = 'css';
            }
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
            window.showInformationMessage('Make sure editor is active');
            return undefined;
        }

        const file: string = editor.document.fileName;

        let extension: string, fileName: string;
        if (file.endsWith('.spec.ts')) {
            extension = 'spec.ts';
            fileName = file.substr(0, file.length - extension.length);
        } else {
            extension = file.substr(file.lastIndexOf('.') + 1).toLowerCase();
            fileName = file.substr(0, file.lastIndexOf('.') + 1);
        }

        if (extension !== 'ts'
            && extension !== 'html'
            && extension !== 'scss'
            && extension !== 'css'
            && extension !== 'spec.ts'
        ) {
            window.showInformationMessage('Unsupported file type');
            return undefined;
        }
        return { fileName, extension };
    }

    public dispose(): void {}
}