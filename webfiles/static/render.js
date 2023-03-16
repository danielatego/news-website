let token_data = document.getElementById("content_idx").value;
    console.log(token_data);
    token_data = JSON.parse(token_data);
    console.log(token_data);
    const editor = new EditorJS({ 
        holder: 'editorjs', 
        readOnly: true,
        
        
        tools: {
            
            paragraph: {
                
                class: Paragraph,
                inlineToolbar: true,
            },
            header: {
                class: Header,
                shortcut: 'CMD+SHIFT+H',
            },
            image: {
                class: ImageTool,
                config: {
                    endpoints: {
                    byFile: '/upload', // Your backend file uploader endpoint
                    byUrl: ' /createcontent ' // Your endpoint that provides uploading by Url
                    }
                }
            },
            header: {
                class: Header,
                shortcut: 'CMD+SHIFT+H',
            },
            attaches: {
                class: AttachesTool,
                config: {
                    endpoint: 'http://localhost:8080/box'
                }
            },
            quote: {
                class: Quote,
                inlineToolbar: true,
                shortcut: 'CMD+SHIFT+O',
                config: {
                    quotePlaceholder: 'Enter a quote',
                    captionPlaceholder: 'Quote\'s author',
                }
            },
        },
        data:token_data
    })