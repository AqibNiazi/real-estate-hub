import React from 'react'
import Image from 'next/image'
const PropertyHeaderImage = ({image}) => {
  
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt="property header Image"
            className="object-cover h-80 w-full"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}

export default PropertyHeaderImage