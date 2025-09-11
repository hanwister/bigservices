import React, { useState, useEffect, useRef, useCallback } from 'react';

const initialVariables = [
    { name: 'userData', description: 'Thông tin người dùng hiện tại.', insertText: 'userData' },
    { name: 'productData', description: 'Dữ liệu sản phẩm.', insertText: 'productData' },
    { name: 'apiResponse', description: 'Phản hồi từ API.', insertText: 'apiResponse' },
    { name: '$global', description: 'Biến toàn cục.', insertText: '$global' },
    { 
      name: '$local', 
      description: 'Biến cục bộ với cấu trúc JSON.', 
      insertText: '{\n  "tsd": "dfdsf",\n  "test": "dfsdf",\n  "pp": {\n    "dfds": 4564\n  }\n}' ,
      data: {
        tsd: "dfdsf",
        test: "dfsdf",
        pp: {
            dfds: 4564
        }
      }
    },
    { name: '$stream', description: 'Dữ liệu luồng.', insertText: '$stream' },
    { name: '$env', description: 'Biến môi trường.', insertText: '$env' },
    { 
      name: '$config', 
      description: 'Cấu hình ứng dụng với cấu trúc JSON.', 
      insertText: '{\n  "sadd": {\n    "dfsdf": {\n      "dfsdf": 45345\n    }\n  }\n}',
      data: {
        sadd: [{
          dfsdf: {
            dfsdf: 45345
          }
        },24234,2342, {fsdf:"dsfsdf"}]
      }
    },
    { name: '$utils', description: 'Hàm tiện ích.', insertText: '$utils' },
    { name: '$http', description: 'Thư viện HTTP.', insertText: '$http' },
    { name: '$auth', description: 'Thông tin xác thực.', insertText: '$auth' },
    { name: '$db', description: 'Kết nối cơ sở dữ liệu.', insertText: '$db' },
    { name: '$cache', description: 'Hệ thống cache.', insertText: '$cache' },
    { name: 'userProfile', description: 'Hồ sơ người dùng với cấu trúc JSON.', insertText: '{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john.doe@example.com"\n}' }
];

