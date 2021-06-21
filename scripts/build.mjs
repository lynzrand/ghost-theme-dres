import less from 'less'
import { readFileSync, writeFileSync } from 'fs'
import ts from 'typescript'
{
    console.log("Compiling LESS -> CSS")
    let result = await less.render(readFileSync("assets/main.less", { encoding: 'utf-8' }))
    writeFileSync("assets/main.css", result.css)
}

{
    console.log("Compiling TypeScript -> JS")
    let tsProgram = ts.createProgram(['./assets/scripts/main.ts'], {})
    let emitResult = tsProgram.emit()

    let allDiagnostics = ts
        .getPreEmitDiagnostics(tsProgram)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            let { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        }
    });

    let exitCode = emitResult.emitSkipped ? 1 : 0;
    console.log(`Process exiting with code '${exitCode}'.`);
    process.exit(exitCode);
}
