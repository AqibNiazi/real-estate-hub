import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <>
      <h3 className="text-xl font-bold pt-2 text-center">
        Share This Property
      </h3>
      <div className="flex justify-center py-2 gap-3">
        <FacebookShareButton
          url={shareUrl}
          quote={property.name}
          hashtag={`#${property.type}ForRent`}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>

        <TwitterShareButton
          url={shareUrl}
          title={property.name}
          hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton
          url={shareUrl}
          title={property.name}
          separator={` ${property.type.replace(/\s/g, "")}ForRent `}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>

        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`checkout this property listing at ${shareUrl} `}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButton;
