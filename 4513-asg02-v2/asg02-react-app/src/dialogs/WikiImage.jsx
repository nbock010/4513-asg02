import { useState, useEffect } from 'react'
import loadingGif from '../assets/wheel.gif'
//^^ from https://giphy.com/stickers/SKODAPL-tire-skoda-tyre-VbiSHWCqHmNVhipjkh



/*This file is my attempt to get driver, circuit, and constructor images from wikipedia. 
It will require a fetch using MediaWiki's API to get the main image from the article. 
Not all articles will return an image (for some reason). This came from multiple hours 
scouring Js documentation sites, MediaWiki documentation, StackOverflow, and admittedly
a touch of chatGPT (but no copied code, I promise)*/

const WikiImage = (props) =>{
    //props: props.url (for wiki article search), props.altText (for alt)
    const wikiPrefix = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=500&titles="
    //^^this is the link prefix for getting the article data (usually including an img url to the articles main image)
    const title = props.url.replace("http://en.wikipedia.org/wiki/", ""); //essentially parses the title
    const wikiUrl = (wikiPrefix + title)
    let tempImgSrc = loadingGif;


    //assuming there IS an image url, this function returns that (otherwise returns null)
    function extractImgUrl(data){
        console.log("EXTRACTING FROM " + data)
        let dataStr = JSON.stringify(data)
        let start = dataStr.indexOf("http") //start of img url
        if (start != -1) {
            //some strings don't return an image url for some reason. 
            let end = dataStr.indexOf(`","width`) //appears at end of url str (after the jpg)
            //console.log("URL: " + dataStr.substring(start, end))
            return dataStr.substring(start, end)
        }
        else{
            tempImgSrc = "https://placehold.co/150x100"
            return null
        }
    }

    const [wikiData, setWikiData] = useState(); 
    let loading = ("") //empty for now

    async function fetchImgFromWiki(){
        //eventually, display some loading gif here (if needed)?
        console.log("getting wikipedia data ...here to check if I've gone infinite: ");
        console.log("retrieving from " + wikiUrl)
        try{
            loading = (<p>LOADING...</p>)
            const response = await fetch(wikiUrl)
            const data = await response.json()
            let imgUrl = extractImgUrl(data)
            if (imgUrl){
                setWikiData(imgUrl);
            }
            else{
                setWikiData(tempImgSrc)
                console.log("no image found")
            }
        }
        catch(error){
            console.log("error fetching wiki data: " + error)
        }
    }

    useEffect(() =>{
        fetchImgFromWiki()
    }, [])
    

    return (
        <img src={wikiData ? wikiData : tempImgSrc} width="250px" alt={props.title}></img> 
        // title="Not all images from Wikimedia's API will return (especially the constructors for some reason)"
    )
}

export default WikiImage