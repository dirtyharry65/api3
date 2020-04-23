import React, { useEffect, useState } from 'react';
import VideoItem from './videoItem';

const Chapter = (props) => {

const { current ,id } = props;

const [videoList , setVideoList ] = useState([]);
const [material , setMaterial ] = useState('');

useEffect( ()=>{

  const videos = current.video;
  setVideoList(Object.keys(videos).map( (video  ) => { return videos[video] }));
  if( current.acf.werk_materiaal && current.acf.werk_materiaal !== ''){
    setMaterial(current.acf.werk_materiaal );
  } else {
    setMaterial('');
  }
},[current]);

  return (
    <div className="chapter-content">
      <h4 className="chapter-header">{id} {current.data.name} ({current.data.count})
      { material ? <a href={material} className="external-link">werkmateriaal</a> : null }
      </h4>
      <section className="video-content">
        <header className="video-item video-item-header">
          <span>Video ID</span><span>Titel</span><span>cursus ID</span><span>lengte</span><span>Vimeo ID</span>
        </header>
        <ul className="video-list" >
          { videoList.map( (video , key)=>{
          return <VideoItem video={video} key={key} />
        })}
        </ul>
      </section>
    </div>
  )
}

export default Chapter
