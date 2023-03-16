const editor = new EditorJS({ 
   
    holder: 'editorjs', 

  
    tools: { 
        paragraph: {
            class: Paragraph,
            inlineToolbar: true,
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
        image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: '/upload', // Your backend file uploader endpoint
                byUrl: ' /createcontent ' // Your endpoint that provides uploading by Url
              }
            }
        },
        attaches: {
            class: AttachesTool,
            config: {
              endpoint: 'http://localhost:8080/box'
            }
        },
        header: {
            class: Header,
            shortcut: 'CMD+SHIFT+H',
        },
        
    },
    
    

    
})
function myFunction(){
    var answerOutput = document.getElementById("content");
    editor.save().then((output) => {
        console.log('Data: ', output);
        let data2;
        data2=JSON.stringify(output);
        answerOutput.value = data2;

    }).catch((error) => {
        console.log('Saving failed: ', error)
    });
}
function myfunction2(){
    var username = document.getElementById("username");
    var first = document.getElementById("first");
    var second = document.getElementById("second");
    username.value= first+second;
    console.log(first+second);
}