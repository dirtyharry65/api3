import React from 'react';


const VideoItem = (props) => {

  const { video } = props;
  const { post , meta} = video


  return (
    <li className="video-item">
      <span>{post.ID}</span>
      <span >{post.post_title }</span>
      <span >{meta.cursus_code}</span>
      <span >{meta.minuten}:{meta.seconden}</span>
      <span ><a href={`https://vimeo.com/${meta.video_id}`} target="_blank"  rel="noopener noreferrer" className="external-link" >{meta.video_id}</a></span>
    </li>
  )
}

export default VideoItem
