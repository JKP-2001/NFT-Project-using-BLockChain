import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {Principal} from "@dfinity/principal";
import {HttpAgent,Actor} from "@dfinity/agent";
import {idlFactory} from "../../../declarations/nft"

function Item(props) {

  const [name,setName] = useState();
  const [owner,setId] = useState();
  const [image,setImage] = useState();

  const idx = Principal.fromText(props.id);

  const localhost = "http://localhost:8080/";
  const agent = new HttpAgent({host:localhost});

  async function loadNFT(){
    const actor = await Actor.createActor(idlFactory,{
      agent:agent,
      canisterId:idx,
    });

    const name = await actor.getName();
    setName(name);

    const id = await actor.getOwner();
    const owner = id.toText();
    setId(owner);

    const imageArray = await actor.getByte();
    const imageContent = new Uint8Array(imageArray);
    const image = URL.createObjectURL(new Blob([imageContent.buffer]),{type:"image/png"});
    setImage(image);
  }

  useEffect(()=>{
    loadNFT();
  },[])
  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name}<span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
