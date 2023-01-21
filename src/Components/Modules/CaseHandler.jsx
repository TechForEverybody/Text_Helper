import React, { useState } from 'react'

function CaseHandler(object) {
    let [updatedText, updateUpdatedText] = useState('')
    let [input, updateInput] = useState('')
    let [currentOption, updateCurrentOption] = useState(0)
    function updateCases(option, text) {
        if (option === 0) {
            let sentences = text.trim().split(/[.?!]+[\s]*/)
            let finalText = ""
            sentences.forEach(element => {
                finalText = finalText + element.charAt(0).toUpperCase() + element.substring(1) + ". "
            });
            updateUpdatedText(finalText)
        } else if (option === 1) {
            updateUpdatedText(text.toLowerCase())
        } else if (option === 2) {
            updateUpdatedText(text.toUpperCase())
        } else {

        }
    }
    function updateValue(event) {
        let input_text = event.target.value;
        updateInput(event.target.value)
        if (input_text !== "") {
            updateUpdatedText(input_text)
            updateCases(currentOption, event.target.value)
        } else {
            updateUpdatedText("")
        }
    }
    return (
        <div className='ModuleContainer'>
            <h1>Case Handler</h1>\
            <div className="caseOptions">
                <button onClick={() => { updateCurrentOption(0); updateCases(0, input) }} className={currentOption === 0 ? 'activebutton' : ""}>First Letter Capitalizer of sentence</button>
                <button onClick={() => { updateCurrentOption(1); updateCases(1, input) }} className={currentOption === 1 ? 'activebutton' : ""}>Whole Lowercase</button>
                <button onClick={() => { updateCurrentOption(2); updateCases(2, input) }} className={currentOption === 2 ? 'activebutton' : ""}>Whole Uppercase</button>
            </div>
            <form onSubmit={(event) => { event.preventDefault() }}>
                <i className="fas fa-long-arrow-alt-left" onClick={() => object.goBack()}> Go Back</i>
                <textarea name="input" id="input" onChange={updateValue} value={input} placeholder='Enter Text' required >

                </textarea>
            </form>
            {
                updatedText.length === 0 ? (<></>) : (
                    <section className="UpdatedTextOutput">
                        {
                            updatedText
                        }
                    </section>
                )
            }
        </div>
    )
}

export default CaseHandler