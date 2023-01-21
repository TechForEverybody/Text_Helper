import React, { useState } from 'react';
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import ToolCard from './ToolCard';
import HtmlContentExtractor from '../Modules/HtmlContentExtractor';
import ThingsCounter from '../Modules/ThingsCounter';
import CaseHandler from '../Modules/CaseHandler';
function Home() {
    let [currentElement, updateCurrentElement] = useState(0);
    function renderElement(option) {
        if (option === 1) {
            return <ThingsCounter goBack={()=>updateCurrentElement(0)}/>
        } else if (option === 2) {
            return <HtmlContentExtractor goBack={()=>updateCurrentElement(0)}/>
        } else if(option===3){
            return <CaseHandler goBack={()=>updateCurrentElement(0)}/>
        }
    }
    return (
        <>
            <div id="homePageContainer">
                <Header />
                {
                    currentElement === 0 ? (<>
                        <section className="landingPageImage">
                            <div>
                                <h1>Try are Best Tools for Text Editing</h1>
                                <button><a href="#toolsList">See Tools</a> </button>
                            </div>
                        </section>
                        <section className="toolsList" id='toolsList'>
                            <ToolCard text="Verbal Counter" render={()=>{
                                updateCurrentElement(1)
                            }}/>
                            <ToolCard text="Html Text Extractor" render={()=>{
                                updateCurrentElement(2)
                            }}/>
                            <ToolCard text="Word Case Handler" render={()=>{
                                updateCurrentElement(3)
                            }}/>
                        </section>
                    </>) : (<>
                        {
                            renderElement(currentElement)
                        }
                    </>)
                }
                <Footer />
            </div>
        </>
    )
}


export default Home