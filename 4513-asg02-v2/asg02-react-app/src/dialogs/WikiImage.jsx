import { useState, useEffect } from 'react'

/*This file is my attempt to get driver, circuit, and constructor images from wikipedia. 
It will require a fetch using MediaWiki's API to get the main image from the article. 
Not all articles will return an image (for some reason). This came from multiple hours 
scouring Js documentation sites, MediaWiki documentation, StackOverflow, and admittedly
a touch of chatGPT (but no copied code, I promise)*/

const WikiImage = (props) =>{
    //props: props.url (for wiki article search), props.altText (for alt)

    const wikiPrefix = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles="
    //^^this is the link prefix for getting the article data (usually including an img url to the articles main image)
    //const title= props.url.replace("http://", ""); //in case this is hiding somewhere
    const title = props.url.replace("http://en.wikipedia.org/wiki/", ""); //essentially parses the title
    //tempAlt = "Williams Grand Prix Engineering placeholder"
    const wikiUrl = (wikiPrefix + title)

    const [wikiData, setWikiData] = useState(); 

    async function fetchImgFromWiki(){
        //eventually, display some loading gif here (if needed)?
        console.log("getting wikipedia data ...here to check if I've gone infinite: ");
        console.log("retrieving from " + wikiUrl)
        try{
            const response = await fetch(wikiUrl)
            const data = await response.json()
            setWikiData(data);
        }
        catch(error){
            console.log("error fetching wiki data: " + error)
        }
    }

    useEffect(() =>{
        fetchImgFromWiki()
        .then(() =>{
            console.log(wikiData)
        })
    }, [])
    
    


    return (
        // may consider returning this in a figure container, but circuitModal uses 2 images anyway (map pending)
        <img src="https://placehold.co/150x100" alt="tbd"></img>    
    )
}

export default WikiImage