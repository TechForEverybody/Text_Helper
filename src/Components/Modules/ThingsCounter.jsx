import React, { useState } from 'react'

function ThingsCounter(object) {
    let [input, updateInput] = useState('')
    let [wordCounter, updateWordCounter] = useState(0)
    let [sentenceCounter, updateSentenceCounter] = useState(0)
    let [characterCounter, updateCharacterCounter] = useState(0)
    let [frequencies, updateFrequencies] = useState([])
    function updateValue(event) {
        let input_text = event.target.value;
        updateInput(event.target.value)
        if (input_text !== "") {
            input_text = input_text.trim().replace(/(\.+)$/, "")
            let sentences = input_text.split(/\.+[\s.]*/)
            updateSentenceCounter(sentences.length)
            let punctuations = [/\./g, /,/g, /!/g, /\?/g]
            punctuations.forEach(element => {
                input_text = input_text.replace(element, " ")
            });
            let words = input_text.trim().split(/\s+/)
            let frequency = {}
            words.forEach(word => {
                if (!frequency[word]) {
                    frequency[word] = 1
                } else {
                    frequency[word] += 1
                }
            });
            let counts = Object.entries(frequency).sort()
            for (let index = 0; index < counts.length; index++) {
                for (let jindex = 0; jindex < counts.length; jindex++) {
                    if (counts[index][1] > counts[jindex][1]) {
                        let temp = counts[index]
                        counts[index] = counts[jindex]
                        counts[jindex] = temp
                    }
                }
            }
            updateFrequencies(counts)
            updateCharacterCounter(input_text.trim().replace(/\s+/g, "").length)
            updateWordCounter(input_text.trim().split(/\s+/).length)

        } else {
            updateWordCounter(0)
            updateSentenceCounter(0)
            updateCharacterCounter(0)
            updateFrequencies([])
        }
    }
    return (
        <div className='ModuleContainer'>
            <h1>Verbal Counter</h1>
            <form onSubmit={(event) => { event.preventDefault() }}>
                <i className="fas fa-long-arrow-alt-left" onClick={() => object.goBack()}> Go Back</i>
                <textarea name="input" id="input" onChange={updateValue} value={input} placeholder='Enter The HTML Content' required >

                </textarea>
            </form>
            {
                <section className="CountsDetails">
                    <div className="counts">
                        Number of Words: {wordCounter}
                    </div>
                    <div className="counts">
                        Number of sentences: {sentenceCounter}
                    </div>
                    <div className="counts">
                        Number of Characters: {characterCounter}
                    </div>
                    <div className="frequencies">
                        Frequencies Counter
                        <div>
                            {
                                frequencies.map((value, index) => {
                                    return <li key={index}>{value[0]} : {value[1]}</li>
                                })
                            }
                        </div>
                    </div>
                </section>
            }
        </div>
    )
}

export default ThingsCounter