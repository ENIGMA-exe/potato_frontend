
var MediaPlayer = (props)=>{
    //console.log("media player",props.urlkey)
    return(
        <>
            <iframe 
            title="media"
            src={`https://drive.google.com/file/d/${props.urlkey}/preview`} 
            width="100%" 
            height="100%" 
            allow="autoplay"
            frameBorder="0"
            allowFullScreen={true}
            seamless="">
            </iframe>
        </>
    )
}

export default MediaPlayer;