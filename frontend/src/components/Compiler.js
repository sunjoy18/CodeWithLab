import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import '../css/Compiler.css'
import Logo from '../Logo.png'
import { Link } from 'react-router-dom'

import MonacoEditor from 'react-monaco-editor';
import { green } from '@mui/material/colors';
import { Button, InputLabel, Select } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import SendIcon from '@mui/icons-material/Send';
import FormControl from '@mui/material/FormControl';

const Compiler = () => {

    //
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = "";
            return "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);
    //

    const [inputTextarea, setInputTextarea] = useState('');
    const [codeTextarea, setCodeTextarea] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [output, setOutput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();
    // const [glotResponse, setGlotResponse] = useState({ stdout: '', stderr: '', }); // for seperate error and output

    const getDefaultCode = (language) => {
        switch (language) {
            case 'ats':
                return `#include "share/atspre_define.hats"\nimplement main0 () = print("Hello, World!")\n
                `;
            case 'bash':
                return 'echo "Hello, World!"';
            case 'c':
                return '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}';
            case 'cpp':
                return '#include <iostream>\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}';
            case 'csharp':
                return 'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}';
            case 'clojure':
                return '(println "Hello, World!")';
            case 'cobol':
                return "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. hello.\n\n       PROCEDURE DIVISION.\n           DISPLAY 'Hello World!'\n           GOBACK\n           .";
            case 'coffeescript':
                return 'console.log "Hello, World!"';
            case 'crystal':
                return 'puts "Hello, World!"';
            case 'd':
                return 'import std.stdio;\nvoid main() {\n    writeln("Hello, World!");\n}';
            case 'dart':
                return 'void main() {\n  print("Hello, World!");\n}';
            case 'elixir':
                return 'IO.puts "Hello, World!"';
            case 'elm':
                return 'module Main exposing (..)\nimport Html exposing (text)\nmain = text "Hello, World!"';
            case 'erlang':
                return "% escript will ignore the first line\n\nmain(_) ->\n    io:format(\"Hello World!~n\").";
            case 'fsharp':
                return 'printfn "Hello, World!"';
            case 'go':
                return 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, World!")\n}';
            case 'groovy':
                return 'println "Hello, World!"';
            case 'guile':
                return '(display "Hello, World!") (newline)';
            case 'hare':
                return 'output("Hello, World!")';
            case 'haskell':
                return 'main :: IO ()\nmain = putStrLn "Hello, World!"';
            case 'idris':
                return 'main : IO ();\nmain = putStrLn "Hello, World!"';
            case 'java':
                return "class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n}";
            case 'javascript':
                return 'console.log("Hello, World!");';
            case 'julia':
                return 'println("Hello, World!")';
            case 'kotlin':
                return 'fun main() {\n    println("Hello, World!")\n}';
            case 'lua':
                return 'print("Hello, World!")';
            case 'mercury':
                return ":- module main.\n:- interface.\n:- import_module io.\n\n:- pred main(io::di, io::uo) is det.\n\n:- implementation.\n\nmain(!IO) :-\n    io.write_string(\"Hello World!\", !IO).";
            case 'nim':
                return 'echo "Hello, World!"';
            case 'nix':
                return "let\n    hello = \"Hello World!\";\nin\nhello";
            case 'ocaml':
                return "print_endline \"Hello World!\"";
            case 'perl':
                return 'print "Hello, World!\\n";';
            case 'php':
                return "<?php\n\necho \"Hello World!\\n\";";
            case 'plaintext':
                return 'Hello, World!';
            case 'python':
                return 'print("Hello, World!")';
            case 'raku':
                return 'say "Hello, World!"';
            case 'ruby':
                return 'puts "Hello, World!"';
            case 'rust':
                return 'fn main() {\n    println!("Hello, World!");\n}';
            case 'sac':
                return "int main () {\n    StdIO::printf (\"Hello World!\");\n    return 0;\n}";
            case 'scala':
                return "object Main extends App {\n    println(\"Hello World!\")\n}";
            case 'swift':
                return 'print("Hello, World!")';
            case 'typescript':
                return 'console.log("Hello, World!");';
            case 'vb':
                return 'Module HelloWorld\n    Sub Main()\n        Console.WriteLine("Hello, World!")\n    End Sub\nEnd Module';
            case 'yaml':
                return 'Hello, World!';
            case 'zig':
                return "const std = @import(\"std\");\n\npub fn main() !void {\n    const stdout = std.io.getStdOut().writer();\n    try stdout.print(\"{s}\\n\", .{\"Hello World!\"});\n}";
            default:
                return '';
        }
    };


    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: false,
        fontSize: 14,
        lineHeight: 20,
        minimap: {
            enabled: false,
        },
        scrollbar: {
            vertical: 'hidden',
            horizontal: 'auto',
        },
        wordWrap: 'on',
        folding: true,
        renderIndentGuides: true,
        theme: 'vs-dark', // You can change this to 'vs' for light theme
    };




    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        setCodeTextarea(getDefaultCode(language));
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);


        // Read the content of the file and update the codeTextarea
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = e.target.result;
            setCodeTextarea(fileContent);
        };
        reader.readAsText(file);


        // Get the file extension
        const fileExtension = file.name.split('.').pop().toLowerCase();


        // Update the selected language based on the file extension
        const matchingLanguage = Object.keys(languageFileExtensions).find(
            (language) => languageFileExtensions[language] === fileExtension
        );
        if (matchingLanguage) {
            setSelectedLanguage(matchingLanguage);
        }
    };




    const runCode = async () => {
        const formData = new FormData();
        formData.append('language', selectedLanguage);
        formData.append('input', inputTextarea);
        formData.append('code', codeTextarea);
        if (selectedFile) {
            formData.append('file', selectedFile);
        }


        try {
            const response = await axios.post('http://localhost:5000/api/run-code', {
                language: selectedLanguage,
                input: inputTextarea,
                code: codeTextarea,
            });


            setOutput(`${response.data.stdout}`);
            setError(`${response.data.stderr}`);

            // setGlotResponse({
            //   stdout: response.data.stdout,
            //   stderr: response.data.stderr,
            // });

        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (!selectedLanguage) {
                setError(`Please select a language first.`);
                alert(`Please select a language first.`);
            }
        }
    };


    const languageFileExtensions = {
        ats: 'ats',
        bash: 'sh',
        c: 'c',
        cpp: 'cpp',
        csharp: 'cs',
        clojure: 'clj',
        cobol: 'cob',
        coffeescript: 'coffee',
        crystal: 'cr',
        d: 'd',
        dart: 'dart',
        elixir: 'ex',
        elm: 'elm',
        erlang: 'erl',
        fsharp: 'fs',
        go: 'go',
        groovy: 'groovy',
        guile: 'scm',
        haskell: 'hs',
        idris: 'idr',
        java: 'java',
        javascript: 'js',
        julia: 'jl',
        kotlin: 'kt',
        lua: 'lua',
        mercury: 'm',
        nim: 'nim',
        nix: 'nix',
        ocaml: 'ml',
        perl: 'pl',
        php: 'php',
        plaintext: 'txt',
        python: 'py',
        raku: 'raku',
        ruby: 'rb',
        rust: 'rs',
        sac: 'sac',
        scala: 'scala',
        swift: 'swift',
        typescript: 'ts',
        vb: 'vb',
        zig: 'zig',
    };


    const DownloadCode = () => {
        const fileExtension = languageFileExtensions[selectedLanguage] || 'txt'; // Default to 'txt' if language not found
        const fileName = `code.${fileExtension}`;
        const blob = new Blob([codeTextarea], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };


    const handleUploadButtonClick = () => {
        // Trigger the file input click event
        fileInputRef.current.click();
    };


    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };


    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);


    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };


    const handleRunButtonClick = () => {
        handleButtonClick();
        runCode();
    };

    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener('keydown', handleKeyDown);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    const handleKeyDown = (event) => {
        // Check if Ctrl key and 'O' key are pressed
        if (event.ctrlKey && event.key === 'o') {
            // Prevent the default browser refresh action
            event.preventDefault();

            // Call your function
            handleRunButtonClick();
        }
    };



    return (
        <>
            <section id="header">
                <div className="navbar-title">
                    <img src={Logo} alt='CWL Logo' style={{ height: "1.8rem", width: "1.8rem" }} />
                    <h3>
                        <Link className="title-first-name" to="/">CodeWithLab</Link>
                    </h3>
                    <p className="title-last-name">
                        Compiler
                    </p>
                </div>

                <FormControl required fullWidth error sx={{ maxWidth: '200px', maxHeight: '40px', minHeight: '20px' }} size="small">
                    <InputLabel >Select language</InputLabel>
                    <Select
                        sx={{ color: '#15A435' }}
                        native
                        id="languageDropdown"
                        value={selectedLanguage}
                        label="Select language"
                        onChange={(e) => handleLanguageChange(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="ats">ATS</option>
                        <option value="bash">Bash</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="csharp">C#</option>
                        <option value="clojure">Clojure</option>
                        <option value="cobol">COBOL</option>
                        <option value="coffeescript">CoffeeScript</option>
                        <option value="crystal">Crystal</option>
                        <option value="d">D</option>
                        <option value="dart">Dart</option>
                        <option value="elixir">Elixir</option>
                        <option value="elm">Elm</option>
                        <option value="erlang">Erlang</option>
                        <option value="fsharp">F#</option>
                        <option value="go">Go</option>
                        <option value="groovy">Groovy</option>
                        <option value="guile">Guile</option>
                        <option value="haskell">Haskell</option>
                        <option value="idris">Idris</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                        <option value="julia">Julia</option>
                        <option value="kotlin">Kotlin</option>
                        <option value="lua">Lua</option>
                        <option value="mercury">Mercury</option>
                        <option value="nim">Nim</option>
                        <option value="nix">Nix</option>
                        <option value="ocaml">OCaml</option>
                        <option value="perl">Perl</option>
                        <option value="php">PHP</option>
                        <option value="plaintext">Plaintext</option>
                        <option value="python">Python</option>
                        <option value="raku">Raku</option>
                        <option value="ruby">Ruby</option>
                        <option value="rust">Rust</option>
                        <option value="sac">SAC</option>
                        <option value="scala">Scala</option>
                        <option value="swift">Swift</option>
                        <option value="typescript">TypeScript</option>
                        <option value="zig">Zig</option>
                    </Select>
                </FormControl>

                <div>
                    <ul className="right-side">
                        <li>
                            <Button
                                className='btns'
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                onClick={handleUploadButtonClick}
                                style={{ maxHeight: '40px', minHeight: '20px' }}
                            >
                                Import File
                            </Button>
                        </li>

                        <li>
                            <Button
                                className='btns'
                                component="label"
                                variant="contained"
                                startIcon={<BrowserUpdatedIcon />}
                                onClick={DownloadCode}
                                style={{ maxHeight: '40px', minHeight: '20px' }}
                            >
                                Download
                            </Button>
                        </li>

                        <li>
                            <Button
                                className="run-btn"
                                color="success"
                                endIcon={<SendIcon />}
                                onClick={handleRunButtonClick}
                                variant="contained"
                                sx={buttonSx}
                                style={{ visibility: selectedLanguage === 'plaintext' ? 'hidden' : 'visible', maxHeight: '40px', minHeight: '20px' }}
                            > Run </Button>
                            <div className="dropdown-content">'Ctrl + O'</div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* for code input and outout div */}


            <div style={{ display: 'flex' }}>
                <div id='editbox' style={{ flex: 1, marginRight: '20px', marginLeft: '20px', marginTop: '20px' }}>

                    <MonacoEditor
                        editorId="codeTextarea"
                        width="1000"
                        height="625px"
                        language={selectedLanguage}
                        theme="vs-dark"
                        value={codeTextarea}
                        options={editorOptions}
                        onChange={(newValue, e) => {
                            setCodeTextarea(newValue);
                        }}
                    />

                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }} // Hide the file input
                    />
                </div>

                <div id="input-output">
                    <label htmlFor="inputTextarea">Enter Input:</label>
                    <br />
                    <div>
                        <textarea
                            className='inputHolder'
                            rows="5"
                            placeholder="Provide 'Input' before running the code (if any)"
                            value={inputTextarea}
                            onChange={(e) => setInputTextarea(e.target.value)}
                        />
                    </div>
                    <br />

                    <label htmlFor="inputTextarea">Output:</label><br />
                    <div className='output'>
                        <pre style={{ color: 'green' }}>{output}</pre>
                    </div>
                    <br />

                    <label htmlFor="inputTextarea">Error:</label><br />
                    <div className='output'>
                        <pre style={{ color: 'red' }}>{error}</pre>
                    </div>


                </div>
            </div >

            {loading && (
                <div class="spinner" ></div>
            )}
        </>
    )
}

export default Compiler
