import React, { useState } from 'react'

function HtmlContentExtractor(object) {
    let [normalText, updateNormalText] = useState([])
    let [input, updateInput] = useState('')
    function updateValue(event) {
        let input_text=event.target.value;
        updateInput(event.target.value)
        let text_array=[]
        while (input_text.search("<style>")!==-1 && input_text.search("</style>")!==-1) {
            let removalIndex=input_text.search("</style>")
            input_text=input_text.substring(0,input_text.search("<style>"))+input_text.substring(removalIndex+8)
        }
        while (input_text.search("<script")!==-1 && input_text.search("</script>")!==-1) {
            let removalIndex=input_text.search("</script>")
            input_text=input_text.substring(0,input_text.search("<script"))+input_text.substring(removalIndex+9)
        }
        for (let index = 0; index < input_text.length; index++) {
            let texts = ''
            if (input_text[index] === '<') {
                for (let jindex = index + 1; jindex < input_text.length; jindex++) {
                    if (input_text[index] === '>') {
                        break;  
                    }
                    else {
                        index++;
                    }
                }
            } else {
                for (let jindex = index; jindex < input_text.length; jindex++) {
                    texts = texts + input_text[index];
                    if (input_text[index+1] === '<') {
                        break;
                    }
                    index++;
                }
            }
           if (texts!=="")text_array.push(texts)
        }
        updateNormalText(text_array)

    }
    return (
        <div className='ModuleContainer'>
            <h1>HTML Text Extractor</h1>
            <form onSubmit={(event)=>{event.preventDefault()}}>
                <i className="fas fa-long-arrow-alt-left" onClick={() => object.goBack()}> Go Back</i>
                <textarea name="input" id="input" onChange={updateValue} value={input} placeholder='Enter The HTML Content' required >

                </textarea>
            </form>
            {
                normalText.length===0 ? (<></>) : (
                    <section className="NormalTextOutput">
                        {normalText.map((text,index)=>{
                            return (
                                <li key={index}>
                                    {text}
                                </li>
                            )
                        })}
                    </section>
                )
            }
        </div>
    )
}

export default HtmlContentExtractor