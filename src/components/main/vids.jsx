import React from "react";
import { useSelector } from "react-redux";


function Vids() {
  const vidsData = useSelector(store => store.youtubeReducer.youtube);

  return (
    <>
      <ul className="youtubeList">
        {
          vidsData.map( (item,idx) => {
            if(idx < 4) {
              return (
                <li>
                  <img src={item.snippet.thumbnails.medium.url} alt="" />
                </li>
              )
            }
          })
        }
      </ul>
    </>
  );
}

export default Vids;
