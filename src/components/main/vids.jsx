import React from "react";
import { useSelector } from "react-redux";
import Popup from '../common/popup';
import {useRef,useEffect,useState} from 'react';

function Vids() {
  const vidsData = useSelector(store => store.youtubeReducer.youtube);
  const pop = useRef(null);
  const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(()=>{
		if(vidsData.length >= 1) {
			setLoading(true);
		}
	},[vidsData]);

  return (
    <>
      <ul className="youtubeList">
        {
          vidsData.map( (item,idx) => {
            if(idx < 3) {
              return (
                <li key={idx} onClick={() => {
                  setIndex(idx);
                  pop.current.open();
                }}>
                  <img src={item.snippet.thumbnails.medium.url} alt="" />
                </li>
              )
            }
          })
        }
      </ul>
      <Popup popName="youtube" ref={pop}>
        {
					loading && (
						<iframe
							src={
								'https://www.youtube.com/embed/' +
								vidsData[index].snippet.resourceId.videoId
							}
							frameBorder='0'>
						</iframe>
					)
				}
				<span onClick={() => {
					pop.current.close()
				}}>close</span>
			</Popup> 
    </>
  );
}

export default Vids;