function App() {
  const [variableName, setVariableName] = useState('');
  const [variableDescription, setVariableDescription] = useState('');
  const [allVariables, setAllVariables] = useState(initialVariables);

  const editorRef = useRef(null);
  const monacoInstanceRef = useRef(null);
  const completionProviderRef = useRef(null);

  const getVariableValue = useCallback((path) => {
    const parts = path.split(/[\.\[\]]+/).filter(part => part !== '');
    if (parts.length === 0) return null;
    
    let baseVar = allVariables.find(v => v.name === `$${parts[0]}`);
    if (!baseVar || !baseVar.data) return null;
    
    let current = baseVar.data;
    for (let i = 1; i < parts.length; i++) {
        const part = parts[i];
        if (current === null || typeof current !== 'object') return null;
        current = current[part];
    }
    return current;
  }, [allVariables]);

  const setupVariableCompletionProvider = useCallback((monaco, variables) => {
    if (completionProviderRef.current) {
      completionProviderRef.current.dispose();
    }
    
    completionProviderRef.current = monaco.languages.registerCompletionItemProvider('html', {
      triggerCharacters: ['.', '[', '$'],
      provideCompletionItems: (model, position) => {
          const textUntilPosition = model.getValueInRange({
              startLineNumber: position.lineNumber, startColumn: 1,
              endLineNumber: position.lineNumber, endColumn: position.column
          });
          
          if (textUntilPosition.endsWith('$')) {
              const range = {
                  startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
                  startColumn: position.column, endColumn: position.column,
              };
              const suggestions = variables.filter(v => v.name.startsWith('$')).map(v => ({
                  label: { label: v.name, description: v.description },
                  kind: monaco.languages.CompletionItemKind.Variable,
                  documentation: v.description, insertText: v.name.substring(1), range: range,
              }));
              return { suggestions: suggestions };
          }
          
          const match = textUntilPosition.match(/([a-zA-Z_$][a-zA-Z0-9_]*|\$[a-zA-Z_]+)(?:\.[a-zA-Z0-9_]*|\[[^\]]*\])*\.?$/);
          let suggestions = [];

          if (match) {
              const fullPath = match[0].endsWith('.') ? match[0].slice(0, -1) : match[0];
              const pathParts = fullPath.split(/[\.\[\]]+/).filter(part => part !== '');
              const baseVarName = pathParts[0];

              const baseVariable = variables.find(v => v.name === baseVarName);

              if (baseVariable && baseVariable.data) {
                  let currentObject = baseVariable.data;
                  for (let i = 1; i < pathParts.length; i++) {
                      if (currentObject && typeof currentObject === 'object') {
                          currentObject = currentObject[pathParts[i]];
                      } else {
                          currentObject = null;
                          break;
                      }
                  }

                  if (currentObject && typeof currentObject === 'object') {
                      const range = {
                          startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
                          startColumn: position.column, endColumn: position.column
                      };
                      suggestions = Object.keys(currentObject).map(key => ({
                          label: { label: key, description: typeof currentObject[key] },
                          kind: typeof currentObject[key] === 'object' ? monaco.languages.CompletionItemKind.Folder : monaco.languages.CompletionItemKind.Variable,
                          documentation: `Value: ${JSON.stringify(currentObject[key])}`,
                          insertText: key, range: range,
                      }));
                  }
              }
          } else {
              const word = model.getWordUntilPosition(position);
              const range = {
                  startLineNumber: position.lineNumber, endLineNumber: position.lineNumber,
                  startColumn: word.startColumn, endColumn: word.endColumn,
              };
              suggestions = variables.map(v => ({
                  label: { label: v.name, description: v.description },
                  kind: monaco.languages.CompletionItemKind.Variable,
                  documentation: v.description, insertText: v.insertText || v.name, range: range,
              }));
          }
          return { suggestions: suggestions };
      },
    });
  }, [getVariableValue]);
  
  const setupHtmlCompletionProvider = useCallback((monaco) => {
    return monaco.languages.registerCompletionItemProvider('html', {
        triggerCharacters: ['<'],
        provideCompletionItems: (model, position) => {
            const textUntilPosition = model.getValueInRange({
                startLineNumber: 1, startColumn: 1,
                endLineNumber: position.lineNumber, endColumn: position.column,
            });
            if (!textUntilPosition.endsWith('<')) return { suggestions: [] };
            
            const suggestions = [
                {
                    label: 'div', kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<div>\n\t$0\n</div>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Tạo một cặp thẻ <div>.',
                },
                {
                    label: 'p', kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: '<p>$0</p>', insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    documentation: 'Tạo một cặp thẻ <p>.',
                },
            ];
            return { suggestions };
        }
    });
  }, []);

  useEffect(() => {
    let editorInstance;
    let htmlProvider;
    
    if (!window.monaco) {
      const loaderScript = document.createElement('script');
      loaderScript.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs/loader.js';
      document.body.appendChild(loaderScript);

      loaderScript.onload = () => {
        window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.41.0/min/vs' } });
        window.require(['vs/editor/editor.main'], (monaco) => {
          monacoInstanceRef.current = monaco;
          if (editorRef.current) {
            editorInstance = monaco.editor.create(editorRef.current, {
                value: `// Gõ "<" để xem gợi ý tự động hoàn thành cho các thẻ HTML như <div> và <p>.\n// Gõ "$" để xem gợi ý tự động hoàn thành cho các biến đã định nghĩa.\n\n<div className="my-component">\n    <p className="text-white">Chào mừng bạn đến với trình soạn thảo Monaco.</p>\n</div>`,
                language: 'html', theme: 'vs-dark',
                minimap: { enabled: true }, fontSize: 14, wordWrap: 'on', roundedSelection: true,
            });
            htmlProvider = setupHtmlCompletionProvider(monaco);
            setupVariableCompletionProvider(monaco, allVariables);
          }
        });
      };
    }

    return () => {
      editorInstance?.dispose();
      htmlProvider?.dispose();
      completionProviderRef.current?.dispose();
    };
  }, [setupHtmlCompletionProvider]);

  useEffect(() => {
    if (monacoInstanceRef.current) {
      setupVariableCompletionProvider(monacoInstanceRef.current, allVariables);
    }
  }, [allVariables, setupVariableCompletionProvider]);

  const handleAddVariable = () => {
    if (variableName) {
      const newVariable = {
        name: variableName,
        description: variableDescription || 'Biến tùy chỉnh.',
        insertText: variableName,
      };
      setAllVariables(prev => [...prev, newVariable]);
      setVariableName('');
      setVariableDescription('');
    }
  };

  return (
    // Thay đổi từ items-center thành items-start để căn lề trái
    <div className="bg-gray-900 text-gray-200 min-h-screen p-4 flex flex-col items-start font-sans">
      <div className="w-full max-w-4xl mb-4">
        <h1 className="text-2xl font-bold mb-2 text-white">Trình soạn thảo Monaco tùy chỉnh</h1>
        <p className="mb-4 text-gray-400">Thêm các biến mới dưới đây để xem gợi ý tự động được cập nhật.</p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
          <input
            type="text"
            className="flex-1 p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tên biến (ví dụ: myData)"
            value={variableName}
            onChange={(e) => setVariableName(e.target.value)}
          />
          <input
            type="text"
            className="flex-1 p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả (tùy chọn)"
            value={variableDescription}
            onChange={(e) => setVariableDescription(e.target.value)}
          />
          <button
            onClick={handleAddVariable}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold"
          >
            Thêm biến
          </button>
        </div>
      </div>

      {/* Loại bỏ max-w-4xl ở đây để editor tự động lấp đầy chiều rộng */}
      <div className="w-full"> 
        <div 
          ref={editorRef} 
          style={{ height: '70vh', borderRadius: '0.5rem', overflow: 'hidden' }}
        ></div>
        
        <div className="border border-gray-700 rounded-lg p-4 bg-gray-800 mt-4">
          <div className="flex flex-col space-y-4">
            <div className="p-4 bg-gray-700 rounded-md">
              <p className="text-gray-300">
                <span className="text-blue-400 font-bold">Lưu ý:</span>
                Đây là một ví dụ về cặp thẻ div và p. Bạn có thể sử dụng các lớp CSS của Tailwind để tạo kiểu cho các thẻ này.
              </p>
            </div>
            <div className="p-4 bg-gray-700 rounded-md">
              <p className="text-gray-300">
                <span className="text-blue-400 font-bold">Chú ý:</span>
                Các thẻ này được thêm trực tiếp vào HTML. Để sử dụng trong một framework như React, bạn sẽ cần tạo các thành phần JSX tương ứng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
export { App as Monica };